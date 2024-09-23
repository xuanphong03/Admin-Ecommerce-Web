import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import style from '~/apis/style';
import CreateStyleForm from './Forms/CreateStyleForm';
import DeleteForm from './Forms/DeleteForm';
import UpdateStyleForm from './Forms/UpdateStyleForm';

function StylePage() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatedStyle, setUpdatedStyle] = useState(null);
  const [deletedCategory, setDeletedCategory] = useState(null);

  const fetchAllStyle = async () => {
    try {
      const response = await style.getAll();
      setCategoriesList(response);
    } catch (error) {
      // Throw error
    }
  };

  useEffect(() => {
    fetchAllStyle();
  }, []);

  const handleCreateStyle = async (data) => {
    try {
      await style.create(data);
      setOpenForm(false);
      setIsCreating(false);
      fetchAllStyle();
      toast.success('Thêm mới Thông tin Phong cách thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Thương Hiệu đã tồn tại');
    }
  };

  const handleUpdateStyle = async (updatedStyle) => {
    try {
      await style.update(updatedStyle);
      fetchAllStyle();
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
    // Xóa category
    try {
      await style.delete(id);
      toast.success('Xóa Thông tin Phong cách thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.success('Xóa Thông tin Phong cách thất bại', {
        autoClose: 3000,
      });
    }
    setOpenForm(false);
    setIsDeleting(false);
    fetchAllStyle();
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
            Thêm mới phong cách
          </button>
        </div>
        <div className="relative overflow-x-auto border border-solid border-gray-300">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên phong cách
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
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
              {categoriesList.map((category, index) => (
                <tr
                  key={uuidv4()}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {category.name}
                  </th>
                  <td className="px-6 py-4">
                    {category.status === 1
                      ? 'Còn kinh doanh'
                      : 'Ngừng kinh doanh'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setOpenForm(true);
                        setIsUpdating(true);
                        setUpdatedStyle(category);
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
              ))}
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
              <UpdateStyleForm
                onSubmit={handleUpdateStyle}
                category={updatedStyle}
              />
            )}
            {isCreating && <CreateStyleForm onSubmit={handleCreateStyle} />}
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

export default StylePage;
