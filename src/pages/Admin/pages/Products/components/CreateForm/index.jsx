import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import categoryApi from '~/apis/categoryApi';

// const SIZES = [
//   { value: 'XS', name: 'XS' },
//   { value: 'S', name: 'S' },
//   { value: 'M', name: 'M' },
//   { value: 'L', name: 'L' },
//   { value: 'XL', name: 'XL' },
// ];
// const COLORS = [
//   { value: 'red', name: 'Đỏ' },
//   { value: 'blue', name: 'Xanh' },
//   { value: 'gray', name: 'Xám' },
//   { value: 'white', name: 'Trắng' },
//   { value: 'black', name: 'Đen' },
// ];

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  brand: yup.string().required('Vui lòng nhập tên thương hiệu.'),
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
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

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-5">
      <div className="flex gap-5 text-sm">
        <div className="flex basis-1/2 flex-col gap-1">
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
        <div className="flex basis-1/2 flex-col gap-1">
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
      </div>
      <div className="flex gap-5 text-sm">
        <div className="flex basis-1/2 flex-col gap-1">
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
        <div className="flex basis-1/2 flex-col gap-1">
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
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor="images">Ảnh minh họa sản phẩm</label>
        <input type="file" {...register('images')} multiple />
        {errors.images && (
          <p className="px-1 text-sm text-red-500">{errors.images.message}</p>
        )}
      </div>
      <TextAreaField
        id="description"
        label="Mô tả sản phẩm"
        errorMessage={errors.description?.message}
        register={{ ...register('description') }}
        required={true}
        placeholder="Nhập mô tả sản phẩm"
      />
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
    </form>
  );
}

export default CreateProductForm;
