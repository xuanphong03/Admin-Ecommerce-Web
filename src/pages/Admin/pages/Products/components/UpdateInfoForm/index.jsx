// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useForm } from 'react-hook-form';
// import InputField from '~/components/form-controls/InputField';
// import TextAreaField from '~/components/form-controls/TextAreaField';
// import { useEffect, useState } from 'react';
// import { FaSpinner } from 'react-icons/fa6';
// import { toast } from 'react-toastify';
// import categoryApi from '~/apis/categoryApi';
// import CheckboxField from '~/components/form-controls/CheckboxField';

// const SIZES = [
//   { value: 'XS', name: 'XS' },
//   { value: 'S', name: 'S' },
//   { value: 'M', name: 'M' },
//   { value: 'L', name: 'L' },
//   { value: 'XL', name: 'XL' },
// ];
// const COLORS = [
//   { value: 'red', name: 'Đỏ' },
//   { value: 'blue', name: 'Xanh' },
//   { value: 'gray', name: 'Xám' },
//   { value: 'white', name: 'Trắng' },
//   { value: 'black', name: 'Đen' },
// ];

// const schema = yup.object().shape({
//   name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
//   brand: yup.string().required('Vui lòng nhập tên thương hiệu.'),
//   description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
//   category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
//   size: yup.array(),
//   colour: yup.array(),
//   originalPrice: yup
//     .number()
//     .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
//     .required('Vui lòng nhập giá sản phẩm')
//     .min(1, 'Giá sản phẩm phải lớn hơn 0')
//     .max(1000000000, 'Giá sản phẩm không được quá 1000000000')
//     .integer('Giá sản phẩm phải là số nguyên'),
//   images: yup
//     .mixed()
//     .required('Vui lòng upload ít nhất một ảnh sản phẩm')
//     .test('fileType', ' Chỉ chấp nhận file ảnh', (value) => {
//       if (!value.length) return false; // Không có file nào
//       return Array.from(value).every((file) =>
//         ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
//       ); // Kiểm tra từng file
//     })
//     .test('minFiles', 'Vui lòng tải lên 5 ảnh', (value) => {
//       return value && value.length === 5; // Kiểm tra số lượng file
//     }),
// });

// function UpdateInfoProductForm({ product, onSubmit }) {
//   const [categoriesList, setCategoriesList] = useState([]);
//   const [brandsList, setBrandsList] = useState([]);
//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await categoryApi.getAll();
//         const _categoryList = response.filter(
//           (_category) => _category.status !== 0,
//         );
//         setCategoriesList(_categoryList);
//       } catch (error) {
//         toast.error('API Category bị lỗi');
//       }
//     })();
//   }, []);

//   const {
//     handleSubmit,
//     register,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       size: [],
//       brand: [],
//     },
//   });

//   const formSubmit = async (data) => {
//     // if (onSubmit) {
//     //   await onSubmit(data);
//     // }
//     console.log('Thông tin cập nhật:', data);
//   };

//   const handleGetBrandsList = (category) => {
//     const position = categoriesList.findIndex(
//       (_category) => _category.name === category,
//     );
//     if (position !== -1) {
//       return categoriesList[position].brands;
//     }
//     return [];
//   };

