import PropTypes from 'prop-types';

CheckboxField.propTypes = {
  label: PropTypes.string,
  register: PropTypes.object,
  checkboxList: PropTypes.array,
};

function CheckboxField({ label, register, errorMessage, checkboxList = [] }) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="flex w-fit gap-2">{label}</label>
      <div className="flex flex-wrap gap-5">
        {checkboxList.map((item, index) => (
          <label key={index} className="flex items-center gap-1">
            <input type="checkbox" {...register} value={item.value} />
            {item.name}
          </label>
        ))}
      </div>
      {errorMessage && (
        <p className="px-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default CheckboxField;
