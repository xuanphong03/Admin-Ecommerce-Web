import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { useState } from 'react';

import { FaCheck } from 'react-icons/fa6';

AuthenticationPage.propTypes = {};

function AuthenticationPage() {
  const schema = yup.object().shape({
    identifier: yup.string().required('Vui lòng nhập tài khoản.'),
    password: yup.string().required('Vui lòng nhập mật khẩu.'),
  });

  const [rememberPassword, setRememberPassword] = useState(false);

  const handleRememberPassword = (e) => {
    setRememberPassword((prevStatus) => !prevStatus);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = async (data) => {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-[500px] rounded bg-white px-10 py-10">
        <h1 className="mb-10 text-center text-2xl font-medium uppercase tracking-widest">
          Đăng nhập
        </h1>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="login-account">Tài khoản</label>
            <input
              {...register('identifier')}
              autoFocus={true}
              id="login-account"
              className="border-gray h-10 w-full rounded border border-solid px-4 py-2 outline-blue-400"
              placeholder="Tên đăng nhập..."
            />
            {errors.identifier?.message && (
              <p className="px-2 text-sm text-red-500">
                {errors.identifier?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="login-password">Mật khẩu</label>
            <input
              {...register('password')}
              id="login-password"
              className="border-gray h-10 w-full rounded border border-solid px-4 py-2 outline-blue-400"
              placeholder="Mật khẩu..."
            />
            {errors.password?.message && (
              <p className="px-2 text-sm text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label
              onClick={handleRememberPassword}
              className="flex items-center gap-1"
            >
              <span
                className={`size-4 rounded-sm border border-solid border-[#2c2c2c] text-sm`}
              >
                {rememberPassword && <FaCheck className="" />}
              </span>
              Nhớ mật khẩu
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-10 py-2 text-white hover:bg-blue-500"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthenticationPage;
