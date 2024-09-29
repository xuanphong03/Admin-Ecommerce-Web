import axiosClient from './axiosClient';

const chatApi = {
  getAllQuestions() {
    const url = '/rest/getAllQuestions';
    return axiosClient.get(url);
  },
  getAllProducts() {
    const url = '/global/products-chat-bot';
    return axiosClient.get(url);
  },
};

export default chatApi;
