import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';
import { useState } from 'react';
import SelectField from '~/components/form-controls/SelectField';
import CheckboxField from '~/components/form-controls/CheckboxField';
import { FaSpinner } from 'react-icons/fa6';
import productApi from '~/apis/productApi';

const SIZES = [
  { value: 'XS', name: 'XS' },
  { value: 'S', name: 'S' },
  { value: 'M', name: 'M' },
  { value: 'L', name: 'L' },
  { value: 'XL', name: 'XL' },
];
const COLORS = [
  { value: 'red', name: 'Đỏ' },
  { value: 'blue', name: 'Xanh' },
  { value: 'gray', name: 'Xám' },
  { value: 'white', name: 'Trắng' },
  { value: 'black', name: 'Đen' },
];

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  brand: yup.string().required('Vui lòng nhập tên thương hiệu.'),
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
  size: yup.array(),
  colour: yup.array(),
  originalPrice: yup
    .number()
    .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
    .required('Vui lòng nhập giá sản phẩm')
    .min(1, 'Giá sản phẩm phải lớn hơn 0')
    .integer('Giá sản phẩm phải là số nguyên'),
  images: yup
    .mixed()
    .required('Vui lòng upload ít nhất một ảnh sản phẩm')
    .test('fileType', ' Chỉ chấp nhận file ảnh', (value) => {
      if (!value.length) return false; // Không có file nào
      return Array.from(value).every((file) =>
        ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      ); // Kiểm tra từng file
    }),
  // .test('minFiles', 'Vui lòng tải lên 5 ảnh', (value) => {
  //   return value && value.length === 5; // Kiểm tra số lượng file
  // }),
});

function CreateProductForm({ onSubmit }) {
  const [categoriesList, setCategoriesList] = useState([
    'Điện thoại',
    'Máy tính',
    'Đồng hồ thông minh',
    'Máy ảnh',
    'Tai nghe',
  ]);
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
          />
        </div>
        <div className="flex basis-1/2 flex-col gap-1">
          <SelectField
            label="Loại sản phẩm"
            register={{
              ...register('category'),
            }}
            options={categoriesList}
            id="category"
            errorMessage={errors.category?.message}
          />
        </div>
      </div>
      <div className="flex gap-5 text-sm">
        <div className="flex basis-1/2 flex-col gap-1">
          <InputField
            id="brand"
            label="Tên thương hiệu"
            errorMessage={errors.brand?.message}
            register={{ ...register('brand') }}
            required={true}
          />
        </div>
        <div className="flex basis-1/2 flex-col gap-1">
          <InputField
            id="originalPrice"
            label="Giá sản phẩm"
            errorMessage={errors.originalPrice?.message}
            register={{ ...register('originalPrice') }}
            required={true}
            type="number"
          />
        </div>
      </div>
      {/* <div className="flex flex-col gap-1 text-sm">
        <CheckboxField
          label="Kích thước"
          register={{ ...register('size') }}
          checkboxList={SIZES}
        />
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <CheckboxField
          label="Màu sắc"
          register={{ ...register('colour') }}
          checkboxList={COLORS}
        />
      </div> */}
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
