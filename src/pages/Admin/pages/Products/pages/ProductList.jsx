import { useEffect, useState } from 'react';
import TableHeader from '../components/TableHeader';
import { formatPrice } from '~/utils/fomatCurrency';
import { TiEdit } from 'react-icons/ti';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CreateProductForm from '../CreateForm';
import productApi from '~/apis/productApi';
function ProductsList() {
  const [productsList, setProductsList] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await productApi.getAllProducts();
      console.log('data all products', data);
      setProductsList(data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (data) => {
    try {
      const { images, ...payload } = data;
      console.log(payload);
      const response = await productApi.addNewProduct({
        ...payload,
        saleDiscountPercent: 0,
      });
      // console.log(response);
      await fetchProducts();
      setIsCreating(false);
    } catch (error) {
      // throw new Error(error);
    }
  };
  const handleDeleteProduct = (id) => {};

  return (
    <>
      <section className="relative px-5 py-6">
        <div className="border-b border-solid border-black pb-5">
          <button
            className="rounded bg-green-600 px-5 py-2 text-sm text-[#f5f5f5]"
            onClick={() => setIsCreating(true)}
          >
            Thêm sản phâm mới
          </button>
        </div>
        <div className="pt-5">
          <TableHeader />
          <div className="w-full py-2 shadow-table">
            {productsList.map((productItem, index) => (
              <div
                key={productItem.id}
                className={`${index < productsList.length - 1 ? 'border-gray border-b border-solid' : ''}`}
              >
                <div className="flex justify-between py-3 text-sm">
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <p>{index + 1}</p>
                  </div>
                  <div className="flex basis-[5%] items-center justify-center text-center">
                    <div className="size-10">
                      <img
                        className="max-w-full"
                        alt="product thumbnail"
                        src={productItem.images.length && productItem.images[0]}
                      />
                    </div>
                  </div>
                  <div className="flex basis-[20%] items-center justify-center">
                    <h3 className="line-clamp-2 px-5">{productItem.name}</h3>
                  </div>
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <p>{formatPrice(productItem.originalPrice, 'VNĐ')}</p>
                  </div>
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <p>{formatPrice(productItem.finalPrice, 'VNĐ')}</p>
                  </div>
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <p>{productItem.saleDiscountPercent}%</p>
                  </div>
                  <div className="flex basis-[20%] items-center justify-center">
                    <p className="line-clamp-2">{productItem.description}</p>
                  </div>

                  <div className="flex basis-[15%] flex-col items-center justify-center gap-2 text-xs">
                    <Link
                      to={`/product/${productItem.id}`}
                      className="flex w-1/2 items-center justify-center gap-2 rounded bg-blue-600 px-3 py-2 text-[#fafafa] hover:bg-blue-500"
                    >
                      Chi tiết
                      <FaEye />
                    </Link>

                    <button
                      onClick={handleDeleteProduct}
                      className="flex w-1/2 items-center justify-center gap-2 rounded bg-red-600 px-3 py-2 text-[#fafafa] hover:bg-red-500"
                    >
                      Xóa
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isCreating && (
        <>
          <div
            onClick={() => {
              setIsCreating(false);
            }}
            className="fixed inset-0 z-[9999] bg-black opacity-40"
          ></div>
          <div className="absolute left-1/2 top-1/2 z-[99999] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded bg-white px-5 pb-8 pt-5">
            <h2 className="mb-10 text-center text-xl font-medium uppercase">
              Thêm sản phẩm
            </h2>
            <span
              onClick={() => {
                setIsCreating(false);
              }}
              className="absolute right-0 top-0 flex size-10 cursor-pointer items-center justify-center text-3xl"
            >
              &times;
            </span>
            <CreateProductForm onSubmit={handleCreateProduct} />
          </div>
        </>
      )}
    </>
  );
}

export default ProductsList;
