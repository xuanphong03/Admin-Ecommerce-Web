import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

ProductDetail.propTypes = {};

function ProductDetail(props) {
  const { id } = useParams();

  return (
    <div className="px-10 py-5">
      <div className="border-gray border-b border-solid pb-5">
        <Link
          to="/product"
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white"
        >
          Quay lại
        </Link>
      </div>
      <div className="mt-5 flex w-full flex-col gap-2 text-sm">
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Tên sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">
            Áo Polo Ralph Lauren Thêu Ngựa Basic - Áo thun cổ bẻ Ralph Nam
            Cotton Cá Sấu cao cấp
          </p>
        </div>

        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Loại sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">Áo Polo</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Hãng sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">Gucci</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Mô tả sản phẩm
          </h3>
          <p className="basis-4/5 px-4 py-2">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here, content
            here, making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for will uncover many web sites still in
            their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose (injected humour and the
            like).
          </p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Giá gốc
          </h3>
          <p className="basis-4/5 px-4 py-2">5.000.000 VNĐ</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Khuyến mãi
          </h3>
          <p className="basis-4/5 px-4 py-2">20%</p>
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
          <p className="basis-4/5 px-4 py-2">0</p>
        </div>
        <div className="flex w-full border border-dotted border-black">
          <h3 className="flex basis-1/5 border-r border-dotted border-black p-2 font-medium uppercase">
            Đánh giá
          </h3>
          <p className="basis-4/5 px-4 py-2">0</p>
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
            <div className="size-32">
              <img
                className="max-h-full"
                src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxglxm3w7hsr29"
                alt="product image"
              />
            </div>
            <div className="size-32">
              <img
                className="max-h-full"
                src="https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lx0y1rw71mtr31"
                alt="product image"
              />
            </div>
            <div className="size-32">
              <img
                className="max-h-full"
                src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxglvfib9nmh7d"
                alt="product image"
              />
            </div>
            <div className="size-32">
              <img
                className="max-h-full"
                src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxglvfib892179"
                alt="product image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
