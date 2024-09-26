import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import orderApi from '~/apis/orderApi';
import OrderItem from '../OrderItem';

function AllOrdersPage() {
  const [orderList, setOrderList] = useState([]);
  const [filterByStatus, setFilterByStatus] = useState('');

  const sortOrders = (orders) => {
    return orders.sort((orderA, orderB) => {
      if (orderA.id > orderB.id) {
        return -1;
      } else if (orderA.id < orderB.id) {
        return 1;
      }
      return 0;
    });
  };

  const getOrderList = async () => {
    try {
      const response = await orderApi.getAll();
      const reversedOrderList = sortOrders(response.reverse());

      if (!filterByStatus) {
        setOrderList(reversedOrderList);
      } else if (filterByStatus === 'Đang xử lý') {
        const orders = reversedOrderList?.filter(
          ({ orderStatus }) => !orderStatus,
        );
        setOrderList(orders);
      } else {
        const orders = reversedOrderList?.filter(
          ({ orderStatus }) => orderStatus === filterByStatus,
        );
        setOrderList(orders);
      }
    } catch (error) {
      throw new Error('Failed to get order list');
    }
  };

  const updateOrderStatus = async (id, data) => {
    try {
      await orderApi.update(id, data);
      toast.success('Thay đổi trạng thái đơn hàng thành công');
      getOrderList();
    } catch (error) {
      toast.error('Thay đổi trạng thái đơn hàng thất bại');
      throw new Error('Failed update order');
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilterByStatus(value);
  };

  useEffect(() => {
    getOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByStatus]);

  return (
    <div>
      <div className="text-sm">
        <label htmlFor="order-status" className="mr-2">
          Trạng thái
        </label>
        <select
          onChange={handleFilterChange}
          id="order-status"
          className="rounded-sm border border-solid border-gray-500 p-1 outline-none"
        >
          <option value="">Tất cả</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang Vận Chuyển">Đang vận chuyển</option>
          <option value="Đã Nhận Hàng">Đã nhận hàng</option>
        </select>
      </div>
      <hr className="my-5"></hr>
      <div className="relative overflow-x-auto border border-solid border-gray-300">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mã đơn
              </th>
              <th scope="col" className="px-6 py-3">
                Người mua
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày đặt
              </th>
              <th scope="col" className="px-6 py-3">
                Tổng giá
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3">
                Cập nhật trạng thái
              </th>
              <th scope="col" className="px-6 py-3">
                Chi tiết
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList.length > 0 &&
              orderList.map((orderItem) => {
                const uniqueKey = uuidv4();
                return (
                  <tr
                    key={uniqueKey}
                    className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                  >
                    <OrderItem
                      orderInfo={orderItem}
                      {...orderItem}
                      onUpdate={updateOrderStatus}
                    />
                  </tr>
                );
              })}
          </tbody>
        </table>
        {orderList.length === 0 && (
          <div className="w-full border-b bg-white px-5 py-10 text-center">
            <p>Không có đơn hàng nào</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllOrdersPage;
