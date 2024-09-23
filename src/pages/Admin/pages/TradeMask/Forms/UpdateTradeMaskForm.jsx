import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa6';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField';

const schema = yup.object().shape({
  sku: yup
    .string()
    .max(10, 'SKU không được vượt quá 10 ký tự.')
    .required('Vui lòng nhập mã thương hiệu.'),
  tradeMarkName: yup.string().required('Vui lòng nhập mô tả thương hiệu.'),
  status: yup.string(),
});

function UpdateTradeMaskForm({ category, onSubmit }) {
  const { sku, name, status } = category;
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
      throw new Error(error);
    }
  };

  return (
    <>
      <h2 className="mb-5 text-center font-medium uppercase">
        Chỉnh sửa thương hiệu
      </h2>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col justify-between"
      >
        <div className="flex flex-col gap-2">
          <InputField
            id="sku"
            label="Mã loại sản phẩm"
            autofocus={true}
            placeholder="Nhập mã thương hiệu"
            required={true}
            readOnly={true}
            errorMessage={errors.sku?.message}
            register={{ ...register('sku', { value: sku }) }}
          />
          <InputField
            id="name"
            label="Tên thương hiệu"
            placeholder="Nhập tên thương hiệu"
            required={true}
            errorMessage={errors.tradeMarkName?.message}
            register={{ ...register('tradeMarkName', { value: name }) }}
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
              <option value={1}>Đang hợp tác</option>
              <option value={0}>Ngừng hợp tác</option>
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

export default UpdateTradeMaskForm;
