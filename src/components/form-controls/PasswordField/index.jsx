import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

function PasswordField({
  id,
  label,
  errorMessage,
  register,
  autofocus = false,
  required = false,
  placeholder = '',
  readOnly = false,
  step,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="w-fit" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          autoComplete="off"
          readOnly={readOnly}
          placeholder={placeholder}
          autoFocus={autofocus}
          {...register}
          type={!showPassword ? 'password' : 'text'}
          id={id}
          step={step}
          className={`${readOnly ? 'bg-gray-200 outline-none' : 'outline-blue-500'} border-gray w-full rounded border border-solid py-2 pl-3 pr-10`}
        />
        <span
          onClick={togglePassword}
          className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center"
        >
          {!showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      {errorMessage && (
        <p className="px-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default PasswordField;
