function SelectField({ id, label, register, errorMessage, options }) {
  console.log(options);
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="w-fit" htmlFor={id}>
        {label}
      </label>
      <select
        {...register}
        id={id}
        className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
      >
        {options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
      {errorMessage && (
        <p className="px-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default SelectField;
