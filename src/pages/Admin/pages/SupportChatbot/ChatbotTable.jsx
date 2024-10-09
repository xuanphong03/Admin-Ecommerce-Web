import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

ChatbotTable.propTypes = {
  questions: PropTypes.array,
};

function ChatbotTable({ questions, onDelete, onEdit }) {
  const handleDelete = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa câu hỏi này chứ?')) {
      onDelete(id);
    }
  };

  const handleEdit = (questionId, question, answer) => {
    onEdit(questionId, question, answer);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Câu hỏi
            </th>
            <th scope="col" className="px-6 py-3">
              Câu trả lời
            </th>
            <th scope="col" className="px-6 py-3">
              Sửa
            </th>
            <th scope="col" className="px-6 py-3">
              Xóa
            </th>
          </tr>
        </thead>
        <tbody>
          {questions?.map(({ id, question, answer }, index) => {
            return (
              <tr
                key={uuidv4()}
                className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {question}
                </th>
                <td className="px-6 py-4">{answer}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(id, question, answer)}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sửa
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(id)}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ChatbotTable;
