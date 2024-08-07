import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa6';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField';

const schema = yup.object().shape({
  sku: yup
    .string()
    .matches(/^[A-Za-z0-9]*$/, 'Mã thương hiệu chỉ được chứa chữ cái và số.')
    .max(10, 'SKU không được vượt quá 10 ký tự.')
    .required('Vui lòng nhập mã loại sản phẩm.'),
  tradeMarkName: yup.string().required('Vui lòng nhập mô tả thương hiệu.'),
  status: yup.number(),
  image_url: yup.string().url('Vui lòng nhập URL hợp lệ của ảnh minh họa.'),
  description: yup.string().required('Vui lòng nhập mô tả thương hiệu.'), // Thay đổi hoặc thêm quy tắc xác thực nếu cần
});

function CreateTradeMaskForm({ onSubmit }) {
  const [imageUrl, setImageUrl] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  return (
    <>
      <h2 className="mb-5 text-center font-medium uppercase">
        Thêm mới thương hiệu
      </h2>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
          <InputField
            id="sku"
            label="Mã thương hiệu"
            autofocus={true}
            placeholder="Nhập mã thương hiệu"
            required={true}
            errorMessage={errors.sku?.message}
            register={{ ...register('sku') }}
          />
          <InputField
            id="tradeMarkName"
            label="Tên thương hiệu"
            placeholder="Nhập tên thương hiệu"
            required={true}
            errorMessage={errors.tradeMarkName?.message}
            register={{ ...register('tradeMarkName') }}
          />
          <InputField
            id="image_url"
            label="Ảnh Minh họa Thương hiệu"
            placeholder="Nhập Url của ảnh minh họa"
            required={true}
            errorMessage={errors.image_url?.message}
            register={{
              ...register('image_url'),
              onChange: (e) => setImageUrl(e.target.value),
            }}
          />
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Ảnh minh họa thương hiệu"
                className="max-h-80 w-full object-contain"
              />
            </div>
          )}
          <div>
            <label htmlFor="description">Mô tả</label>
            <textarea
              {...register('description')}
              id="description"
              placeholder="Nhập mô tả"
              rows="5"
              className="border-gray w-full resize-none border border-solid px-3 py-2 text-sm outline-blue-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="status">
              Tình trạng<span className="text-red-500"> *</span>
            </label>
            <select
              {...register('status')}
              className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
              id="status"
            >
              <option value={1}>Còn kinh doanh</option>
              <option value={0}>Ngừng kinh doanh</option>
            </select>
          </div>
        </div>
        <button
          className={`${
            isSubmitting
              ? 'cursor-not-allowed bg-green-500'
              : 'cursor-pointer bg-green-600 hover:bg-green-500'
          } mt-10 rounded px-5 py-2 text-sm uppercase tracking-widest text-white outline-none`}
        >
          {isSubmitting ? (
            <p className="flex items-center justify-center gap-4">
              <FaSpinner className="animate-spin" />
              Loading...
            </p>
          ) : (
            'Thêm mới'
          )}
        </button>
      </form>
    </>
  );
}

export default CreateTradeMaskForm;
