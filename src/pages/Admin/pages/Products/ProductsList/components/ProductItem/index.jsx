import { MdDeleteOutline } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';

function ProductItem({
  productId,
  productImg,
  productName,
  productPrice,
  productSalePercent,
  productDescription,
  productStatus,
}) {
  const handleUpdateProduct = () => {
    console.log('Sửa sản phẩm', productId);
  };
  const handleDeleteProduct = () => {
    console.log('Xóa sản phẩm', productId);
  };
  return (
    <div className="flex justify-between py-3">
      <div className="basis-[5%] text-center">
        <p>{productId}</p>
      </div>
      <div className="flex basis-[10%] items-center justify-center text-center">
        <div className="size-16">
          <img
            className="max-w-full"
            alt="product thumbnail"
            src={productImg}
          />
        </div>
      </div>
      <div className="basis-[20%]">
        <h3>{productName}</h3>
      </div>
      <div className="basis-[10%] text-center">
        <p>{productPrice}</p>
      </div>
      <div className="basis-[10%] text-center">
        <p>{productSalePercent}%</p>
      </div>
      <div className="basis-[25%]">
        <p className="line-clamp-3">{productDescription}</p>
      </div>
      <div className="basis-[10%] text-center">
        <p>{productStatus ? 'Còn hàng' : 'Hết hàng'}</p>
      </div>
      <div className="flex basis-[10%] flex-col items-center justify-center gap-4">
        <button
          onClick={handleUpdateProduct}
          className="flex w-3/5 items-center gap-2 rounded bg-green-600 px-3 py-2 text-[#fafafa] hover:bg-green-500"
        >
          Sửa
          <TiEdit />
        </button>
        <button
          onClick={handleDeleteProduct}
          className="flex w-3/5 items-center gap-2 rounded bg-red-600 px-3 py-2 text-[#fafafa] hover:bg-red-500"
        >
          Xóa
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
