function InputField({
  id,
  label,
  errorMessage,
  register,
  autofocus = false,
  required = false,
  type = 'text',
  placeholder = '',
  readOnly = false,
}) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        readOnly={readOnly}
        placeholder={placeholder}
        autoFocus={autofocus}
        {...register}
        type={type}
        id={id}
        name={id}
        className="border-gray w-full border border-solid px-3 py-2 outline-blue-500"
      />
      {errorMessage && (
        <p className="px-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default InputField;
