import PropTypes from 'prop-types';

CheckboxField.propTypes = {
  label: PropTypes.string,
  register: PropTypes.object,
  checkboxList: PropTypes.array,
};

function CheckboxField({ label, register, checkboxList = [] }) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="flex w-fit gap-2">
        {label}
        <span className="text-sm font-light text-gray-500">(Tùy chọn)</span>
      </label>
      <div className="flex flex-wrap gap-5">
        {checkboxList.map((item, index) => (
          <label key={index} className="flex items-center gap-1">
            <input type="checkbox" {...register} value={item.value} />
            {item.name}
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckboxField;
