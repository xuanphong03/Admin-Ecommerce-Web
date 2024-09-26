import axiosClient from './axiosClient';

const style = {
  getAll() {
    const path = '/global/styles';
    return axiosClient.get(path);
  },
  create(data) {
    const path = '/admin/styles';
    return axiosClient.post(path, data);
  },
  delete(styleId) {
    const path = `/admin/styles/${styleId}`;
    return axiosClient.delete(path);
  },
  update(data) {
    const path = '/admin/update-styles';
    return axiosClient.put(path, data);
  },
};

export default style;
