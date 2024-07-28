import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const productApi = {
  addNewProduct(data) {
    const url = '/admin/add-product';
    console.log('data trong api:', data);
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
};

export default productApi;
