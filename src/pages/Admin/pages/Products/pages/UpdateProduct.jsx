import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '~/apis/productApi';
import UpdateProductForm from '../components/UpdateForm';
import { toast } from 'react-toastify';
function UpdateProduct() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getProduct({ id });
        setProductDetail(response);
      } catch (error) {
        // Log error
      }
    })();
  }, [id]);

  // const handleUpdateProduct = (data) => {
  //   console.log(data);
  // };

  const handleUpdateProduct = async (data) => {
    console.log('handleUpdateProduct', data);
    try {
      await productApi.updateProduct(data);
      toast.success('Chỉnh sửa sản phẩm thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Chỉnh sửa sản phẩm thất bại', {
        autoClose: 3000,
      });
    }
  };
  const handleBackPrevPage = () => {
    history.back();
  };

  return (
    <div className="p-5">
      <div>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white"
          onClick={handleBackPrevPage}
        >
          Quay lại
        </button>
      </div>
      <h1 className="border-gray my-5 border-b border-solid pb-5 text-xl font-medium uppercase">
        Cập nhật thông tin sản phẩm
      </h1>
      <div>
        <UpdateProductForm
          onSubmit={handleUpdateProduct}
          productDetail={productDetail}
        />
      </div>
    </div>
  );
}

export default UpdateProduct;
