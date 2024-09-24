import AdminPage from './pages/Admin';
import AuthenticationPage from './pages/Auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
function App() {
  const infoUser = useSelector((state) => state.user.current);
  const authenticated = !!infoUser.id;

  return (
    <div className="font-roboto">
      {authenticated && <AdminPage />}
      {!authenticated && <AuthenticationPage />}
      <ToastContainer autoClose={2000} closeOnClick={true} />
    </div>
  );
}

export default App;
