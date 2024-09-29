import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <h1 className="text-8xl font-bold uppercase">404 ERROR PAGE</h1>
      <button
        onClick={handleBackToHome}
        className="rounded bg-red-500 px-5 py-2 text-white transition-colors hover:opacity-80"
      >
        Quay trở lại trang chủ
      </button>
    </div>
  );
}

export default ErrorPage;
