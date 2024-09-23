import { useEffect, useState } from 'react';
import orderApi from '~/apis/orderApi';
import { formatPrice } from '~/utils/formatCurrency';

function CancelledOrders() {
  const [orderList, setOrderList] = useState([]);

  const getOrderList = async () => {
    try {
      const response = await orderApi.getAll();
      console.log(response);
    } catch (error) {
      throw new Error('Failed to get order list');
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
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
              Chi tiết
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
            <td className="px-6 py-4">1</td>
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Nguyễn Xuân Phong
            </th>
            <td className="px-6 py-4">0865783359</td>
            <td className="px-6 py-4">10/06/2003</td>
            <td className="px-6 py-4">{formatPrice(100000000, 'VNĐ')}</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Chi tiết
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CancelledOrders;
