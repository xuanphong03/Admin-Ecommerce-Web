import StorageKeys from '~/constants/storage-key';
import axiosClient from './axiosClient';

const questionAnswerAdmin = {
  postQuestionGuest(data) {
    const url = 'rest/getAllQuestionsOfGuestInfor';
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default questionAnswerAdmin;
