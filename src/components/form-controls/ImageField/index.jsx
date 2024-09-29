import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

ImageField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  type: PropTypes.string,
  index: PropTypes.number,
};

function ImageField({
  label,
  id,
  onSelect,
  type,
  index,
  imageList,
  previewImage = null,
}) {
  const [image, setImage] = useState(null);

  const checkExistImage = (file) => {
    let isExist = false;
    for (let i = 0; i < imageList.length; i++) {
      if (imageList[i]) {
        const fileName = imageList[i]?.name;
        if (file.name === fileName) {
          toast.warning('Ảnh này đã được chọn. Vui lòng chọn ảnh khác');
          isExist = true;
          break;
        }
      }
    }
    return isExist;
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (checkExistImage(file)) return;
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);
      if (onSelect) {
        onSelect(file, type, index);
      }
    }
  };

  return (
    <Fragment>
      <p>{label}</p>
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor={id}
          className={`${image !== null ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600'} flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500`}
        >
          <div className="flex max-h-full flex-col items-center justify-center pb-6 pt-5">
            {image !== null || previewImage !== null ? (
              <img
                className="max-h-full"
                alt="image"
                src={image || previewImage}
              />
            ) : (
              <Fragment>
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </Fragment>
            )}
          </div>
          <input
            id={id}
            onChange={handleChange}
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
          />
        </label>
      </div>
    </Fragment>
  );
}

export default ImageField;
