import axiosClient from './axiosClient';

const orderApi = {
  getAll() {
    const url = `/orders`;
    return axiosClient.get(url);
  },
};

export default orderApi;
