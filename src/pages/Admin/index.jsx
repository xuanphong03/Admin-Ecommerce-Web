import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../Auth/userSlice';
import Navbar from './components/Navbar';
import CategoriesPage from './pages/Categories';
import TradeMaskPage from './pages/TradeMask';
import DashboardPage from './pages/Dashboard';
import ProductPage from './pages/Products';
import Chatroom from './pages/Chat/Chatroom';
import QuestionAndAnswer from './pages/QA';
import StylePage from './pages/Style';
import MaterialPage from './pages/Material';
import OrdersPage from './pages/Orders';
import Sidebar from './components/Sidebar';
AdminPage.propTypes = {};

function AdminPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutAccount = () => {
    const action = logout();
    dispatch(action);
    navigate('/');
  };
  return (
    <div className="">
      <Sidebar onLogout={handleLogoutAccount} />
      <main className="ml-auto h-screen w-[calc(100%-250px)] bg-white py-5 pl-10 pr-5">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products/*" element={<ProductPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          {/* <Route path="/tradeMask" element={<TradeMaskPage />} />
          <Route path="/style" element={<StylePage />} /> */}
          <Route path="/orders/*" element={<OrdersPage />} />
          {/* <Route path="/material" element={<MaterialPage />} /> */}
          <Route path="/support" element={<QuestionAndAnswer />} />
        </Routes>
      </main>
      <Chatroom />
    </div>
  );
}

export default AdminPage;
