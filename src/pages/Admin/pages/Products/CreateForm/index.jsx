import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';
import { useState } from 'react';
import SelectField from '~/components/form-controls/SelectField';
import CheckboxField from '~/components/form-controls/CheckboxField';
import { FaSpinner } from 'react-icons/fa6';
import StorageKeys from '~/constants/storage-key';
import productApi from '~/apis/productApi';
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
  productSize: yup.array(),
  productColor: yup.array(),
  price: yup
    .number()
    .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
    .required('Vui lòng nhập giá sản phẩm')
    .min(1, 'Giá sản phẩm phải lớn hơn 0')
    .integer('Giá sản phẩm phải là số nguyên'),
  quantity: yup
    .number()
    .typeError('Vui lòng nhập số lượng sản phẩm hợp lệ')
    .required('Vui lòng nhập số lượng sản phẩm')
    .min(1, 'Số lượng sản phẩm phải lớn hơn 0')
    .integer('Số lượng sản phẩm phải là số nguyên'),
  images: yup
    .mixed()
    .required('Vui lòng upload ít nhất một ảnh sản phẩm')
    .test('fileType', ' Chỉ chấp nhận file ảnh', (value) => {
      if (!value.length) return false; // Không có file nào
      // console.log('Image: ', value);
      // console.log('Type of:', typeof value);
      // console.log(
      //   'Check: ',
      //   Array.from(value).every((file) =>
      //     ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      //   ),
      // );
      return Array.from(value).every((file) =>
        ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      ); // Kiểm tra từng file
    }),
});

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const COLORS = ['Trắng', 'Đen', 'Đỏ', 'Xám', 'Hồng'];

function CreateProductForm() {
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    try {
      const response = await productApi.addNewProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              id="price"
              label="Giá sản phẩm"
              errorMessage={errors.price?.message}
              register={{ ...register('price') }}
              required={true}
              type="number"
            />
          </div>
          <div className="basis-1/2">
            <InputField
              id="quantity"
              label="Số lượng sản phẩm"
              errorMessage={errors.quantity?.message}
              register={{ ...register('quantity') }}
              required={true}
              type="number"
            />
          </div>
        </div>

        {/* <CheckboxField
          checkboxList={SIZES}
          label="Kích cỡ"
          register={{ ...register('productSize') }}
        />
        <CheckboxField
          checkboxList={COLORS}
          label="Màu sắc"
          register={{ ...register('productColor') }}
        /> */}

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
    </>
  );
}

export default CreateProductForm;
