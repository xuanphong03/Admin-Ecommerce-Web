import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const material = {
  getAll() {
    const path = '/admin/material';
    return axiosClient.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  get(id) {},
  create(data) {
    const path = '/admin/material';
    return axiosClient.post(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  delete(styleId) {
    const path = `/admin/material/${styleId}`;
    return axiosClient.delete(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  update(data) {
    const path = '/admin/update-material';
    return axiosClient.put(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
};

export default material;
