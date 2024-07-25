import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import LineGraph from '~/components/Charts/Line';
import DashboardPage from './pages/Dashboard';
import Navbar from './components/Navbar';
import Products from './pages/Products';

AdminPage.propTypes = {};

function AdminPage(props) {
  return (
    <div className="">
      <aside className="fixed bottom-0 left-0 top-0 w-[300px] bg-neutral-800 px-2 py-4 text-white">
        <h1 className="text-center text-3xl font-semibold uppercase tracking-widest">
          Admin Page
        </h1>
        <Navbar />
        <button className="absolute bottom-0 left-0 right-0 h-10 bg-blue-600 hover:bg-blue-500">
          Đăng xuất
        </button>
      </aside>
      <main className="ml-auto h-screen w-[calc(100%-300px)]">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products/*" element={<Products />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPage;
