import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa6';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField';

const schema = yup.object().shape({
  categoryCode: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  categoryName: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  categoryStatus: yup.string(),
});

function UpdateCategoryForm({ category, onSubmit }) {
  const { categoryCode, categoryName, categoryStatus } = category;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const formSubmit = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
    reset();
  };
  return (
    <>
      <h2 className="mb-5 text-center font-medium uppercase">
        Chỉnh sửa loại sản phẩm
      </h2>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col justify-between"
      >
        <div className="flex flex-col gap-5">
          <InputField
            id="categoryCode"
            label="Mã loại sản phẩm"
            autofocus={true}
            placeholder="Nhập mã loại sản phẩm"
            required={true}
            readOnly={true}
            errorMessage={errors.categoryCode?.message}
            register={{
              ...register('categoryCode', {
                value: categoryCode,
              }),
            }}
          />
          <InputField
            id="categoryName"
            label="Tên loại sản phẩm"
            placeholder="Nhập tên loại sản phẩm"
            required={true}
            errorMessage={errors.categoryName?.message}
            register={{
              ...register('categoryName', {
                value: categoryName,
              }),
            }}
          />
          <div>
            <label htmlFor="categoryStatus">
              Tình trạng<span className="text-red-500"> *</span>
            </label>
            <select
              {...register('categoryStatus', {
                value: categoryStatus,
              })}
              className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
              id="categoryStatus"
            >
              <option value="Còn kinh doanh">Còn kinh doanh</option>
              <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
            </select>
          </div>
        </div>
        <button
          className={`${isSubmitting ? 'cursor-not-allowed bg-green-500' : 'cursor-pointer bg-green-600 hover:bg-green-500'} mt-10 rounded px-5 py-2 text-sm uppercase tracking-widest text-white`}
        >
          {isSubmitting ? (
            <p className="flex items-center justify-center gap-4">
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

export default UpdateCategoryForm;
