import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '~/utils/formatCurrency';
import productApi from '~/apis/productApi';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    (async () => {
      const response = await productApi.getProduct({ id });
      console.log('Product detail: ', response);
      setProduct(response);
    })();
  }, [id]);

  return (
    <div className="p-5">
      <div className="border-gray flex gap-5 border-b border-solid pb-5">
        <Link
          to="/product"
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white outline-none"
        >
          Quay lại
        </Link>
        <Link
          className="flex items-center justify-center rounded bg-green-600 px-4 py-1 text-sm text-white outline-none hover:bg-green-500"
          to={`/product/${id}/update`}
        >
          Cập nhật sản phẩm
        </Link>
      </div>
      <div className="mt-5 flex w-full flex-col gap-2 text-sm">
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Tên sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">{product.name}</p>
        </div>

        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Loại sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">{product.category}</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Hãng sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">{product.brand}</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Mô tả sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">{product.description}</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Giá gốc
          </h3>
          <p className="basis-4/5 px-4 py-2">
            {formatPrice(product.originalPrice, 'VNĐ')}
          </p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Giá hiện tại
          </h3>
          <p className="basis-4/5 px-4 py-2">
            {formatPrice(product.finalPrice, 'VNĐ')}
          </p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Khuyến mãi
          </h3>
          <div className="flex basis-4/5 px-4 py-2">
            <p>{product.saleDiscountPercent}%</p>
          </div>
        </div>

        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Lượt bán
          </h3>
          <p className="basis-4/5 px-4 py-2">0</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Lượt đánh giá
          </h3>
          <p className="basis-4/5 px-4 py-2">{product.nrating} lượt đánh giá</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Đánh giá
          </h3>
          <p className="basis-4/5 px-4 py-2">
            {Number(product.rating).toFixed(1)} sao
          </p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Số lượng sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">1000</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Ảnh sản phẩm
          </h3>
          <div className="flex basis-4/5 flex-wrap gap-5 px-4 py-2">
            {product.images?.map((image) => (
              <div
                className="flex size-32 items-center justify-center overflow-hidden rounded-lg border border-solid border-black"
                key={image.id}
              >
                <img
                  className="max-h-full"
                  src={image.img_url}
                  alt={image.identification}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
