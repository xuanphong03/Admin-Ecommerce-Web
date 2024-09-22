import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes() {
  const user = useSelector((state) => state.user.current);
  const isAuthenticated = !!user.id;

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoutes;
