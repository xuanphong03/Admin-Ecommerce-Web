import productApi from '~/apis/productApi';
import CreateProductForm from '../components/CreateForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateProductPage() {
  const navigate = useNavigate();
  const handleCreateProduct = async (data) => {
    try {
      await productApi.addNewProduct({
        ...data,
        saleDiscountPercent: 0,
      });
      // console.log(response);
      navigate('/product');
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
    <div className="px-5 py-5">
      <h1 className="border-gray border-b border-solid pb-5 text-xl font-medium uppercase">
        Thêm sản phẩm
      </h1>
      <div className="py-5">
        <CreateProductForm onSubmit={handleCreateProduct} />
      </div>
    </div>
  );
}

export default CreateProductPage;
