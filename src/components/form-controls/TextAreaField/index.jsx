function TextAreaField({
  id,
  label,
  errorMessage,
  register,
  autofocus = false,
  required = false,
  placeholder = '',
}) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        autoFocus={autofocus}
        {...register}
        id={id}
        rows={4}
        className="border-gray w-full resize-none border border-solid px-3 py-2 outline-blue-500"
      ></textarea>
      {errorMessage && (
        <p className="px-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default TextAreaField;
