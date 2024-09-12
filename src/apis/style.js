import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const style = {
  getAll() {
    const path = '/admin/styles';
    return axiosClient.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  get(id) {},
  create(data) {
    const path = '/admin/styles';
    return axiosClient.post(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  delete(styleId) {
    const path = `/admin/styles/${styleId}`;
    return axiosClient.delete(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  update(data) {
    const path = '/admin/update-styles';
    return axiosClient.put(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
};

export default style;