//   return (
//     <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-5">
//       <div className="flex gap-5 text-sm">
//         <div className="flex basis-1/2 flex-col gap-1">
//           <InputField
//             id="name"
//             label="Tên sản phẩm"
//             errorMessage={errors.name?.message}
//             register={{ ...register('name') }}
//             autofocus={true}
//             required={true}
//             placeholder="Nhập tên sản phẩm"
//           />
//         </div>
//         <div className="flex basis-1/2 flex-col gap-1">
//           <div className="flex flex-col gap-1 text-sm">
//             <label className="w-fit" htmlFor="category">
//               Loại sản phẩm
//             </label>
//             <select
//               {...register('category', {
//                 onChange: (e) => {
//                   const newCategory = e.target.value;
//                   const newBrandList = handleGetBrandsList(newCategory);
//                   setBrandsList(newBrandList);
//                 },
//               })}
//               id="category"
//               className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
//             >
//               <option value="">---Chọn loại sản phẩm---</option>
//               {categoriesList.map((category) => (
//                 <option value={category.name} key={category.sku}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//             {errors.category?.message && (
//               <p className="px-1 text-sm text-red-500">
//                 {errors.category?.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex gap-5 text-sm">
//         <div className="flex basis-1/2 flex-col gap-1">
//           <div className="flex flex-col gap-1 text-sm">
//             <label className="w-fit" htmlFor="brand">
//               Thương hiệu sản phẩm
//             </label>
//             <select
//               {...register('brand')}
//               className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
//             >
//               <option value="">---Chọn thương hiệu sản phẩm---</option>
//               {brandsList.map((brand) => (
//                 <option value={brand} key={brand}>
//                   {brand}
//                 </option>
//               ))}
//             </select>
//             {errors.brand?.message && (
//               <p className="px-1 text-sm text-red-500">
//                 {errors.brand?.message}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="flex basis-1/2 flex-col gap-1">
//           <InputField
//             id="originalPrice"
//             label="Giá sản phẩm"
//             errorMessage={errors.originalPrice?.message}
//             register={{
//               ...register('originalPrice'),
//             }}
//             required={true}
//             type="number"
//             step={100000}
//             placeholder="Nhập giá sản phẩm"
//           />
//         </div>
//       </div>

//       <div className="flex gap-5 text-sm">
//         <div className="flex basis-1/2 flex-col gap-1">
//           <CheckboxField
//             label="Kích thước"
//             register={{ ...register('size') }}
//             checkboxList={SIZES}
//           />
//         </div>
//         <div className="flex basis-1/2 flex-col gap-1">
//           <CheckboxField
//             label="Màu sắc"
//             register={{ ...register('colour') }}
//             checkboxList={COLORS}
//           />
//         </div>
//       </div>

//       <div className="flex flex-col gap-1 text-sm">
//         <label htmlFor="images">Ảnh minh họa sản phẩm</label>
//         <input type="file" {...register('images')} multiple />
//         {errors.images && (
//           <p className="px-1 text-sm text-red-500">{errors.images.message}</p>
//         )}
//       </div>
//       <TextAreaField
//         id="description"
//         label="Mô tả sản phẩm"
//         errorMessage={errors.description?.message}
//         register={{ ...register('description') }}
//         required={true}
//         placeholder="Nhập mô tả sản phẩm"
//       />
//       <button
//         className={`${isSubmitting ? 'cursor-not-allowed bg-green-500' : 'cursor-pointer bg-green-600 hover:bg-green-500'} rounded px-5 py-2 text-sm uppercase tracking-widest text-white`}
//       >
//         {isSubmitting ? (
//           <p className="flex items-center justify-center gap-4">
//             <FaSpinner className="animate-spin" />
//             Loading...
//           </p>
//         ) : (
//           'Thêm mới sản phẩm'
//         )}
//       </button>
//     </form>
//   );
// }

// export default UpdateInfoProductForm;
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '~/components/form-controls/InputField';
import TextAreaField from '~/components/form-controls/TextAreaField';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import categoryApi from '~/apis/categoryApi';
import CheckboxField from '~/components/form-controls/CheckboxField';

