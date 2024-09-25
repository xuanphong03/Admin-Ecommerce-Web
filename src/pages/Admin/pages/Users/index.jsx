import { createContext, useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import { register } from '~/pages/Auth/userSlice';
import userApi from '~/apis/userApi';

export const UserContext = createContext();

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCreateAccountRoleAdmin = async (data) => {
    try {
      const { retypePassword, ...registerData } = data;
      const response = await userApi.registerAccountRoleAdmin(registerData);
      console.log(response);
    } catch (error) {
      throw new Error('Failed to create account role admin');
    }
  };

  return (
    <div>
      <UserContext.Provider
        value={{
          users,
          toggleForm,
          onCreateAccount: handleCreateAccountRoleAdmin,
        }}
      >
        <div className="mb-5">
          <button
            onClick={toggleForm}
            className="rounded bg-green-500 px-4 py-2 text-sm text-white"
          >
            Tạo tài khoản quản trị
          </button>
        </div>
        {<UserList />}
        {showForm && <UserForm />}
      </UserContext.Provider>
    </div>
  );
}

export default UsersPage;
