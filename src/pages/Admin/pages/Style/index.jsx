import { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreateStyleForm from './Forms/CreateStyleForm';
import UpdateStyleForm from './Forms/UpdateStyleForm';
import style from '~/apis/style';
import { MdDeleteOutline } from 'react-icons/md';
import DeleteForm from './Forms/DeleteForm';

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
      // Đóng form và fetch lại dữ liệu
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
      <section className="relative px-10 py-5">
        <div className="border-gray border-b border-solid pb-5">
          <button
            onClick={() => {
              setOpenForm(true);
              setIsCreating(true);
            }}
            className="rounded bg-green-600 px-5 py-2 text-white transition-colors hover:bg-green-500"
          >
            Tạo mới loại sản phẩm
          </button>
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <table className="w-full text-center text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3 text-center">STT</th>
                <th className="w-1/6 px-6 py-3">Ảnh minh họa Phong cách</th>
                {/* <th className="w-1/6 px-6 py-3">Mã Thương Hiệu</th> */}
                <th className="w-1/6 px-6 py-3 text-center">Tên Phong cách</th>
                <th className="w-1/3 px-6 py-3 text-center">Mô tả</th>
                <th className="w-1/6 px-6 py-3 text-center">Tình trạng</th>
                <th className="w-1/6 px-6 py-3 text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category, index) => {
                return (
                  <tr
                    key={category.name}
                    className="border-b bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="w-1/6 px-6 py-4">
                      {category.image_url && (
                        <img
                          src={category.image_url}
                          alt="Ảnh minh họa"
                          className="mx-auto h-32 w-full object-contain"
                        />
                      )}
                    </td>
                    {/* <td className="w-1/9 px-6 py-4">{category.sku}</td> */}
                    <td className="w-1/9 whitespace-nowrap px-6 py-4 dark:text-white">
                      {category.name}
                    </td>
                    <td className="w-1/3 px-6 py-4">{category.description}</td>{' '}
                    {/* Hiển thị mô tả */}
                    <td className={`w-1/6 px-6 py-4`}>
                      <p
                        className={`${category.status === 1 ? 'bg-blue-500' : 'bg-red-500'} mx-auto w-fit rounded px-3 py-1 text-white`}
                      >
                        {category.status === 1
                          ? 'Còn kinh doanh'
                          : 'Ngừng kinh doanh'}
                      </p>
                    </td>
                    <td className="flex flex-col items-center gap-1 px-6 py-4 pt-12">
                      <button
                        onClick={() => {
                          setOpenForm(true);
                          setIsUpdating(true);
                          setUpdatedStyle(category);
                        }}
                        className="flex w-fit items-center justify-center gap-2 rounded bg-green-600 px-4 py-1 text-white hover:bg-green-500"
                      >
                        Sửa <FaRegEdit />
                      </button>
                      <button
                        onClick={() => {
                          setOpenForm(true);
                          setIsDeleting(true);
                          setDeletedCategory(category);
                        }}
                        className="flex w-fit items-center justify-center gap-2 rounded bg-red-600 px-4 py-1 text-white hover:bg-red-500"
                      >
                        Xóa <MdDeleteOutline />
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
