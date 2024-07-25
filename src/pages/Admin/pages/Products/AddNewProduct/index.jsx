import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '~/components/form-controls/InputField';

function AddNewProduct() {
  const schema = yup.object().shape({
    productName: yup.string().required('Vui lòng nhập tên sản phẩm.'),
    productDesc: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
    productType: yup.string(),
    productSize: yup.array(),
    productColor: yup.array(),
    productQuantity: yup
      .number()
      .typeError('Vui lòng nhập số lượng sản phẩm hợp lệ')
      .required('Vui lòng nhập số lượng sản phẩm')
      .min(1, 'Số lượng sản phẩm phải lớn hơn 0')
      .integer('Số lượng sản phẩm phải là số nguyên'),
    productImages: yup
      .mixed()
      .required('Vui lòng upload ít nhất một ảnh sản phẩm')
      .test('fileType', ' Chỉ chấp nhận file ảnh', (value) => {
        if (!value.length) return false; // Không có file nào
        for (let i = 0; i < value.length; i++) {
          if (
            !['image/jpeg', 'image/png', 'image/gif'].includes(value[i].type)
          ) {
            return false; // Không phải file ảnh
          }
        }
        return true;
      }),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formSubmit = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className="mx-auto w-1/2 px-5 py-4">
      <h2 className="mb-10 text-center text-xl font-medium">
        Thêm mới sản phẩm
      </h2>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="shadow-table flex flex-col gap-5 px-5 py-3"
      >
        <InputField
          id="productName"
          label="Tên sản phẩm"
          errorMessage={errors.productName?.message}
          register={{ ...register('productName') }}
          autofocus={true}
          required={true}
        />
        <InputField
          id="productDesc"
          label="Mô tả sản phẩm"
          errorMessage={errors.productDesc?.message}
          register={{ ...register('productDesc') }}
          required={true}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="productTypes">Loại sản phẩm</label>
          <select
            {...register('productType')}
            id="productTypes"
            name="productTypes"
            className="border-gray w-full border border-solid px-3 py-1 outline-blue-500"
          >
            <option value="phones">Điện thoại</option>
            <option value="computers">Máy tính</option>
            <option value="smart-watch">Đồng hồ thông minh</option>
            <option value="camera">Máy ảnh</option>
            <option value="headphones">Tai nghe</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>
            Kích cỡ{'  '}
            <span className="text-sm font-light text-gray-500">(Tùy chọn)</span>
          </label>
          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productSize"
                {...register('productSize')}
                value="S"
              />
              Size S
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productSize"
                {...register('productSize')}
                value="M"
              />
              Size M
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productSize"
                {...register('productSize')}
                value="L"
              />
              Size L
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productSize"
                {...register('productSize')}
                value="XL"
              />
              Size XL
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productSize"
                {...register('productSize')}
                value="2XL"
              />
              Size 2XL
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>
            Màu sắc{'  '}
            <span className="text-sm font-light text-gray-500">(Tùy chọn)</span>
          </label>
          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productColor"
                {...register('productColor')}
                value="red"
              />
              Đỏ
              <span className="size-3 border border-solid border-black bg-red-500"></span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productColor"
                {...register('productColor')}
                value="white"
              />
              Trắng
              <span className="size-3 border border-solid border-black bg-white"></span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productColor"
                {...register('productColor')}
                value="gray"
              />
              Xám
              <span className="size-3 border border-solid border-black bg-gray-500"></span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productColor"
                {...register('productColor')}
                value="yellow"
              />
              Vàng
              <span className="size-3 border border-solid border-black bg-yellow-500"></span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="productColor"
                {...register('productColor')}
                value="black"
              />
              Đen
              <span className="size-3 border border-solid border-black bg-black"></span>
            </label>
          </div>
        </div>

        <InputField
          id="productQuantity"
          label="Số lượng sản phẩm"
          errorMessage={errors.productQuantity?.message}
          register={{ ...register('productQuantity') }}
          required={true}
          type="number"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="productTypes">Ảnh minh họa sản phẩm</label>
          <input type="file" {...register('productImages')} multiple />
          {errors.productImages && (
            <p className="px-1 text-sm text-red-500">
              {errors.productImages.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-10 py-2 text-white hover:bg-blue-400"
        >
          Thêm mới sản phẩm
        </button>
      </form>
    </section>
  );
}

export default AddNewProduct;
