import React from 'react';
import PropTypes from 'prop-types';

CheckboxField.propTypes = {};

function CheckboxField({ label, register, checkboxList = [] }) {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="flex gap-2">
        {label}
        <span className="text-sm font-light text-gray-500">(Tùy chọn)</span>
      </label>
      <div className="flex flex-wrap gap-5">
        {checkboxList.map((item, index) => (
          <label key={index} className="flex items-center gap-2">
            <input type="checkbox" {...register} name="productSize" value="S" />
            {item}
          </label>
        ))}
      </div>

      {/* <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="productSize"
            {...register('productSize')}
            value="S"
          />
          Size S
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="productSize"
            {...register('productSize')}
            value="M"
          />
          Size M
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="productSize"
            {...register('productSize')}
            value="L"
          />
          Size L
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="productSize"
            {...register('productSize')}
            value="XL"
          />
          Size XL
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="productSize"
            {...register('productSize')}
            value="2XL"
          />
          Size 2XL
        </label>
      </div> */}
    </div>
  );
}

export default CheckboxField;
