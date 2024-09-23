import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import InputField from '~/components/form-controls/InputField';

const schema = yup.object().shape({
  sku: yup
    .string()
    .matches(/^[A-Za-z0-9]*$/, 'Mã sản phẩm chỉ được chứa chữ cái và số.')
    .max(10, 'SKU không được vượt quá 10 ký tự.')
    .required('Vui lòng nhập mã loại sản phẩm.'),
  categoryName: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  brands: yup
    .array()
    .min(1, 'Vui lòng nhập ít nhất 1 hãng sản phẩm cho loại sản phẩm')
    .required('Vui lòng nhập ít nhất 1 hãng sản phẩm cho loại sản phẩm'),
  status: yup.number(),
});

function CreateCategoryForm({ onSubmit }) {
  const [brandName, setBrandName] = useState('');
  const [brandsList, setBrandsList] = useState([]);
  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!brandName.trim() || brandsList.includes(brandName)) {
      brandsList.includes(brandName) &&
        toast.error('Thương hiệu này đã tồn tại trong danh sách', {
          autoClose: 3000,
        });
      return;
    }

    const newBrandsList = [...brandsList, brandName];
    setBrandsList(newBrandsList);
    setValue('brands', newBrandsList);
    clearErrors('brands');
    setBrandName('');
  };

  const handleRemoveBrand = (brand) => {
    const newBrandsList = brandsList.filter((_brand) => _brand !== brand);
    setBrandsList(newBrandsList);
    setValue('brands', newBrandsList);
    if (!newBrandsList.length) {
      setError('brands');
    }
  };

  return (
    <>
      <h2 className="mb-5 text-center font-medium uppercase">
        Thêm mới loại sản phẩm
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
            placeholder="Nhập mã loại sản phẩm"
            required={true}
            errorMessage={errors.sku?.message}
            register={{ ...register('sku') }}
          />
          <InputField
            id="categoryName"
            label="Tên loại sản phẩm"
            placeholder="Nhập tên loại sản phẩm"
            required={true}
            errorMessage={errors.categoryName?.message}
            register={{ ...register('categoryName') }}
          />

          <div className="flex flex-col gap-1 text-sm">
            <label className="w-fit" htmlFor="brand">
              Chi tiết loại sản phẩm<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                placeholder="Nhập Tên Chi tiết loại sản phẩm"
                value={brandName}
                onChange={(e) => {
                  const newBrandName = e.target.value;
                  setBrandName(newBrandName);
                }}
                type="text"
                id="brand"
                className={`border-gray w-full rounded border border-solid px-3 py-2 outline-blue-500`}
              />
              <button
                onClick={handleAddBrand}
                className="absolute right-0 top-1/2 h-full -translate-y-1/2 rounded-r bg-blue-500 px-2 text-white hover:bg-blue-400"
              >
                Thêm
              </button>
            </div>
            {brandsList.length ? (
              <ul className="mt-2 flex flex-wrap gap-2">
                {brandsList.map((brand, index) => {
                  return (
                    <li
                      key={index}
                      className="relative h-fit w-fit max-w-40 break-words rounded bg-sky-500 px-4 py-1 text-white"
                    >
                      <span
                        onClick={() => handleRemoveBrand(brand)}
                        className="absolute -right-1 -top-1 flex size-4 cursor-pointer items-center justify-center rounded-full bg-red-500"
                      >
                        &times;
                      </span>
                      {brand}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <></>
            )}
            {errors.brands?.message && (
              <p className="px-1 text-red-500">{errors.brands?.message}</p>
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

export default CreateCategoryForm;
