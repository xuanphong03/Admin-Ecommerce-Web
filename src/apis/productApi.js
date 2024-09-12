import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const productApi = {
  addNewProduct(data) {
    const url = '/admin/add-product';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getAllProducts(params) {
    const url = 'global/products';
    return axiosClient.get(url, {
      params,
    });
  },
  updateProduct(data) {
    const url = '/admin/update-product';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getProduct(params) {
    const url = `global/detail-product`;
    return axiosClient.get(url, { params });
  },
  deleteProduct(id) {
    const url = `http://localhost:8080/api/v1/admin/remove-product/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
};

export default productApi;
