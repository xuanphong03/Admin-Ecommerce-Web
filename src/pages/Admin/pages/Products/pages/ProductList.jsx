import { useState } from 'react';
import TableHeader from '../components/TableHeader';
import { formatPrice } from '~/utils/fomatCurrency';
import { TiEdit } from 'react-icons/ti';
import { MdDeleteOutline } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function ProductsList() {
  const handleDeleteProduct = (id) => {};
  const [productsList, setProductsList] = useState([
    {
      id: 1,
      img: `https://firebasestorage.googleapis.com/v0/b/ecommerce-website-5ff4a.appspot.com/o/product_images%2Fproduct04.png?alt=media&token=a51497fc-4824-4523-9101-fe19ac47025f`,
      name: `ASUS FHD Gaming Laptop ASUS FHD Gaming Laptop ASUS FHD Gaming Laptop
          ASUS FHD Gaming Laptop`,
      price: 5000000,
      salePercent: 0,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum`,
      quantity: 100,
    },
    {
      id: 2,
      img: `https://firebasestorage.googleapis.com/v0/b/ecommerce-website-5ff4a.appspot.com/o/product_images%2Fproduct01.png?alt=media&token=527fbc62-8677-4cb1-b00c-0d149f9c3631`,
      name: `HAVIT HV-G92 Gamepad`,
      price: 5000000,
      salePercent: 10,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum`,
      quantity: 100,
    },
  ]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(null);

  const handleCreateProduct = (data) => {
    console.log(data);
  };
  const handleUpdateProduct = (data) => {
    console.log(data);
  };
  return (
    <>
      <section className="relative px-5 py-6">
        <div className="">
          <TableHeader />
          <div className="w-full py-2 shadow-table">
            {productsList.map((productItem, index) => (
              <div
                key={productItem.id}
                className={`${index < productsList.length - 1 ? 'border-gray border-b border-solid' : ''}`}
              >
                <div className="flex justify-between py-3 text-sm">
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <p>{productItem.id}</p>
                  </div>
                  <div className="flex basis-[5%] items-center justify-center text-center">
                    <div className="size-10">
                      <img
                        className="max-w-full"
                        alt="product thumbnail"
                        src={productItem.img}
                      />
                    </div>
                  </div>
                  <div className="flex basis-[20%] items-center">
                    <h3 className="line-clamp-2 px-5">{productItem.name}</h3>
                  </div>
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <p>{formatPrice(productItem.price, 'VNĐ')}</p>
                  </div>
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <p>{productItem.salePercent}%</p>
                  </div>
                  <div className="flex basis-[20%] items-center">
                    <p className="line-clamp-2">{productItem.description}</p>
                  </div>
                  <div className="flex basis-[10%] items-center justify-center text-center">
                    <p>{productItem.quantity}</p>
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
                        setIsOpenForm(true);
                        setIsUpdating(true);
                        setUpdatedProduct(productItem);
                      }}
                      className="flex w-1/2 items-center justify-center gap-2 rounded bg-green-600 px-3 py-2 text-[#fafafa] hover:bg-green-500"
                    >
                      Sửa
                      <TiEdit />
                    </button>
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
      {isOpenForm && (
        <>
          <div
            onClick={() => {
              setIsOpenForm(false);
              setIsCreating(false);
            }}
            className="fixed inset-0 z-[9999] bg-black opacity-40"
          ></div>
        </>
      )}
    </>
  );
}

export default ProductsList;
