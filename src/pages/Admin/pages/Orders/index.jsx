import { Route, Routes } from 'react-router-dom';
import AllOrdersPage from './pages/AllOrders';
import OrderDetail from './pages/OrderDetail';

function OrdersPage() {
  return (
    <Routes>
      <Route path="/" element={<AllOrdersPage />} />
      <Route path="/:id" element={<OrderDetail />} />
    </Routes>
  );
}

export default OrdersPage;