const SIZES = [
  { value: 'XS', name: 'XS' },
  { value: 'S', name: 'S' },
  { value: 'M', name: 'M' },
  { value: 'L', name: 'L' },
  { value: 'XL', name: 'XL' },
];
const COLORS = [
  { value: 'red', name: 'Đỏ' },
  { value: 'blue', name: 'Xanh' },
  { value: 'gray', name: 'Xám' },
  { value: 'white', name: 'Trắng' },
  { value: 'black', name: 'Đen' },
];

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  saleDiscountPercent: yup
    .number()
    .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
    .required('Vui lòng nhập phần trăm khuyến mãi')
    .min(0, 'Phần trăm khuyến mãi phải lớn hơn hoặc bằng 0')
    .max(100, 'Phần trăm khuyến mãi không được vượt quá 100'),
  originalPrice: yup
    .number()
    .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
    .required('Vui lòng nhập giá sản phẩm')
    .min(1, 'Giá sản phẩm phải lớn hơn 0')
    .max(1000000000, 'Giá sản phẩm không được quá 1000000000')
    .integer('Giá sản phẩm phải là số nguyên'),
});

function UpdateInfoProductForm({ product, onSubmit }) {
  console.log(product);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: product.name || '',
      description: product.description || '',
      originalPrice: product.originalPrice || 0,
      saleDiscountPercent: product.saleDiscountPercent || 0,
      category: product.category || '',
      brand: product.brand || '',
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        description: product.description || '',
        originalPrice: product.originalPrice || 0,
        saleDiscountPercent: product.saleDiscountPercent || 0,
        category: product.category || '',
        brand: product.brand || '',
      });
    }
  }, [product, reset]);

  const formSubmit = async (data) => {
    // if (onSubmit) {
    //   await onSubmit(data);
    // }
    console.log('Thông tin cập nhật:', data);
  };

  return (
    <div className="">
      <h2 className="mb-10 text-center text-xl font-medium uppercase">
        Cập nhật thông tin sản phẩm
      </h2>
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-5">
        <div className="flex gap-5 text-sm">
          <div className="flex basis-1/2 flex-col gap-1">
            <InputField
              id="name"
              label="Tên sản phẩm"
              errorMessage={errors.name?.message}
              register={{ ...register('name') }}
              autofocus={true}
              required={true}
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div className="flex basis-1/2 flex-col gap-1">
            <InputField
              id="category"
              label="Hãng sản phẩm"
              errorMessage={errors.category?.message}
              register={{ ...register('category') }}
              required={true}
              readOnly
              placeholder="Nhập hãng sản phẩm"
            />
          </div>
        </div>
        <div className="flex gap-5 text-sm">
          <div className="flex basis-1/2 flex-col gap-1">
            <InputField
              id="brand"
              label="Thương hiệu sản phẩm"
              errorMessage={errors.brand?.message}
              register={{ ...register('brand') }}
              required={true}
              readOnly
              placeholder="Nhập thương hiệu sản phẩm"
            />
          </div>
          <div className="flex basis-1/2 flex-col gap-1">
            <InputField
              id="originalPrice"
              label="Giá sản phẩm"
              errorMessage={errors.originalPrice?.message}
              register={{
                ...register('originalPrice'),
              }}
              required={true}
              type="number"
              step={100000}
              placeholder="Nhập giá sản phẩm"
            />
          </div>
        </div>
        <div className="flex gap-5 text-sm">
          <div className="flex basis-1/2 flex-col gap-1">
            <InputField
              id="saleDiscountPercent"
              label="Khuyến mãi (đơn vị: %)"
              errorMessage={errors.saleDiscountPercent?.message}
              register={{
                ...register('saleDiscountPercent'),
              }}
              required={true}
              type="number"
              step={1}
              placeholder="Nhập phần trăm khuyến mãi"
            />
          </div>
        </div>

        <TextAreaField
          id="description"
          label="Mô tả sản phẩm"
          errorMessage={errors.description?.message}
          register={{ ...register('description') }}
          required={true}
          placeholder="Nhập mô tả sản phẩm"
        />
        <button
          className={`${isSubmitting ? 'cursor-not-allowed bg-green-500' : 'cursor-pointer bg-green-600 hover:bg-green-500'} rounded px-5 py-2 text-sm uppercase tracking-widest text-white`}
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin text-xl" />
          ) : (
            'Cập nhật sản phẩm'
          )}
        </button>
      </form>
    </div>
  );
}

export default UpdateInfoProductForm;
