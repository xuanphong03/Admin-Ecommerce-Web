import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa6';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField';

const schema = yup.object().shape({
  materialName: yup.string().required('Vui lòng nhập mô tả Chất liệu.'),
  status: yup.string(),
  image_url: yup.string().url('Vui lòng nhập URL hợp lệ của ảnh minh họa.'),
  description: yup.string().required('Vui lòng nhập mô tả Chất liệu.'),
});

function UpdateMaterialForm({ category, onSubmit }) {
  const { name, status } = category;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
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
        Chỉnh sửa chất liệu
      </h2>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
          <InputField
            id="materialName"
            label="Tên Chất liệu"
            readOnly={true}
            placeholder="Nhập tên Chất liệu"
            required={true}
            errorMessage={errors.materialName?.message}
            register={{ ...register('materialName', { value: name }) }}
          />

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

export default UpdateMaterialForm;
