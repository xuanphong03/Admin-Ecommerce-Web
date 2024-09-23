import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import tradeMask from '~/apis/tradeMask';
import CreateTradeMaskForm from './Forms/CreateTradeMaskForm';
import UpdateTradeMaskForm from './Forms/UpdateTradeMaskForm';

import DeleteForm from './Forms/DeleteForm';

function TradeMaskPage() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const [deletedCategory, setDeletedCategory] = useState(null);

  const fetchAllCategory = async () => {
    try {
      const response = await tradeMask.getAll();
      setCategoriesList(response);
    } catch (error) {
      // Throw error
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const handleCreateTradeMask = async (data) => {
    try {
      await tradeMask.create(data);
      // Đóng form và fetch lại dữ liệu
      setOpenForm(false);
      setIsCreating(false);
      fetchAllCategory();
      toast.success('Thêm mới thương hiệu thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Thương hiệu đã tồn tại');
    }
  };

  const handleUpdateUpdateTradeMask = async (updatedCategory) => {
    try {
      await tradeMask.update(updatedCategory);
      fetchAllCategory();
      setOpenForm(false);
      setIsUpdating(false);
      toast.success('Cập nhật thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Cập nhật thất bại');
    }
  };

  const handleCancelDeleteCategory = () => {
    setOpenForm(false);
    setIsDeleting(false);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await tradeMask.delete(id);
      toast.success('Xóa Thương Hiệu thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.success('Xóa Thương Hiệu thất bại', {
        autoClose: 3000,
      });
    }
    setOpenForm(false);
    setIsDeleting(false);
    fetchAllCategory();
  };

  return (
    <>
      <section className="relative px-5 py-2">
        <div className="mb-5">
          <button
            onClick={() => {
              setOpenForm(true);
              setIsCreating(true);
            }}
            className="bg-green-600 px-5 py-2 text-sm text-white transition-colors hover:bg-green-500"
          >
            Thêm mới thương hiệu
          </button>
        </div>
        <div className="relative overflow-x-auto border border-solid border-gray-200">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên thương hiệu
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã thương hiệu
                </th>
                <th scope="col" className="px-6 py-3">
                  Tình trạng
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
              {categoriesList.map((category, index) => {
                const uniqueKey = uuidv4();
                return (
                  <tr
                    key={uniqueKey}
                    className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {category.name}
                    </th>
                    <td className="px-6 py-4">{category.sku}</td>
                    <td className="px-6 py-4">
                      {category.status === 1 ? 'Đang hợp tác' : 'Ngừng hợp tác'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setOpenForm(true);
                          setIsUpdating(true);
                          setUpdatedCategory(category);
                        }}
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Sửa
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setOpenForm(true);
                          setIsDeleting(true);
                          setDeletedCategory(category);
                        }}
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
      </section>
      {openForm && (
        <>
          <div
            onClick={() => {
              setOpenForm(false);
              setIsCreating(false);
              setIsUpdating(false);
              setIsDeleting(false);
            }}
            className="fixed inset-0 z-[9999] bg-black opacity-40"
          ></div>
          <div className="absolute left-1/2 top-1/2 z-[99999] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded bg-white px-5 pb-8 pt-5">
            <span
              onClick={() => {
                setOpenForm(false);
                setIsCreating(false);
                setIsUpdating(false);
                setIsDeleting(false);
              }}
              className="absolute right-0 top-0 flex size-10 cursor-pointer items-center justify-center text-3xl"
            >
              &times;
            </span>
            {isUpdating && (
              <UpdateTradeMaskForm
                onSubmit={handleUpdateUpdateTradeMask}
                category={updatedCategory}
              />
            )}
            {isCreating && (
              <CreateTradeMaskForm onSubmit={handleCreateTradeMask} />
            )}
            {isDeleting && (
              <DeleteForm
                category={deletedCategory}
                onDelete={handleDeleteCategory}
                onCancel={handleCancelDeleteCategory}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default TradeMaskPage;
