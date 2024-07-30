import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const productApi = {
  addNewProduct(data) {
    const url = '/admin/add-product';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        // Authorization:
        //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTcyMjEyNTMxOSwiZXhwIjoxNzIyMjExNzE5fQ.ib2HJqHulvlJSVRQ21z0rgOpurJNsY2IBjDGmh4XM_k',
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getAllProducts(params) {
    const url = 'global/list-ob';
    return axiosClient.get(url, {
      params,
    });
  },
  getProduct(params) {
    const url = `global/detail-ob`;
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
