import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '~/apis/productApi';
import UpdateProductForm from '../components/UpdateForm';

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
        <UpdateProductForm productDetail={productDetail} />
      </div>
    </div>
  );
}

export default UpdateProduct;
