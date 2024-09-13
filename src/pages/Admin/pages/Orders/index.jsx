import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import AllOrdersPage from './pages/AllOrders';
import ReceivedOrders from './pages/ReceivedOrders';
import DeliveringOrders from './pages/DeliveringOrders';
import CanceledOrders from './pages/CanceledOrders';
import OrderDetail from './pages/OrderDetail';

OrdersPage.propTypes = {};

function OrdersPage(props) {
  return (
    <Routes>
      <Route path="/" element={<AllOrdersPage />} />
      <Route path="/received" element={<ReceivedOrders />} />
      <Route path="/delivering" element={<DeliveringOrders />} />
      <Route path="/cancelled" element={<CanceledOrders />} />
      <Route path="/:id" element={<OrderDetail />} />
    </Routes>
  );
}

export default OrdersPage;
