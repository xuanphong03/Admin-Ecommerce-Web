import React from 'react';
import PropTypes from 'prop-types';

ChatbotTable.propTypes = {};

function ChatbotTable(props) {
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
          <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
            <td className="px-6 py-4">Silver</td>
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Câu hỏi 1
            </th>
            <td className="px-6 py-4">Câu trả lời 1</td>
            <td className="px-6 py-4">
              <button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                Sửa
              </button>
            </td>
            <td className="px-6 py-4">
              <button className="font-medium text-red-600 hover:underline dark:text-red-500">
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChatbotTable;
