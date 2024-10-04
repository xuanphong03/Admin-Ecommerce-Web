import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import chatbotApi from '~/apis/chatbotApi';
import ChatbotForm from './ChatbotForm';
import ChatbotTable from './ChatbotTable';

function SupportChatbot() {
  const [showForm, setShowForm] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmitForm = async (payload) => {
    try {
      await chatbotApi.create(payload);
      toast.success('Thêm dữ liệu thành công');

      getAllQuestions();
    } catch (error) {
      throw new Error('Failed to create new question');
    }
  };

  const getAllQuestions = async () => {
    try {
      const response = await chatbotApi.getAll();
      setQuestions(response.reverse());
    } catch (error) {
      throw new Error('Failed get all question chatbot');
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const response = await chatbotApi.delete(id);
      if (response.status === 200) {
        toast.success('Xóa câu hỏi thành công');
        getAllQuestions();
      }
    } catch (error) {
      throw new Error('Failed to delete question');
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <div>
      {showForm && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute">
            <ChatbotForm
              onToggle={handleToggleForm}
              onSubmit={handleSubmitForm}
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h1>Danh sách các câu hỏi hỗ trợ Chatbot</h1>
        <button
          onClick={handleToggleForm}
          className="rounded bg-green-500 px-5 py-2 text-sm text-white hover:opacity-80"
        >
          Thêm dữ liệu cho Chatbot
        </button>
      </div>
      <hr className="my-2"></hr>
      <ChatbotTable questions={questions} onDelete={deleteQuestion} />
    </div>
  );
}

export default SupportChatbot;
