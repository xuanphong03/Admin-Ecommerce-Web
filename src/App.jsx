import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/Admin';
import AuthenticationPage from './pages/Auth';

function App() {
  const authenticated = true;
  return (
    <div className="font-roboto">
      {authenticated && <AdminPage />}
      {!authenticated && <AuthenticationPage />}
    </div>
  );
}

export default App;
