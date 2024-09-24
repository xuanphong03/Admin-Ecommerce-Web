import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import categoryApi from '~/apis/categoryApi';
import CheckboxField from '~/components/form-controls/CheckboxField';
import ImageField from '~/components/form-controls/ImageField';
import { v4 as uuidv4 } from 'uuid';

import { COLORS, SIZES } from '~/constants/variants';
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  brand: yup.string().required('Vui lòng nhập chi tiết loại sản phẩm.'),
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
  saleDiscountPercent: yup
    .number()
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

// const styleList = [
//   { id: 1, name: 'Cổ điển', desc: 'Phong cách cổ điển (Classic Style)' },
//   { id: 2, name: 'Hiện đại', desc: 'Phong cách hiện đại (Modern Style)' },
//   { id: 3, name: 'Đường phố', desc: 'Phong cách đường phố (Streetwear Style)' },
//   { id: 4, name: 'Thể thao', desc: 'Phong cách thể thao (Athleisure Style)' },
//   { id: 5, name: 'Thanh lịch', desc: 'Phong cách thanh lịch (Elegant Style)' },
//   { id: 6, name: 'Tối giản', desc: 'Phong cách tối giản (Minimalist Style):' },
// ];

// const materialList = [
//   { id: 1, name: 'Cotton', desc: 'Cotton (Vải bông)' },
//   { id: 2, name: 'Linen ', desc: 'Linen (Vải lanh)' },
//   { id: 3, name: 'Silk', desc: 'Silk (Vải lụa)' },
//   { id: 4, name: 'Wool', desc: 'Wool (Vải len)' },
//   { id: 5, name: 'Polyester', desc: 'Polyester' },
//   { id: 6, name: 'Velvet', desc: 'Velvet (Vải nhung)' },
//   { id: 7, name: 'Denim', desc: 'Denim' },
//   { id: 8, name: 'Leather', desc: 'Leather (Da)' },
// ];

function CreateProductForm({ onSubmit }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [productQuantities, setProductQuantities] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [subImageList, setSubImageList] = useState([null, null, null, null]);
  const [isEnoughImages, setIsEnoughImages] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const categoryResponse = await categoryApi.getAll();
        const _categoryList = categoryResponse.filter(
          (_category) => _category.status !== 0,
        );
        setCategoriesList(_categoryList);
      } catch (error) {
        toast.error('API bị lỗi');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        const _categoryList = response.filter(
          (_category) => _category.status !== 0,
        );
        setCategoriesList(_categoryList);
      } catch (error) {
        toast.error('API Category bị lỗi');
      }
    })();
  }, []);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sizes: [],
      colours: [],
      saleDiscountPercent: 0,
      originalPrice: 0,
      style: '',
      category: '',
      brand: '',
      material: '',
    },
  });

  const productColors = watch('colours') || [];
  const productSizes = watch('sizes') || [];

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
        subCategory: productInfo.brand,
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

  const handleGetBrandsList = (category) => {
    const position = categoriesList.findIndex(
      (_category) => _category.name === category,
    );
    if (position !== -1) {
      return categoriesList[position].brands;
    }
    return [];
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
            <label className="w-fit" htmlFor="category">
              Loại sản phẩm
            </label>
            <select
              {...register('category', {
                onChange: (e) => {
                  const newCategory = e.target.value;
                  const newBrandList = handleGetBrandsList(newCategory);
                  setBrandsList(newBrandList);
                },
              })}
              id="category"
              className="border-gray w-full rounded border border-solid px-3 py-2 text-sm outline-blue-500"
            >
              <option value="" disabled>
                ---Chọn loại sản phẩm---
              </option>
              {categoriesList.map((category) => (
                <option value={category.name} key={uuidv4()}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category?.message && (
              <p className="px-1 text-sm text-red-500">
                {errors.category?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex w-80 flex-col gap-1">
          <div className="flex flex-col gap-1 text-sm">
            <label className="w-fit" htmlFor="brand">
              Chi tiết loại sản phẩm
            </label>
            <select
              {...register('brand')}
              className="border-gray w-full rounded border border-solid px-3 py-2 text-sm outline-blue-500"
            >
              <option value="" disabled>
                ---Chọn Chi tiết loại sản phẩm---
              </option>
              {brandsList.map((brand) => (
                <option value={brand} key={uuidv4()}>
                  {brand}
                </option>
              ))}
            </select>
            {errors.brand?.message && (
              <p className="px-1 text-sm text-red-500">
                {errors.brand?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-5 flex gap-5 text-sm">
        {/* <div className="flex w-80 flex-col gap-1">
          <label htmlFor="style">Phong cách</label>
          <select
            {...register('style')}
            className="block w-full rounded border border-gray-300 p-2"
          >
            <option value="" disabled>
              Chọn phong cách
            </option>
            {styleList.map((style) => (
              <option key={uuidv4()} value={style.name}>
                {style.desc}
              </option>
            ))}
          </select>
          {errors.style && (
            <p className="px-1 text-sm text-red-500">{errors.style?.message}</p>
          )}
        </div>
        <div className="flex w-80 flex-col gap-1">
          <label htmlFor="material">Chất liệu</label>
          <select
            {...register('material')}
            className="block w-full rounded border border-gray-300 p-2"
          >
            <option value="" disabled>
              Chọn chất liệu
            </option>
            {materialList.map((material) => (
              <option key={uuidv4()} value={material.name}>
                {material.desc}
              </option>
            ))}
          </select>
          {errors.material && (
            <p className="px-1 text-sm text-red-500">
              {errors.material?.message}
            </p>
          )}
        </div> */}
        <div className="flex w-80 flex-col gap-1">
          <InputField
            id="originalPrice"
            label="Giá sản phẩm"
            errorMessage={errors.originalPrice?.message}
            register={{ ...register('originalPrice') }}
            required={true}
            type="number"
            step={100000}
            placeholder="Nhập giá sản phẩm"
          />
        </div>
        <div className="flex w-80 flex-col gap-1">
          <InputField
            id="saleDiscountPercent"
            label="Phần trăm khuyến mãi"
            errorMessage={errors.saleDiscountPercent?.message}
            register={{ ...register('saleDiscountPercent') }}
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
            checkboxList={SIZES}
            errorMessage={errors.sizes?.message}
          />
        </div>
        <div className="flex w-80 flex-col gap-1">
          <CheckboxField
            activeItemList={productColors}
            label="Màu sắc"
            register={{
              ...register('colours', {
                onChange: (e) => {
                  const { checked, value } = e.target;
                  if (checked) {
                    setProductQuantities((prev) => [
                      ...prev,
                      ...SIZES.map((size) => ({
                        color: value,
                        size,
                        quantity: 0, // Default to 1 when added
                      })),
                    ]);
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
                  Số lượng sản phẩm màu {''}
                  <span className="font-medium capitalize">{color}</span>
                  <span> size </span>
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
                  step={100}
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
