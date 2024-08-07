import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const tradeMask = {
  getAll() {
    const path = '/admin/tradeMask';
    return axiosClient.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  get(id) {},
  create(data) {
    const path = '/admin/tradeMask';
    return axiosClient.post(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  delete(tradeMaskId) {
    const path = `/admin/tradeMask/${tradeMaskId}`;
    return axiosClient.delete(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
  update(data) {
    const path = '/admin/update-tradeMask';
    return axiosClient.put(path, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
      },
    });
  },
};

export default tradeMask;
