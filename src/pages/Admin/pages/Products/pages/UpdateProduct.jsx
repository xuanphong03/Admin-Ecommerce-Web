import { Link, useParams } from 'react-router-dom';
import UpdateProductForm from '../components/UpdateForm';
import productApi from '~/apis/productApi';
import { toast } from 'react-toastify';
function UpdateProduct() {
  const { id } = useParams();

  const handleUpdateProduct = async (data) => {
    try {
      await productApi.updateProduct(data);
      toast.success('Chỉnh sửa sản phẩm thành công');
    } catch (error) {
      toast.error('Chỉnh sửa sản phẩm thất bại');
    }
  };
  const handleBackPrevPage = () => {
    history.back();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-light">
          <Link
            to="/products"
            className="text-gray-400 transition-colors hover:text-blue-500"
          >
            Sản phẩm{' '}
          </Link>
          / Cập nhật sản phẩm
        </h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white"
          onClick={handleBackPrevPage}
        >
          Quay lại
        </button>
      </div>
      <hr className="my-5"></hr>
      <div>
        <UpdateProductForm onSubmit={handleUpdateProduct} productId={id} />
      </div>
    </div>
  );
}

export default UpdateProduct;
