import axiosClient from './axiosClient';

const orderApi = {
  getAll() {
    const url = `/orders`;
    return axiosClient.get(url);
  },
  getDetail(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  update(id, data) {
    const url = `/orders/admin/${id}`;
    return axiosClient.put(url, data);
  },
};

export default orderApi;
