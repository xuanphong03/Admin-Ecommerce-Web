import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

CheckboxField.propTypes = {
  label: PropTypes.string,
  register: PropTypes.object,
  checkboxList: PropTypes.array,
};

function CheckboxField({
  label,
  register,
  errorMessage,
  checkboxList = [],
  activeItemList,
}) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="flex w-fit gap-2">{label}</label>
      <div className="flex flex-wrap items-center gap-5">
        {checkboxList.map((item) => (
          <div key={uuidv4()} className="flex items-center gap-2">
            <label
              htmlFor={item.name}
              className={`flex size-5 cursor-pointer items-center justify-center border border-solid text-white ${!activeItemList.includes(item.value) ? 'border-gray-400 bg-white' : 'border-blue-500 bg-blue-500'}`}
            >
              <FaCheck />
            </label>
            <label htmlFor={item.name} className="cursor-pointer">
              {item.value}
            </label>
            <input
              hidden
              id={item.name}
              type="checkbox"
              {...register}
              value={item.value}
            />
          </div>
        ))}
      </div>
      {errorMessage && (
        <p className="px-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default CheckboxField;
