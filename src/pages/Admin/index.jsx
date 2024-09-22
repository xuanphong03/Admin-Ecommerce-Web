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
      <aside className="fixed bottom-0 left-0 top-0 w-[250px] bg-neutral-800 px-2 py-4 text-white">
        <Navbar />
        <button
          onClick={handleLogoutAccount}
          className="absolute bottom-0 left-0 right-0 h-10 bg-blue-600 hover:bg-blue-500"
        >
          Đăng xuất
        </button>
      </aside>
      <main className="ml-auto h-screen w-[calc(100%-250px)]">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/product/*" element={<ProductPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/tradeMask" element={<TradeMaskPage />} />
          <Route path="/style" element={<StylePage />} />
          <Route path="/orders/*" element={<OrdersPage />} />
          <Route path="/material" element={<MaterialPage />} />
          <Route path="/support/qa" element={<QuestionAndAnswer />} />
        </Routes>
      </main>
      <Chatroom />
    </div>
  );
}

export default AdminPage;
