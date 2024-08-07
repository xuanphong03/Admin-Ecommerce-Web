import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../Auth/userSlice';
import Navbar from './components/Navbar';
import CategoriesPage from './pages/Categories';
import TradeMaskPage from './pages/TradeMask';
import DashboardPage from './pages/Dashboard';
import ProductsList from './pages/Products';
import ProductPage from './pages/Products';
import Chatroom from './pages/Chat/Chatroom';
import QuestionAndAnswer from './pages/QA';

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
        <h1 className="text-center text-3xl font-semibold uppercase tracking-widest">
          Admin Page
        </h1>
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
          <Route path="/support/message" element={<Chatroom />} />
          <Route path="/support/qa" element={<QuestionAndAnswer />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPage;
