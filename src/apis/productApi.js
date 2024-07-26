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
};

export default productApi;
