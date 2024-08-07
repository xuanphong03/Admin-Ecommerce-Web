import { useEffect, useState } from 'react';
import { formatPrice } from '~/utils/formatCurrency';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TableHeader from '../components/TableHeader';
import productApi from '~/apis/productApi';
import DeleteForm from '../components/DeleteForm';
import { toast } from 'react-toastify';
function ProductsList() {
  const [productsList, setProductsList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedProduct, setDeletedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await productApi.getAllProducts();
      setProductsList(data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // const handleCreateProduct = async (data) => {
  //   try {
  //     await productApi.addNewProduct({
  //       ...data,
  //       saleDiscountPercent: 0,
  //     });
  //     // console.log(response);
  //     await fetchProducts();
  //     setIsCreating(false);
  //     toast.success('Thêm sản phẩm thành công', {
  //       autoClose: 3000,
  //     });
  //   } catch (error) {
  //     toast.error('Thêm sản phẩm thất bại', {
  //       autoClose: 3000,
  //     });
  //   }
  // };
  const handleDeleteProduct = async (id) => {
    try {
      await productApi.deleteProduct(id);
      fetchProducts();
      toast.success('Xóa sản phẩm thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Xóa sản phẩm thất bại', {
        autoClose: 3000,
      });
    }
    setIsDeleting(false);
  };
  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <>
      <section className="relative px-5 py-6">
        <div className="border-b border-solid border-black pb-5">
          <Link to="/product/create_product">
            <button className="rounded bg-green-600 px-5 py-2 text-sm text-[#f5f5f5]">
              Thêm sản phâm mới
            </button>
          </Link>
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
                  <div className="flex basis-[5%] items-center justify-center text-center">
                    <p>{index + 1}</p>
                  </div>
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <div className="flex size-16 items-center justify-center">
                      <img
                        className="max-w-full"
                        alt="product thumbnail"
                        src={
                          (productItem.images.length &&
                            productItem.images[0].img_url) ||
                          productItem.imageMain
                        }
                      />
                    </div>
                  </div>
                  <div className="flex basis-[20%] items-center justify-center">
                    <h3 className="line-clamp-2 px-5">{productItem.name}</h3>
                  </div>
                  <div className="flex basis-[15%] items-center justify-center break-words text-center">
                    <p>{formatPrice(productItem.originalPrice, 'VNĐ')}</p>
                  </div>
                  <div className="flex basis-[15%] items-center justify-center break-words text-center">
                    <p>{formatPrice(productItem.finalPrice, 'VNĐ')}</p>
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
                      onClick={() => {
                        setIsDeleting(true);
                        setDeletedProduct(productItem);
                      }}
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
      {isDeleting && (
        <>
          <div
            onClick={() => {
              setIsDeleting(false);
            }}
            className="fixed inset-0 z-[9999] bg-black opacity-40"
          ></div>
          <div className="absolute left-1/2 top-1/2 z-[99999] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4">
            <DeleteForm
              onSubmit={handleDeleteProduct}
              onCancel={handleCancelDelete}
              product={deletedProduct}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ProductsList;
