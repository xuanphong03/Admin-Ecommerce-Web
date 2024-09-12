import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa6';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField';

const schema = yup.object().shape({
  styleName: yup.string().required('Vui lòng nhập mô tả Phong cách.'),
  status: yup.number(),
  image_url: yup.string().url('Vui lòng nhập URL hợp lệ của ảnh minh họa.'),
  description: yup.string().required('Vui lòng nhập mô tả Phong cách.'), // Thay đổi hoặc thêm quy tắc xác thực nếu cần
});

function CreateStyleForm({ onSubmit }) {
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
            id="styleName"
            label="Tên phong cách"
            placeholder="Nhập tên phong cách"
            required={true}
            errorMessage={errors.styleName?.message}
            register={{ ...register('styleName') }}
          />
          <InputField
            id="image_url"
            label="Ảnh Minh họa phong cách"
            placeholder="Nhập Url của phong cách"
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
                alt="Ảnh minh họa phong cách"
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
              className="border-gray h-[240px] w-full resize-none border border-solid px-3 py-2 text-sm outline-blue-500"
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

export default CreateStyleForm;
