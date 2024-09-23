import PropTypes from 'prop-types';
import { IoWarningOutline } from 'react-icons/io5';

DeleteForm.propTypes = {
  product: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

function DeleteForm({ productId, onSubmit, onCancel }) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleDelete = () => {
    if (onSubmit) {
      onSubmit(productId);
    }
  };

  return (
    <div className="flex flex-col items-center px-20 py-2">
      <IoWarningOutline className="text-8xl text-yellow-500" />
      <h1 className="mb-1 mt-5 text-2xl font-bold">Bạn chắc chứ ?</h1>
      <p className="text-sm text-gray-700">
        Bạn thật sự muốn xóa sản phẩm này?
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="rounded bg-red-500 px-4 py-1 text-white hover:bg-red-400"
        >
          Hủy
        </button>
        <button
          onClick={handleDelete}
          className="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-400"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}

export default DeleteForm;
