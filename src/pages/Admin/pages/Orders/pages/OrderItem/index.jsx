import moment from 'moment';
import { Fragment, useState } from 'react';
import { formatPrice } from '~/utils/formatCurrency';

function OrderItem({
  id,
  skuOrder,
  buyer_name,
  phoneNumber,
  createdAt,
  totalAmountOrder,
  orderStatus,
  onUpdate,
}) {
  const [status, setStatus] = useState(orderStatus);
  const handleChangeStatus = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
  };

  const handleUpdateStatus = () => {
    const statusOrder = status === 'Đang xử lý' ? null : status;
    if (onUpdate) {
      onUpdate(id, statusOrder);
    }
  };

  return (
    <Fragment>
      <td className="px-6 py-4">{skuOrder}</td>
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
      >
        {buyer_name}
      </th>
      <td className="px-6 py-4">{phoneNumber}</td>
      <td className="px-6 py-4">{moment(createdAt).format('DD/MM/YYYY')}</td>
      <td className="px-6 py-4">{formatPrice(totalAmountOrder, 'VNĐ')}</td>
      <td className="px-6 py-4">{orderStatus ? orderStatus : 'Đang xử lý'}</td>
      <td className="flex items-center gap-2 px-6 py-4">
        <select
          value={status ?? 'Đang xử lý'}
          onChange={handleChangeStatus}
          className="rounded-sm border border-solid border-gray-500 p-1 outline-none"
        >
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang Vận Chuyển">Đang vận chuyển</option>
          <option value="Đã Nhận Hàng">Đã nhận hàng</option>
        </select>
        <button
          onClick={handleUpdateStatus}
          className="rounded-sm bg-green-500 px-2 py-1 text-white"
        >
          Cập nhật
        </button>
      </td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Chi tiết
        </a>
      </td>
    </Fragment>
  );
}

export default OrderItem;
