import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '.';

UserList.propTypes = {};

function UserList() {
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
          {users.map(({ username, name, email, address, role }, index) => {
            const key = uuidv4();

            return (
              <tr
                key={key}
                className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <h4 className="w-60">{username}</h4>
                </th>
                <td className="px-6 py-4">
                  <h5 className="w-40">{name}</h5>
                </td>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">
                  <p className="w-60">{address}</p>
                </td>
                <td className="px-6 py-4">{role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
