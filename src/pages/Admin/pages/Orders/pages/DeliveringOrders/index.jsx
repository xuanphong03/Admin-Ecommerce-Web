import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatPrice } from '~/utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid';
import { useDebounce } from '~/hooks/useDebounce';
import { IoIosSearch } from 'react-icons/io';

DeliveringOrders.propTypes = {};

function DeliveringOrders(props) {
  const FAKE_ORDERS = [
    {
      orderCode: uuidv4(),
      customerName: 'Nguyễn Xuân Phong',
      customerTel: '0865783359',
      customerAddress: 'Vĩnh Ninh, Vĩnh Quỳnh, Thành Trì, Hà Nội',
      orderDate: '02/09/2024',
      orderStatus: 1,
    },
  ];
  const [ordersList, setOrdersList] = useState(FAKE_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounce(searchTerm, 1000);
  useEffect(() => {
    (async () => {
      if (!searchTerm.trim()) return;
      try {
        //Call api
        console.log('Call api');
      } catch (error) {
        // Throw error
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    try {
      //Call api
      console.log('Call api');
    } catch (error) {
      // Throw error
    }
  }, []);

  const handleChangeSearchTerm = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (!searchTerm.trim()) {
      return;
    }
  };

  const handleStatusChange = (e, orderCode) => {
    const { value } = e.target;
    setOrdersList((prevOrders) =>
      prevOrders.map((order) =>
        order.orderCode === orderCode
          ? { ...order, orderStatus: value }
          : order,
      ),
    );
  };

  return (
    <div className="px-5 py-6">
      <div className="mb-5 flex items-center gap-2">
        <label htmlFor="orders-search" className="font-medium">
          Tìm kiếm đơn hàng
        </label>
        <div className="relative w-80">
          <input
            id="orders-search"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            className="w-full rounded border border-solid border-black py-2 pl-4 pr-8 text-sm leading-none outline-none"
            placeholder="Nhập kiếm theo tên khách hàng..."
          />
          <label
            htmlFor="orders-search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xl"
          >
            <IoIosSearch />
          </label>
        </div>
      </div>
      <div className="mb-5 flex justify-between py-2 text-sm font-medium shadow-table">
        <div className="basis-[5%] text-center">
          <h3>STT</h3>
        </div>
        <div className="basis-[15%] text-center">
          <h3>Mã đơn hàng</h3>
        </div>
        <div className="basis-[15%] text-center">
          <h3>Tên khách hàng</h3>
        </div>
        <div className="basis-[10%] text-center">
          <h3>Số điện thoại</h3>
        </div>
        <div className="basis-[20%] text-center">
          <h3>Địa chỉ</h3>
        </div>
        <div className="basis-[10%] text-center">
          <h3>Ngày đặt hàng</h3>
        </div>

        <div className="basis-[10%] text-center">
          <h3>Tổng tiền</h3>
        </div>
        <div className="basis-[15%] text-center"></div>
      </div>
      <div className="w-full shadow-table">
        {ordersList.map(
          (
            {
              orderCode,
              customerName,
              customerTel,
              customerAddress,
              orderDate,
              orderStatus,
            },
            index,
          ) => (
            <div
              key={uuidv4()}
              className={`${index < ordersList.length - 1 ? 'border-gray border-b border-solid' : ''}`}
            >
              <div className="flex justify-between py-3 text-sm">
                <div className="flex basis-[5%] items-center justify-center text-center">
                  {index + 1}
                </div>
                <div className="flex basis-[15%] items-center justify-center">
                  {orderCode}
                </div>
                <div className="flex basis-[15%] items-center justify-center">
                  {customerName}
                </div>
                <div className="flex basis-[10%] items-center justify-center break-words text-center">
                  {customerTel}
                </div>
                <div className="flex basis-[20%] items-center justify-center break-words">
                  {customerAddress}
                </div>
                <div className="flex basis-[10%] items-center justify-center">
                  {orderDate}
                </div>
                <div className="flex basis-[10%] items-center justify-center">
                  {formatPrice(10000000, 'VNĐ')}
                </div>
                <div className="flex basis-[15%] flex-col items-center justify-center gap-2 text-xs">
                  <Link
                    to={`/orders/${orderCode}`}
                    className="flex w-1/2 items-center justify-center gap-2 rounded bg-blue-600 px-3 py-2 text-[#fafafa] hover:bg-blue-500"
                  >
                    Chi tiết
                    <FaEye />
                  </Link>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default DeliveringOrders;
