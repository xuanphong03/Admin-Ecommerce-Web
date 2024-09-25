import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserContext } from '.';
import { v4 as uuidv4 } from 'uuid';

UserList.propTypes = {};

function UserList(props) {
  const { users } = useContext(UserContext);
  return (
    <div className="relative overflow-x-auto rounded border border-solid border-gray-300">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Tài khoản
            </th>
            <th scope="col" className="px-6 py-3">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Địa chỉ
            </th>
            <th scope="col" className="px-6 py-3">
              Quyền hạn
            </th>
          </tr>
        </thead>

        <tbody>
          {[...Array(10)].map((_, index) => {
            const key = uuidv4();

            return (
              <tr
                key={key}
                className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
              >
                <td className="px-6 py-4">1</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <h4 className="w-60">ngxphong03@gmail.com</h4>
                </th>
                <td className="px-6 py-4">
                  <h5 className="w-40">Nguyễn Xuân Phong</h5>
                </td>
                <td className="px-6 py-4">ngxphong03@gmail.com</td>
                <td className="px-6 py-4">
                  <p className="w-60">
                    Cụm 8, Vĩnh Ninh, Vĩnh Quỳnh, Thanh Trì, Hà Nội
                  </p>
                </td>
                <td className="px-6 py-4">Người dùng</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
