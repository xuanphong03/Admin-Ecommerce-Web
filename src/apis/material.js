import axiosClient from './axiosClient';

const material = {
  getAll() {
    const path = '/global/material';
    return axiosClient.get(path);
  },
  create(data) {
    const path = '/admin/material';
    return axiosClient.post(path, data);
  },
  delete(styleId) {
    const path = `/admin/material/${styleId}`;
    return axiosClient.delete(path);
  },
  update(data) {
    const path = '/admin/update-material';
    return axiosClient.put(path, data);
  },
};

export default material;
