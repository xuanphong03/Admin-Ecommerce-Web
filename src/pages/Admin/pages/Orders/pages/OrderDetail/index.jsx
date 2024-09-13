import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { formatPrice } from '~/utils/formatCurrency';
OrderDetail.propTypes = {};

function OrderDetail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    try {
      // Call api order detailt
    } catch (error) {
      // Throw error
    }
  }, [id]);

  return (
    <div className="px-5 py-6">
      <button
        onClick={() => navigate(-1)}
        className="rounded bg-blue-500 px-5 py-2 text-sm text-white"
      >
        Quay lại
      </button>
      <h1 className="my-5 text-2xl font-medium uppercase">
        Thông tin chi tiết về đơn hàng
      </h1>
      <table className="w-1/2">
        <tbody className="w-full">
          <tr className="w-full">
            <th className="py-1 pr-5 text-start align-top">Mã đơn hàng</th>
            <td>{uuidv4()}</td>
          </tr>
          <tr className="w-full">
            <th className="py-1 pr-5 text-start align-top">Tên khách hàng</th>
            <td>Nguyễn Xuân Phong</td>
          </tr>
          <tr className="w-full">
            <th className="py-1 pr-5 text-start align-top">Số điện thoại</th>
            <td>0865783359</td>
          </tr>
          <tr className="w-full">
            <th className="py-1 pr-5 text-start align-top">Địa chỉ</th>
            <td>Cụm 8, Vĩnh Ninh, Vĩnh Quỳnh, Thanh Trì, Hà Nội</td>
          </tr>
          <tr className="w-full">
            <th className="py-1 pr-5 text-start align-top">Ngày đặt hàng</th>
            <td>02/09/2024</td>
          </tr>
          <tr className="w-full">
            <th className="py-1 pr-5 text-start align-top">Tình trạng</th>
            <td>Đang xử lý</td>
          </tr>
          <tr className="w-full">
            <th className="py-1 pr-5 text-start align-top">
              Danh sách sản phẩm
            </th>
            <td className="flex flex-col gap-2">
              {[...Array(5)].map((_, index) => {
                const id = uuidv4();
                return (
                  <div key={id} className="flex gap-5 bg-gray-100 px-2 py-1">
                    <div className="size-14">
                      <img
                        className="max-w-full object-cover"
                        alt="product"
                        src="https://pos.nvncdn.com/4260cc-24295/ps/20230729_r9mvJ1o6SE.jpeg"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <h3 className="font-medium">Áo hoodie</h3>
                      <p className="text-sm">
                        Màu xanh, size XL, số lượng: x10
                      </p>
                    </div>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr className="w-full">
            <th className="py-1 pr-5 text-start align-top">Tổng hóa đơn</th>
            <td>{formatPrice(10000000, 'VNĐ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetail;
