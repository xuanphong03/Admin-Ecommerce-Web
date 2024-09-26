import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { formatPrice } from '~/utils/formatCurrency';
import orderApi from '~/apis/orderApi';
OrderDetail.propTypes = {};

function OrderDetail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState({});
  const [invoiceDetail, setInvoiceDetail] = useState({
    orderProducts: [],
    totalPayment: 0,
    shippingFee: 0,
    percentDiscount: 0,
  });
  const getOrderDetail = async () => {
    try {
      const response = await orderApi.getDetail(id);
      setOrderDetail(response);
      console.log(response);

      setInvoiceDetail({
        orderProducts: response.orderDetails,
        totalPayment: response.totalAmountOrder,
        shippingFee: response.shippingFee,
        percentDiscount: response.percentDiscount,
      });
    } catch (error) {
      throw new Error('Failed to get order detail');
    }
  };
  useEffect(() => {
    getOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="pb-10 text-sm text-gray-950">
      <div className="flex items-center justify-between">
        <h1>Thông tin chi tiết về đơn hàng</h1>
        <button
          onClick={() => navigate(-1)}
          className="rounded bg-blue-500 px-5 py-2 text-white outline-none"
        >
          Quay lại
        </button>
      </div>
      <hr className="mb-5 mt-2"></hr>
      <div className="flex flex-col gap-10">
        <div className="rounded border border-solid border-gray-200 px-5 py-4">
          <h2 className="mb-4 font-medium uppercase">Thông tin người mua</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-5">
              <h3>Tên người nhận:</h3>
              <p>{orderDetail.buyer_name}</p>
            </div>
            <div className="flex items-start gap-5">
              <h3>Email:</h3>
              <p>{orderDetail.emailAddress}</p>
            </div>
            <div className="flex items-start gap-5">
              <h3>Số điện thoại:</h3>
              <p>{orderDetail.phoneNumber}</p>
            </div>
            <div className="flex items-start gap-5">
              <h3>Địa chỉ giao hàng:</h3>
              <p>{orderDetail.address}</p>
            </div>
          </div>
        </div>
        <div className="rounded border border-solid border-gray-200 px-5 py-4">
          <h2 className="mb-4 font-medium uppercase">Trạng thái đơn hàng</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-5">
              <h3>Tổng hóa đơn</h3>
              <p>{formatPrice(invoiceDetail.totalPayment, 'VNĐ')}</p>
            </div>
            <div className="flex items-start gap-5">
              <h3>Trạng thái giao hàng:</h3>
              <p>
                {orderDetail.orderStatus
                  ? orderDetail.orderStatus
                  : 'Đang xử lý'}
              </p>
            </div>
            <div className="flex items-start gap-5">
              <h3>Trạng thái thanh toán:</h3>
              <p>
                {orderDetail.paymentStatus
                  ? 'Đã thanh toán'
                  : 'Chưa thanh toán'}
              </p>
            </div>
            <div className="flex items-start gap-5">
              <h3>Phương thức thanh toán:</h3>
              <p>{orderDetail.paymentMethods}</p>
            </div>
          </div>
        </div>
        <div className="rounded border border-solid border-gray-200 px-5 py-4">
          <h2 className="mb-4 font-medium uppercase">
            Danh sách sản phẩm đặt hàng
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Ảnh</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phân loại
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Đơn giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceDetail.orderProducts.map((orderProduct) => {
                  return (
                    <tr
                      key={uuidv4()}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={orderProduct.image}
                          className="max-h-full w-16 max-w-full md:w-32"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        Apple Watch
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        Màu {orderProduct.color}, Size {orderProduct.size}
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        {formatPrice(orderProduct.unitPrice, 'VNĐ')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {orderProduct.quantity}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {formatPrice(orderProduct.totalPrice, 'VNĐ')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
