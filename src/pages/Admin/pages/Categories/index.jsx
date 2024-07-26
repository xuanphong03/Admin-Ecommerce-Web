import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreateCategoryForm from './Forms/CreateCategoryForm';
import UpdateCategoryForm from './Forms/UpdateCategoryForm';

function CategoriesPage() {
  const [categoriesList, setCategoriesList] = useState([
    {
      categoryCode: '3MurDPuL',
      categoryName: 'Điện thoại',
      categoryStatus: 'Còn kinh doanh',
      brandsList: [
        {
          id: 1,
          name: 'Iphone',
        },
        {
          id: 2,
          name: 'Samsung',
        },
        {
          id: 3,
          name: 'Huawei',
        },
      ],
    },
    {
      categoryCode: 'ERrxfwgM',
      categoryName: 'Máy tính',
      categoryStatus: 'Còn kinh doanh',
      brandsList: [
        {
          id: 1,
          name: 'Dell',
        },
        {
          id: 2,
          name: 'Lenovo',
        },
        {
          id: 3,
          name: 'Macbook',
        },
        {
          id: 4,
          name: 'Asus',
        },
        {
          id: 5,
          name: 'Acer',
        },
      ],
    },
    {
      categoryCode: 'ddn0hFQR',
      categoryName: 'Đồng hồ',
      categoryStatus: 'Ngừng kinh doanh',
      brandsList: [
        {
          id: 1,
          name: 'Apple Watch',
        },
        {
          id: 1,
          name: 'Huawei',
        },
      ],
    },
    {
      categoryCode: 'mgTAa3JQ',
      categoryName: 'Máy ảnh',
      categoryStatus: 'Còn kinh doanh',
      brandsList: [
        {
          id: 1,
          name: 'Fujifilm ',
        },
        {
          id: 2,
          name: 'Kodak',
        },
        {
          id: 3,
          name: 'Canon',
        },
        {
          id: 4,
          name: 'Panasonic',
        },
        {
          id: 5,
          name: 'Samsung',
        },
      ],
    },
    {
      categoryCode: 'nLdSxgUE',
      categoryName: 'Máy điện tử',
      categoryStatus: 'Còn kinh doanh',
      brandsList: [
        {
          id: 1,
          name: 'Sony',
        },
        {
          id: 2,
          name: 'Xiaomi',
        },
      ],
    },
    {
      categoryCode: 'ChWgfdpd',
      categoryName: 'Tai nghe',
      categoryStatus: 'Còn kinh doanh',
      brandsList: [
        {
          id: 1,
          name: 'Sony',
        },
        {
          id: 2,
          name: 'Marshall',
        },
        {
          id: 3,
          name: 'Yamaha',
        },
      ],
    },
  ]);
  const [openForm, setOpenForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);

  const handleCreateNewCategory = (data) => {
    setOpenForm(false);
    setIsCreating(false);
    toast.success('Add product to cart successfully 🥳🤩🤩🤩', {
      autoClose: 3000,
    });
  };

  const handleUpdateCategory = (data) => {
    setOpenForm(false);
    setIsUpdating(false);
    toast.success('Add product to cart successfully 🥳🤩🤩🤩', {
      autoClose: 3000,
    });
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
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  Mã loại sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên loại sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Các hãng sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Tình trạng
                </th>
                <th scope="col" className="px-6 py-3">
                  Chỉnh sửa
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category, index) => {
                return (
                  <tr
                    key={category.categoryCode}
                    className="border-b bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{category.categoryCode}</td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 dark:text-white"
                    >
                      {category.categoryName}
                    </td>
                    <td className={`px-6 py-4`}>
                      <ul>
                        {category.brandsList?.map((brand) => (
                          <li
                            key={`${brand.name}-${brand.key}`}
                            className="mb-1"
                          >
                            - {brand.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className={`px-6 py-4`}>
                      <p
                        className={`${category.categoryStatus === 'Còn kinh doanh' ? 'bg-blue-500' : 'bg-red-500'} w-fit rounded px-3 py-1 text-white`}
                      >
                        {category.categoryStatus}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setOpenForm(true);
                          setIsUpdating(true);
                          setUpdatedCategory(category);
                        }}
                        className="flex items-center gap-2 rounded bg-green-600 px-4 py-1 text-white hover:bg-green-500"
                      >
                        Sửa <FaRegEdit />
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
            }}
            className="fixed inset-0 z-[9999] bg-black opacity-40"
          ></div>
          <div className="absolute left-1/2 top-1/2 z-[99999] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded bg-white px-5 pb-8 pt-5">
            <span
              onClick={() => {
                setOpenForm(false);
                setIsCreating(false);
                setIsUpdating(false);
              }}
              className="absolute right-0 top-0 flex size-10 cursor-pointer items-center justify-center text-3xl"
            >
              &times;
            </span>
            {isUpdating && (
              <UpdateCategoryForm
                onSubmit={handleUpdateCategory}
                category={updatedCategory}
              />
            )}
            {isCreating && (
              <CreateCategoryForm onSubmit={handleCreateNewCategory} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default CategoriesPage;
