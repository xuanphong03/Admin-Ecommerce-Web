import axiosClient from './axiosClient';

const tradeMask = {
  getAll() {
    const path = '/admin/tradeMask';
    return axiosClient.get(path);
  },
  create(data) {
    const path = '/admin/tradeMask';
    return axiosClient.post(path, data);
  },
  delete(tradeMaskId) {
    const path = `/admin/tradeMask/${tradeMaskId}`;
    return axiosClient.delete(path);
  },
  update(data) {
    const path = '/admin/update-tradeMask';
    return axiosClient.put(path, data);
  },
};

export default tradeMask;
