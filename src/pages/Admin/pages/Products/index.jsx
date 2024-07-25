import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ProductsList from './ProductsList';
import AddNewProduct from './AddNewProduct';

Products.propTypes = {};

function Products(props) {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/create" element={<AddNewProduct />} />
    </Routes>
  );
}

export default Products;
