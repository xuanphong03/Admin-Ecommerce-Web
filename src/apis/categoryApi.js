import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const categoryApi = {
  getAll() {
    const path = '/admin/categorys';
    return axiosClient.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  get(id) {},
  create(data) {
    const path = '/admin/add-category';
    return axiosClient.post(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  delete(categoryId) {
    const path = `/admin/delete-category/${categoryId}`;
    return axiosClient.delete(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  update(data) {
    const path = '/admin/update-category';
    return axiosClient.put(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
};

export default categoryApi;
