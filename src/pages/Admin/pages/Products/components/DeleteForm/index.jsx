import PropTypes from 'prop-types';

DeleteForm.propTypes = {
  product: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

function DeleteForm({ product, onSubmit, onCancel }) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleDelete = () => {
    if (onSubmit) {
      onSubmit(product.id);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-medium uppercase">Xác nhận xóa sản phẩm</h1>
      <p className="my-5 text-sm">
        Bạn thật sự muốn xóa sản phẩm <i>{product.name}</i> chứ?
      </p>
      <div className="flex justify-end gap-5">
        <button
          onClick={handleCancel}
          className="rounded bg-red-500 px-4 py-1 text-white hover:bg-red-400"
        >
          Hủy
        </button>
        <button
          onClick={handleDelete}
          className="rounded bg-green-500 px-4 py-1 text-white hover:bg-green-400"
        >
          Xóa sản phẩm
        </button>
      </div>
    </div>
  );
}

export default DeleteForm;
