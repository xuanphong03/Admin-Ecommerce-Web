import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../Auth/userSlice';
import Sidebar from './components/Sidebar';
import CategoriesPage from './pages/Categories';
import Chatroom from './pages/Chat/Chatroom';
import DashboardPage from './pages/Dashboard';
import OrdersPage from './pages/Orders';
import ProductPage from './pages/Products';
import QuestionAndAnswer from './pages/QA';
import UsersPage from './pages/Users';
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
          <Route path="/orders/*" element={<OrdersPage />} />
          <Route path="/support" element={<QuestionAndAnswer />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
      <Chatroom />
    </div>
  );
}

export default AdminPage;
