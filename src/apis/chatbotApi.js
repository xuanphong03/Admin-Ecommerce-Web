import axiosClient from './axiosClient';

const chatbotApi = {
  getAllQuestions() {
    const url = '/rest/getAllQuestions';
    return axiosClient.get(url);
  },
  create(payload) {
    const url = '/rest/qa';
    return axiosClient.post(url, payload);
  },
};

export default chatbotApi;
