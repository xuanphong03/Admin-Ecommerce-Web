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

const SIZES = [
  { value: 'S', name: 'S' },
  { value: 'M', name: 'M' },
  { value: 'L', name: 'L' },
  { value: 'XL', name: 'XL' },
];
const COLORS = [
  { value: 'Đỏ', name: 'Đỏ' },
  { value: 'Xám', name: 'Xám' },
  { value: 'Trắng', name: 'Trắng' },
  { value: 'Đen', name: 'Đen' },
];

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  brand: yup.string().required('Vui lòng nhập tên thương hiệu.'),
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
  sizes: yup.array(),
  colours: yup.array(),
  originalPrice: yup
    .number()
    .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
    .required('Vui lòng nhập giá sản phẩm')
    .min(1, 'Giá sản phẩm phải lớn hơn 0')
    .max(1000000000, 'Giá sản phẩm không được quá 1000000000')
    .integer('Giá sản phẩm phải là số nguyên'),
  images: yup
    .mixed()
    .required('Vui lòng upload ít nhất một ảnh sản phẩm')
    .test('fileType', ' Chỉ chấp nhận file ảnh', (value) => {
      if (!value.length) return false; // Không có file nào
      return Array.from(value).every((file) =>
        ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      ); // Kiểm tra từng file
    })
    .test('minFiles', 'Vui lòng tải lên 5 ảnh', (value) => {
      return value && value.length === 5; // Kiểm tra số lượng file
    }),
});

