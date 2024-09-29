import axiosClient from './axiosClient';

const categoryApi = {
  getAll() {
    const path = '/global/categories';
    return axiosClient.get(path);
  },
  create(data) {
    const path = '/admin/add-category';
    return axiosClient.post(path, data);
  },
  deleteSubCategory(categoryId, subCategory) {
    // truyền thêm params subCategory
    const path = `/admin/delete-category/${categoryId}/subCategory=${subCategory}`;
    return axiosClient.delete(path);
  },
  delete(categoryId) {
    const path = `/admin/delete-category/${categoryId}`;
    return axiosClient.delete(path);
  },
  update(data) {
    const path = '/admin/update-category';
    return axiosClient.put(path, data);
  },
};

export default categoryApi;
