import { Route, Routes } from 'react-router-dom';
import ProductsList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function ProductPage() {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default ProductPage;
