import { useState } from 'react';
import ChatbotTable from './ChatbotTable';
import ChatbotForm from './ChatbotForm';

function SupportChatbot() {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmitForm = async (data) => {
    console.log(data);
  };

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
      <ChatbotTable />
    </div>
  );
}

export default SupportChatbot;
