import CreateProductForm from './CreateForm';
import { Route, Routes } from 'react-router-dom';
import ProductsList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';

function ProductPage() {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/:id" element={<ProductDetail />} />
      <Route path="/create" element={<CreateProduct />} />
    </Routes>
  );
}

export default ProductPage;
