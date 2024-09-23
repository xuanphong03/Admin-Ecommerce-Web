import PropTypes from 'prop-types';

DeleteForm.propTypes = {
  category: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

function DeleteForm({ category, onDelete, onCancel }) {
  const handleDelete = () => {
    if (!onDelete) return;
    onDelete(category.id);
  };

  const handleCancel = () => {
    if (!onCancel) return;
    onCancel();
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-medium uppercase">Xác nhận</h1>
      <p className="text-sm">
        Bạn thật sự muốn xóa Thương hiệu <i>{category.name}</i> Nếu bạn đồng ý
        xóa thì tất cả các sản phẩm liên quan đến loại sản phẩm này cũng được
        xóa theo. Bạn chắc chắn muốn xóa chứ?
      </p>
      <div className="flex translate-y-3 justify-end gap-2">
        <button
          onClick={handleCancel}
          className="rounded bg-red-500 px-4 py-1 text-white transition-all hover:bg-red-400"
        >
          Hủy
        </button>
        <button
          onClick={handleDelete}
          className="rounded bg-blue-500 px-4 py-1 text-white transition-all hover:bg-blue-400"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default DeleteForm;
