import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import categoryApi from '~/apis/categoryApi';
import CheckboxField from '~/components/form-controls/CheckboxField';
import ImageField from '~/components/form-controls/ImageField';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';

import { COLORS, PANTS_SIZES, SHIRT_SIZES } from '~/constants/variants';
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  subCategory: yup.string().required('Vui lòng chọn chỉ tiết loại sản phẩm.'),
  category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
  saleDiscountPercent: yup
    .number('Phần trăm khuyến mãi phải là số nguyên')
    .typeError('Phần trăm khuyến mãi phải là một số hợp lệ')
    .integer('Phần trăm khuyến mãi phải là số nguyên')
    .min(0, 'Phần trăm khuyến mãi không được bé hơn 0')
    .max(100, 'Phần trăm khuyến mãi không được lớn hơn 100')
    .required('Vui lòng nhập phần trăm khuyến mãi'),
  sizes: yup
    .array()
    .min(1, 'Vui lòng chọn ít nhất một kích cỡ')
    .required('Vui lòng chọn kích cỡ'),
  colours: yup
    .array()
    .min(1, 'Vui lòng chọn ít nhất một màu sắc')
    .required('Vui lòng chọn màu sắc'),
  originalPrice: yup
    .number()
    .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
    .required('Vui lòng nhập giá sản phẩm')
    .min(1, 'Giá sản phẩm phải lớn hơn 0')
    .max(1000000000, 'Giá sản phẩm không được quá 1000000000')
    .integer('Giá sản phẩm phải là số nguyên'),
});

