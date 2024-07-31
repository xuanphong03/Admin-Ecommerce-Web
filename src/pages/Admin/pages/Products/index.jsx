import { Route, Routes } from 'react-router-dom';
import ProductsList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CreateProductPage from './pages/CreateProduct';
import UpdateProduct from './pages/UpdateProduct';

function ProductPage() {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/:id" element={<ProductDetail />} />
      <Route path="/create_product" element={<CreateProductPage />} />
      <Route path="/:id/update" element={<UpdateProduct />} />
    </Routes>
  );
}

export default ProductPage;
