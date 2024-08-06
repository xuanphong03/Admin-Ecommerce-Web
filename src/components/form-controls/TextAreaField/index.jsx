function TextAreaField({
  id,
  label,
  errorMessage,
  register,
  autofocus = false,
  required = false,
  placeholder = '',
  rows = 5,
  readOnly = false,
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
        rows={rows}
        readOnly={readOnly}
        className={`${readOnly ? 'bg-gray-200 outline-none' : 'outline-blue-500'} border-gray w-full resize-none rounded border border-solid px-3 py-2`}
      ></textarea>
      {errorMessage && (
        <p className="px-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default TextAreaField;
