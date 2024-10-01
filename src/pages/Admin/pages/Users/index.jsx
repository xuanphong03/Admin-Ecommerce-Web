import { createContext, useEffect, useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import userApi from '~/apis/userApi';
import { toast } from 'react-toastify';

export const UserContext = createContext();

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCreateAccountRoleAdmin = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { retypePassword, ...registerData } = data;
      const response = await userApi.registerAccountRoleAdmin(registerData);
      if (response.status === 400) {
        throw new Error('Tài khoản đã tồn tại');
      }
      toast.success('Tạo tài khoản quản trị thành công');
      getAllUsers();
    } catch (error) {
      toast.error(error.message);
      throw new Error('Failed to create account role admin');
    } finally {
      setShowForm(false);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await userApi.getAllUsers();
      setUsers(response.reverse());
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
