import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import chatbotApi from '~/apis/chatbotApi';
import ChatbotForm from './ChatbotForm';
import ChatbotTable from './ChatbotTable';
import UpdateForm from './UpdateForm';

function SupportChatbot() {
  const [showForm, setShowForm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

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

  const handleEditQuestion = (id, question, answer) => {
    setEditing(true);
    setEditingQuestion({ question, answer });
    setEditingQuestionId(id);
  };

  const handleUpdateQuestion = async (payload) => {
    try {
      await chatbotApi.update(editingQuestionId, payload);
      setEditingQuestion(null);
      setEditingQuestionId(null);
      toast.success('Cập nhật thành công');
      getAllQuestions();
    } catch (error) {
      toast.error('Cập nhật thất bại');
      throw new Error('Error');
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
      {editing && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute">
            <UpdateForm
              onToggle={() => setEditing(false)}
              onUpdate={handleUpdateQuestion}
              question={editingQuestion}
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
      <ChatbotTable
        onEdit={handleEditQuestion}
        questions={questions}
        onDelete={deleteQuestion}
      />
    </div>
  );
}

export default SupportChatbot;
