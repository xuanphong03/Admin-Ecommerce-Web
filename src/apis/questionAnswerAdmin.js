import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const questionAnswerAdmin = {
  getAll() {
    const url = 'rest/getAllQuestionsOfGuestInfor';
    return axiosClient.get(url);
  },
  answerQuestion(answer) {
    const url = '/rest/qa-answer-guest';
    return axiosClient.post(url, answer);
  },
};

export default questionAnswerAdmin;
