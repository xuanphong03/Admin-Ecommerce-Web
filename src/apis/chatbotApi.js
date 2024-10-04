import axiosClient from './axiosClient';

const chatbotApi = {
  getAll() {
    const url = '/rest/all';
    return axiosClient.get(url);
  },
  create(payload) {
    const url = '/rest/qa';
    return axiosClient.post(url, payload);
  },
  update(id, payload) {
    const url = `/rest/qa/${id}`;
    return axiosClient.put(url, payload);
  },
  delete(id) {
    const url = `/rest/qa/${id}`;
    return axiosClient.delete(url);
  },
};

export default chatbotApi;
