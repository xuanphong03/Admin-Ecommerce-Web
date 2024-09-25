import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useContext } from 'react';
import InputField from '~/components/form-controls/InputField';
import PasswordField from '~/components/form-controls/PasswordField';
import { UserContext } from '.';

function UserForm() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Vui lòng nhập tên người quản trị mới.')
      .test('invalid name', 'Tên không được chứa chữ số', (name) => {
        const namePattern = /\d/;
        return !namePattern.test(name);
      }),
    email: yup
      .string()
      .required('Vui lòng nhập email của người quản trị mới.')
      .email('Vui lòng nhập email hợp lệ.'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu.')
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự.'),
    retypePassword: yup
      .string()
      .required('Vui lòng nhập lại mật khẩu.')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { toggleForm, onCreateAccount } = useContext(UserContext);
  const submitForm = async (data) => {
    onCreateAccount({
      ...data,
      img_url:
        'https://i.pinimg.com/736x/80/57/d2/8057d2a6c2f8f65cfdd762f2bbe98cf2.jpg',
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute w-[500px] rounded-md bg-white px-10 py-5">
        <h2 className="mb-5 text-center font-medium uppercase">
          Thêm mới tài khoản quản trị
        </h2>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex w-full flex-col gap-5"
        >
          <div>
            <InputField
              autofocus
              label="Họ và tên"
              id="uname"
              placeholder="Nhập tên quản trị viên"
              errorMessage={errors.name?.message}
              register={{ ...register('name') }}
            />
          </div>
          <div>
            <InputField
              label="Email"
              id="email"
              placeholder="Nhập email của quản trị viên"
              errorMessage={errors.email?.message}
              register={{ ...register('email') }}
            />
          </div>
          <div>
            <PasswordField
              label="Mật khẩu"
              id="password"
              placeholder="Nhập mật khẩu"
              errorMessage={errors.password?.message}
              register={{ ...register('password') }}
            />
          </div>
          <div>
            <PasswordField
              label="Họ và tên"
              id="retypePassword"
              placeholder="Nhập lại mật khẩu"
              errorMessage={errors.retypePassword?.message}
              register={{ ...register('retypePassword') }}
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={toggleForm}
              className="rounded bg-red-500 px-5 py-2 text-sm text-white hover:opacity-80"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded bg-green-500 px-5 py-2 text-sm text-white hover:opacity-80"
            >
              Tạo tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