function CreateProductForm({ onSubmit }) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productQuantities, setProductQuantities] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [subImageList, setSubImageList] = useState([null, null, null, null]);
  const [isEnoughImages, setIsEnoughImages] = useState(true);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sizes: [],
      colours: [],
      originalPrice: 0,
      saleDiscountPercent: 0,
      style: '',
      category: '',
      material: '',
    },
  });

  const productColors = watch('colours') || [];
  const productSizes = watch('sizes') || [];
  // Lấy giá trị category đang được chọn
  const selectedCategory = watch('category');

  const getCategories = async () => {
    const response = await categoryApi.getAll();
    setCategories(response);
  };
  useEffect(() => {
    getCategories();
  }, []);

  // Khi category thay đổi, update subcategories
  useEffect(() => {
    setValue('sizes', []);
    const category = categories.find((cat) => cat.name === selectedCategory);
    setSubcategories(category ? category.brands : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    const newQuantities = productSizes.flatMap((size) =>
      productColors.map((color) => ({
        color,
        size,
        quantity:
          productQuantities.find((q) => q.color === color && q.size === size)
            ?.quantity || 0, // Default to 0 if not found
      })),
    );
    setProductQuantities(newQuantities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSizes, productColors]);

  const formSubmit = async (data) => {
    const { colours, sizes, ...productInfo } = data;

    const images = [mainImage, ...subImageList];
    if (images.includes(null)) {
      setIsEnoughImages(false);
      return;
    } else {
      setIsEnoughImages(true);
    }
    const quantityDetails = colours.map((color) => ({
      color,
      sizes: sizes.map((size) => ({
        size,
        quantity:
          productQuantities.find((q) => q.color === color && q.size === size)
            ?.quantity || 0,
      })),
    }));

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    formData.append(
      'productDtos',
      JSON.stringify({
        name: productInfo.name,
        description: productInfo.description,
        category: productInfo.category,
        subCategory: productInfo.subCategory,
        tradeMask: productInfo.tradeMask,
        style: productInfo.style,
        material: productInfo.material,
        originalPrice: productInfo.originalPrice,
        saleDiscountPercent: productInfo.saleDiscountPercent,
        quantityDetails: quantityDetails,
        imageMain: images[0]?.name,
      }),
    );

    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  const handleOnSelect = (file, type = 'sub', index = 1) => {
    if (type === 'main') {
      setMainImage(file);
    } else if (type === 'sub') {
      setSubImageList((prev) => {
        const newSubImageList = prev.map((prevFile, i) => {
          if (i === index - 1) {
            return file;
          }
          return prevFile;
        });
        return newSubImageList;
      });
    }
  };

  const updateQuantity = (e, color, size) => {
    const newQuantity = e.target.value;
    setProductQuantities((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.color === color && item.size === size,
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { color, size, quantity: +newQuantity };
        return updated;
      } else {
        return [...prev, { color, size, quantity: +newQuantity }];
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="min-w-[850px] flex-col gap-5"
    >
      <div className="mb-5 flex gap-5 text-sm">
        <div className="flex w-80 flex-col gap-1">
          <InputField
            id="name"
            label="Tên sản phẩm"
            errorMessage={errors.name?.message}
            register={{ ...register('name') }}
            autofocus={true}
            required={true}
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <div className="flex w-80 flex-col gap-1">
          <div className="flex flex-col gap-1 text-sm">
            <label className='w-fit"'>Loại sản phẩm</label>
            <select
              className="border-gray w-full rounded border border-solid px-3 py-2 text-sm outline-blue-500"
              {...register('category')}
            >
              <option value="">---Chọn loại sản phẩm---</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="px-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Dropdown cho Subcategory */}
        <div className="flex w-80 flex-col gap-1">
          <div className="flex flex-col gap-1 text-sm">
            <label className="w-fit">Chi tiết loại sản phẩm</label>
            <select
              className="border-gray w-full rounded border border-solid px-3 py-2 text-sm outline-blue-500"
              {...register('subCategory')}
              disabled={!subcategories.length}
            >
              <option value="">---Chọn chi tiết loại sản phẩm---</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
            {errors.subCategory && (
              <p className="px-1 text-sm text-red-500">
                {errors.subCategory.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-5 flex gap-5 text-sm">
        <div className="flex w-80 flex-col gap-1">
          <InputField
            id="originalPrice"
            label="Giá sản phẩm"
            errorMessage={errors.originalPrice?.message}
            register={{
              ...register('originalPrice', {
                onChange: (e) => {
                  const { value } = e.target;
                  if (value < 0) {
                    setValue('originalPrice', 0);
                  }
                },
              }),
            }}
            required={true}
            type="number"
            step={1000}
            placeholder="Nhập giá sản phẩm"
          />
        </div>
        <div className="flex w-80 flex-col gap-1">
          <InputField
            id="saleDiscountPercent"
            label="Phần trăm khuyến mãi"
            errorMessage={errors.saleDiscountPercent?.message}
            register={{
              ...register('saleDiscountPercent', {
                onChange: (e) => {
                  const { value } = e.target;
                  if (value > 100) {
                    setValue('saleDiscountPercent', 100);
                  } else if (value < 0) {
                    setValue('saleDiscountPercent', 0);
                  }
                },
              }),
            }}
            required={true}
            type="number"
            step={10}
            placeholder="Nhập phần trăm khuyến mãi"
          />
        </div>
      </div>
      <div className="mb-5 flex gap-5 text-sm">
        <div className="flex w-80 flex-col gap-1">
          <CheckboxField
            activeItemList={productSizes}
            label="Kích thước"
            register={{
              ...register('sizes', {
                onChange: (e) => {
                  const { checked, value } = e.target;
                  if (checked) {
                    setProductQuantities((prev) => [
                      ...prev,
                      ...COLORS.map((color) => ({
                        color,
                        size: value,
                        quantity: 1,
                      })),
                    ]);
                  } else {
                    setProductQuantities((prev) =>
                      prev.filter((item) => item.size !== value),
                    );
                  }
                },
              }),
            }}
            checkboxList={
              getValues('category') === 'Quần' ? PANTS_SIZES : SHIRT_SIZES
            }
            errorMessage={errors.sizes?.message}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <CheckboxField
            activeItemList={productColors}
            label="Màu sắc"
            register={{
              ...register('colours', {
                onChange: (e) => {
                  const { checked, value } = e.target;
                  if (checked) {
                    setProductQuantities((prev) => {
                      const SIZES =
                        getValues('category') === 'Quần'
                          ? PANTS_SIZES
                          : SHIRT_SIZES;
                      return [
                        ...prev,
                        ...SIZES.map((size) => ({
                          color: value,
                          size,
                          quantity: 0, // Default to 1 when added
                        })),
                      ];
                    });
                  } else {
                    setProductQuantities((prev) =>
                      prev.filter((item) => item.color !== value),
                    );
                  }
                },
              }),
            }}
            errorMessage={errors.colours?.message}
            checkboxList={COLORS}
          />
        </div>
      </div>
      {productSizes.length > 0 && productColors.length > 0 && (
        <div className="flex flex-wrap gap-5">
          {productSizes.map((size) =>
            productColors.map((color) => (
              <div key={uuidv4()} className="flex w-80 flex-col gap-1 text-sm">
                <label className="mb-1 w-fit">
                  Số lượng{' '}
                  <span className="font-medium capitalize">{color}</span>
                  <span> / </span>
                  <span className="font-medium capitalize">{size}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => updateQuantity(e, color, size)}
                  autoComplete="off"
                  value={
                    productQuantities.find(
                      (q) => q.color === color && q.size === size,
                    )?.quantity || 0
                  }
                  placeholder="Nhập số lượng sản phẩm"
                  min={0}
                  step={50}
                  type="number"
                  className={`border-gray w-full rounded border border-solid px-3 py-2 outline-blue-500`}
                />
              </div>
            )),
          )}
        </div>
      )}
      <div className="mt-5 w-[660px]">
        <TextAreaField
          id="description"
          label="Mô tả sản phẩm"
          errorMessage={errors.description?.message}
          register={{ ...register('description') }}
          required={true}
          placeholder="Nhập mô tả sản phẩm"
        />
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <div className="w-56">
            <ImageField
              id="main-image"
              label="Ảnh chính"
              type="main"
              index={1}
              imageList={[mainImage, ...subImageList]}
              onSelect={handleOnSelect}
            />
          </div>
          <div className="w-56">
            <ImageField
              id="sub-image-1"
              label="Ảnh phụ"
              type="sub"
              index={1}
              imageList={[mainImage, ...subImageList]}
              onSelect={handleOnSelect}
            />
          </div>
          <div className="w-56">
            <ImageField
              id="sub-image-2"
              label="Ảnh phụ"
              type="sub"
              index={2}
              imageList={[mainImage, ...subImageList]}
              onSelect={handleOnSelect}
            />
          </div>
          <div className="w-56">
            <ImageField
              id="sub-image-3"
              label="Ảnh phụ"
              type="sub"
              index={3}
              imageList={[mainImage, ...subImageList]}
              onSelect={handleOnSelect}
            />
          </div>
          <div className="w-56">
            <ImageField
              id="sub-image-4"
              label="Ảnh phụ"
              type="sub"
              index={4}
              imageList={[mainImage, ...subImageList]}
              onSelect={handleOnSelect}
            />
          </div>
        </div>
        {!isEnoughImages && (
          <p className="px-1 text-sm text-red-500">
            Vui lòng chọn đủ số lượng ảnh (đủ 5 ảnh)
          </p>
        )}
      </div>

      <div className="mt-5 flex justify-start pb-5">
        <button
          className={`${
            isSubmitting
              ? 'cursor-not-allowed bg-green-500'
              : 'cursor-pointer bg-green-600 hover:bg-green-500'
          } rounded px-5 py-2 text-sm uppercase tracking-widest text-white`}
        >
          {isSubmitting ? (
            <p className="flex items-center justify-center gap-4">
              <FaSpinner className="animate-spin" />
              Loading...
            </p>
          ) : (
            'Thêm mới sản phẩm'
          )}
        </button>
      </div>
    </form>
  );
}
export default CreateProductForm;
