import { Pagination } from '@mui/material';
import queryString from 'query-string';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import productApi from '~/apis/productApi';
import { formatPrice } from '~/utils/formatCurrency';
import DeleteForm from '../components/DeleteForm';

function ProductsList() {
  const navigate = useNavigate();

  const [productsList, setProductsList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
      _sort: params._sort || 'ASC',
    };
  }, [location.search]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchProducts = async () => {
    try {
      const { data, pagination } = await productApi.getAllProducts(queryParams);
      setProductsList(data);
      setPagination((prev) => ({
        ...prev,
        total: pagination._total,
        page: queryParams._page || 1,
      }));
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [queryParams]);

  const handleDeleteProduct = async (id) => {
    try {
      await productApi.deleteProduct(id);
      fetchProducts();
      toast.success('Xóa sản phẩm thành công', {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Xóa sản phẩm thất bại', {
        autoClose: 3000,
      });
    }
    setIsDeleting(false);
  };
  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  const handlePageChange = (event, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setPagination((prev) => ({ ...prev, page }));
    navigate(`/product?${queryString.stringify(filters)}`);
    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  return (
    <Fragment>
      <section className="relative px-5 py-2">
        <button className="mb-5">
          <Link
            to="/product/create_product"
            className="bg-green-600 px-5 py-2 text-sm text-white transition-colors hover:bg-green-500"
          >
            Thêm sản phẩm
          </Link>
        </button>
        <div className="relative overflow-x-auto border border-solid border-gray-300">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Ảnh
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Loại sản phẩm
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá
                </th>
                <th scope="col" className="px-6 py-3">
                  Mô tả
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3">
                  Chi tiết
                </th>
                <th scope="col" className="px-6 py-3">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {productsList.length > 0 &&
                productsList.map(
                  (
                    {
                      id,
                      imageMain,
                      name,
                      finalPrice,
                      category,
                      quantitySold,
                      totalQuantity,
                      description,
                    },
                    index,
                  ) => (
                    <tr
                      key={uuidv4()}
                      className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                    >
                      <td className="px-6 py-4">
                        {index + 1 + (pagination.page - 1) * 10}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          className="size-10"
                          alt="product image"
                          src={imageMain}
                        />
                      </td>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        <h4 className="w-60">{name}</h4>
                      </th>
                      <td className="px-6 py-4">{category}</td>

                      <td className="px-6 py-4">
                        {formatPrice(finalPrice, 'VNĐ')}
                      </td>
                      <td className="px-6 py-4">
                        <p className="w-60">{description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p
                          className={`${totalQuantity - quantitySold > 0 ? 'text-green-500' : 'text-red-500'} `}
                        >
                          {totalQuantity - quantitySold > 0
                            ? 'Còn hàng'
                            : 'Hết hàng'}
                        </p>
                        {totalQuantity - quantitySold > 0 && (
                          <span>({totalQuantity - quantitySold})</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/product/${id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Chi tiết
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setIsDeleting(true);
                            setDeletingProductId(id);
                          }}
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ),
                )}
            </tbody>
          </table>
        </div>

        {productsList.length <= 0 && (
          <p className="border border-solid border-gray-300 px-5 py-10 text-center">
            Không có bất kỳ sản phẩm nào
          </p>
        )}

        <div className="m-10 flex justify-center pb-10">
          <Pagination
            count={Math.ceil(pagination.total / pagination.limit)}
            page={pagination.page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
      </section>
      {isDeleting && (
        <>
          <div
            onClick={() => {
              setIsDeleting(false);
            }}
            className="fixed inset-0 z-[9999] bg-black opacity-40"
          ></div>
          <div className="absolute left-1/2 top-1/2 z-[99999] -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4">
            <DeleteForm
              onSubmit={handleDeleteProduct}
              onCancel={handleCancelDelete}
              productId={deletingProductId}
            />
          </div>
        </>
      )}
    </Fragment>
  );
}

export default ProductsList;
