import productApi from '~/apis/productApi';
import CreateProductForm from '../components/CreateForm';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function CreateProductPage() {
  const navigate = useNavigate();
  const handleCreateProduct = async (data) => {
    try {
      await productApi.addNewProduct(data);
      // console.log(response);
      navigate('/products');
      toast.success('Thêm sản phẩm thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Thêm sản phẩm thất bại', {
        autoClose: 3000,
      });
    }
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
          / Thêm sản phẩm
        </h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white"
          onClick={() => history.back()}
        >
          Quay lại
        </button>
      </div>
      <hr className="my-5"></hr>
      <div>
        <CreateProductForm onSubmit={handleCreateProduct} />
      </div>
    </div>
  );
}

export default CreateProductPage;