function CreateProductForm({ onSubmit }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [productTypeSizeQuantity, setProductTypeSizeQuantity] = useState([]);
  const [productTypeColorQuantity, setProducTypeColortQuantity] = useState([]);
  const [productAllQuantity, setProductAllQuantity] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
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
    },
  });

  const productColors = watch('colours') || [];
  const productSizes = watch('sizes') || [];

  const formSubmit = async (data) => {
    console.log('Data tạo sản phẩm: ', data);
    // if (onSubmit) {
    //   await onSubmit(data);
    // }
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

  const changeQuantityBySize = (e, productSize, productColor) => {
    console.log(e.target.value);
    // const newQuantity = e.target.value;
    // if (productSize) {
    //   const position = productTypeSizeQuantity.findIndex(
    //     (item) => item.productSize === productSize,
    //   );
    //   if (position === -1) {
    //     setProductTypeSizeQuantity((prev) => [
    //       ...prev,
    //       {
    //         productSize,
    //         quantity: +newQuantity,
    //       },
    //     ]);
    //   } else {
    //     const newProductQuantity = productTypeSizeQuantity;
    //     newProductQuantity[position] = {
    //       ...newProductQuantity[position],
    //       quantity: +newQuantity,
    //     };
    //     setProductTypeSizeQuantity(newProductQuantity);
    //   }
    // }
  };

  const changeQuantityByColor = (e, productColor) => {};

  console.log('Dữ liệu gửi đi', productTypeSizeQuantity);

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="min-w-[850px] flex-col gap-5"
    >
      <div className="mb-5 flex gap-5 text-sm">
        <div className="flex basis-1/3 flex-col gap-1">
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
        <div className="flex basis-1/3 flex-col gap-1">
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
              className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
            >
              <option value="">---Chọn loại sản phẩm---</option>
              {categoriesList.map((category) => (
                <option value={category.name} key={category.sku}>
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
        <div className="flex basis-1/3 flex-col gap-1">
          <div className="flex flex-col gap-1 text-sm">
            <label className="w-fit" htmlFor="brand">
              Thương hiệu sản phẩm
            </label>
            <select
              {...register('brand')}
              className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
            >
              <option value="">---Chọn thương hiệu sản phẩm---</option>
              {brandsList.map((brand) => (
                <option value={brand} key={brand}>
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
        <div className="flex basis-1/3 flex-col gap-1">
          <InputField
            id="originalPrice"
            label="Giá sản phẩm"
            errorMessage={errors.originalPrice?.message}
            register={{
              ...register('originalPrice'),
            }}
            required={true}
            type="number"
            step={100000}
            placeholder="Nhập giá sản phẩm"
          />
        </div>
        <div className="flex basis-1/3 flex-col gap-1">
          <InputField
            id="totalQuantity"
            label="Tổng số lượng sản phẩm"
            errorMessage={errors.totalQuantity?.message}
            register={{
              ...register('totalQuantity'),
            }}
            readOnly={productSizes.length || productColors.length}
            required={true}
            type="number"
            step={100000}
            placeholder="Nhập tổng số lượng sản phẩm"
          />
        </div>
        <div className="flex basis-1/3 flex-col gap-1 text-sm">
          <label htmlFor="images">Ảnh minh họa sản phẩm</label>
          <input type="file" {...register('images')} multiple />
          {errors.images && (
            <p className="px-1 text-sm text-red-500">{errors.images.message}</p>
          )}
        </div>
      </div>

      <div className="mb-5 flex gap-5 text-sm">
        <div className="flex basis-1/3 flex-col gap-1">
          <CheckboxField
            label="Kích thước"
            register={{ ...register('sizes') }}
            checkboxList={SIZES}
          />
        </div>
        <div className="flex basis-1/2 flex-col gap-1">
          <CheckboxField
            label="Màu sắc"
            register={{ ...register('colours') }}
            checkboxList={COLORS}
          />
        </div>
      </div>
      {productSizes.length || productColors.length ? (
        <div className="flex flex-wrap">
          {productSizes.length && !productColors.length ? (
            productSizes?.map((productSize) => (
              <div
                key={productSize}
                className="mb-4 flex basis-1/4 flex-col gap-1 pr-5 text-sm"
              >
                <label className="mb-1 w-fit">
                  Số lượng sản phẩm size
                  <span className="font-medium"> {productSize} </span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => changeQuantityBySize(e, productSize)}
                  autoComplete="off"
                  placeholder="Nhập số lượng sản phẩm"
                  min={0}
                  type="number"
                  className={`border-gray w-full rounded border border-solid px-3 py-2 outline-blue-500`}
                />
              </div>
            ))
          ) : (
            <></>
          )}

          {!productSizes.length && productColors.length ? (
            productColors?.map((productColor) => (
              <div
                key={productColor}
                className="mb-4 flex basis-1/4 flex-col gap-1 pr-5 text-sm"
              >
                <label className="mb-1 w-fit">
                  Số lượng sản phẩm màu
                  <span className="font-medium capitalize">
                    {' '}
                    {productColor}{' '}
                  </span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  onChange={(e) => changeQuantityByColor(e, productColor)}
                  autoComplete="off"
                  placeholder="Nhập số lượng sản phẩm"
                  min={0}
                  type="number"
                  className={`border-gray w-full rounded border border-solid px-3 py-2 outline-blue-500`}
                />
              </div>
            ))
          ) : (
            <></>
          )}

          {productSizes.length && productSizes.length ? (
            productSizes.map((productSize) => {
              return productColors.map((productColor) => {
                return (
                  <div
                    key={`${productSize}_${productColor}`}
                    className="mb-4 flex basis-1/4 flex-col gap-1 pr-5 text-sm"
                  >
                    <label className="mb-1 w-fit">
                      Số lượng sản phẩm màu {''}
                      <span className="font-medium capitalize">
                        {productColor}
                        {''}
                      </span>
                      <span> size </span>
                      <span className="font-medium capitalize">
                        {productSize}
                      </span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      placeholder="Nhập số lượng sản phẩm"
                      min={0}
                      type="number"
                      className={`border-gray w-full rounded border border-solid px-3 py-2 outline-blue-500`}
                    />
                  </div>
                );
              });
            })
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      <div className="mt-5">
        <TextAreaField
          id="description"
          label="Mô tả sản phẩm"
          errorMessage={errors.description?.message}
          register={{ ...register('description') }}
          required={true}
          placeholder="Nhập mô tả sản phẩm"
        />
      </div>
      <div className="mt-5 flex justify-end">
        <button
          className={`${isSubmitting ? 'cursor-not-allowed bg-green-500' : 'cursor-pointer bg-green-600 hover:bg-green-500'} rounded px-5 py-2 text-sm uppercase tracking-widest text-white`}
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
