import moment from 'moment';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  paymentStatus,
}) {
  const [status, setStatus] = useState(orderStatus);
  const handleChangeStatus = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
  };

  const handleUpdateStatus = () => {
    const newStatusOrder = status === 'Đang xử lý' ? null : status;
    if (newStatusOrder === orderStatus)
      return toast.warning('Vui lòng thay đổi trạng thái đơn hàng để cập nhật');
    if (onUpdate) {
      const data = { orderStatus: newStatusOrder, paymentStatus };
      if (newStatusOrder === 'Đã Nhận Hàng') {
        data.paymentStatus = 1;
      }
      onUpdate(id, data);
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
        <Link
          to={`/orders/${id}`}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Chi tiết
        </Link>
      </td>
    </Fragment>
  );
}

export default OrderItem;
