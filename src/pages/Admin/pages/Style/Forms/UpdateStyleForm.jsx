import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField';

const schema = yup.object().shape({
  styleName: yup.string().required('Vui lòng nhập mô tả Phong cách.'),
  status: yup.string(),
  image_url: yup.string().url('Vui lòng nhập URL hợp lệ của ảnh minh họa.'),
  description: yup.string().required('Vui lòng nhập mô tả Phong cách.'),
});

function UpdateStyleForm({ category, onSubmit }) {
  const { sku, name, description, status, image_url } = category;
  const [imageUrl, setImageUrl] = useState(image_url);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image_url: imageUrl,
      description: description,
    },
  });

  const formSubmit = async (data) => {
    if (!onSubmit) return;
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      //
    }
  };

  return (
    <>
      <h2 className="mb-5 text-center font-medium uppercase">
        Chỉnh sửa thông tin về Phong cách
      </h2>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
          <InputField
            id="styleName"
            label="Tên Phong cách"
            placeholder="Nhập tên Phong cách"
            required={true}
            readOnly={true}
            errorMessage={errors.styleName?.message}
            register={{ ...register('styleName', { value: name }) }}
          />
          <InputField
            id="image_url"
            label="Ảnh Minh họa"
            placeholder="Nhập Url của ảnh minh họa"
            required={true}
            errorMessage={errors.image_url?.message}
            register={{
              ...register('image_url', {
                value: image_url,
              }),
              onChange: (e) => setImageUrl(e.target.value),
            }}
          />
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Ảnh minh họa"
                className="max-h-60 w-full object-contain"
              />
            </div>
          )}
          <div>
            <label htmlFor="description">
              Mô tả<span className="text-red-500"> *</span>
            </label>
            <textarea
              id="description"
              placeholder="Nhập mô tả Phong cách"
              className="border-gray h-[240px] w-full border border-solid px-3 py-2 text-sm outline-blue-500"
              rows={4}
              {...register('description', { value: description })}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="status">
              Tình trạng<span className="text-red-500"> *</span>
            </label>
            <select
              {...register('status', { value: status })}
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
          } mt-10 rounded px-5 py-2 text-sm uppercase tracking-widest text-white`}
        >
          {isSubmitting ? (
            <p className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Loading...
            </p>
          ) : (
            'Cập nhật'
          )}
        </button>
      </form>
    </>
  );
}

export default UpdateStyleForm;
