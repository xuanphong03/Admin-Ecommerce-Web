// // import * as yup from 'yup';
// // import { useForm } from 'react-hook-form';
// // import { yupResolver } from '@hookform/resolvers/yup';
// // import PropTypes from 'prop-types';
// // import InputField from '~/components/form-controls/InputField';
// // import SelectField from '~/components/form-controls/SelectField';
// // import { useEffect, useState } from 'react';
// // import categoryApi from '~/apis/categoryApi';
// // import tradeMaskApi from '~/apis/tradeMask';
// // import materialApi from '~/apis/material';
// // import styleApi from '~/apis/style';
// // import CheckboxField from '~/components/form-controls/CheckboxField';
// // import { COLORS, SIZES } from '~/constants/variants';
// // import tradeMask from '~/apis/tradeMask';
// // import material from '~/apis/material';
// // import TextAreaField from '~/components/form-controls/TextAreaField';
// // import productApi from '~/apis/productApi';
// // import { useParams } from 'react-router-dom';
// // const schema = yup.object().shape({
// //   name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
// //   brand: yup.string().required('Vui lòng nhập Chi tiết loại sản phẩm.'),
// //   description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
// //   category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
// //   tradeMask: yup.string().required('Vui lòng chọn tên thương hiệu.'),
// //   style: yup.string().required('Vui lòng chọn loại Phong cách.'),
// //   material: yup.string().required('Vui lòng chọn loại Chất liệu.'),
// //   saleDiscountPercent: yup
// //     .number()
// //     .integer('Phần trăm khuyến mãi phải là số nguyên')
// //     .min(0, 'Phần trăm khuyến mãi không được bé hơn 0')
// //     .max(100, 'Phần trăm khuyến mãi không được lớn hơn 100')
// //     .required('Vui lòng nhập phần trăm khuyến mãi'),
// //   sizes: yup
// //     .array()
// //     .min(1, 'Vui lòng chọn ít nhất một kích cỡ')
// //     .required('Vui lòng chọn kích cỡ'),
// //   colours: yup
// //     .array()
// //     .min(1, 'Vui lòng chọn ít nhất một màu sắc')
// //     .required('Vui lòng chọn màu sắc'),
// //   originalPrice: yup
// //     .number()
// //     .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
// //     .required('Vui lòng nhập giá sản phẩm')
// //     .min(1, 'Giá sản phẩm phải lớn hơn 0')
// //     .max(1000000000, 'Giá sản phẩm không được quá 1000000000')
// //     .integer('Giá sản phẩm phải là số nguyên'),
// //   images: yup
// //     .mixed()
// //     .required('Vui lòng upload ít nhất một ảnh sản phẩm')
// //     .test('fileType', 'Chỉ chấp nhận file ảnh', (value) => {
// //       if (!value.length) return false; // Không có file nào
// //       return Array.from(value).every((file) =>
// //         ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
// //       ); // Kiểm tra từng file
// //     })
// //     .test('minFiles', 'Vui lòng tải lên 5 ảnh', (value) => {
// //       return value && value.length === 5; // Kiểm tra số lượng file
// //     }),
// // });
// // UpdateProductForm.propTypes = {
// //   productDetail: PropTypes.object.isRequired,
// // };

// // function UpdateProductForm({ productDetail }) {
// //   // Fake dữ liệu Product Detail
// //   const fakeProductDetail = {
// //     id: 16,
// //     imageMain:
// //       'https://product.hstatic.net/1000026602/product/img_6137_559a685d9a884fc2b92d212b72e711be_master.jpg',
// //     skuQa: '8A91035CC5',
// //     colours: ['Đỏ', 'Xanh Dương'],
// //     sizes: ['S', 'M', 'XXL', 'XS'],
// //     name: 'Product 01',
// //     category: 'Quần',
// //     subCategory: 'Quần short_3',
// //     tradeMask: 'Devipock',
// //     style: 'Sport Wear',
// //     material: 'Cotton',
// //     images: [
// //       {
// //         id: 1,
// //         identification: 'sdaf',
// //         imageName: 'img_4248_763647bf331b43eaac93234d8794ca15_master.jpeg',
// //         img_url:
// //           'https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg',
// //       },
// //       {
// //         id: 2,
// //         identification: 'sdaf',
// //         imageName: 'img_4250_46364d8ebd99438182eeb4e1deff5f4b_master.jpeg',
// //         img_url:
// //           'https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg',
// //       },
// //       {
// //         id: 3,
// //         identification: 'sdaf',
// //         imageName: 'img_6846_025ee261a4ae446a905ee6b2b459e829_master.jpeg',
// //         img_url:
// //           'https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg',
// //       },
// //       {
// //         id: 4,
// //         identification: 'sdaf',
// //         imageName: 'img_6852_f2f9e6cbe79b42c79c9373c7a348646a_master.jpeg',
// //         img_url:
// //           'https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg',
// //       },
// //       {
// //         id: 5,
// //         identification: 'sdaf',
// //         imageName: 'img_6860_1344f046b30c4eb7946ba236413e42f3_master.jpeg',
// //         img_url:
// //           'https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg',
// //       },
// //     ],
// //     quantityDetails: [
// //       {
// //         color: 'Đen',
// //         sizes: [
// //           { size: 'S', stock: 5 },
// //           { size: 'M', stock: 10 },
// //           { size: 'XL', stock: 0 },
// //         ],
// //       },
// //       {
// //         color: 'Trắng',
// //         sizes: [
// //           { size: 'S', stock: 5 },
// //           { size: 'M', stock: 15 },
// //           { size: 'XL', stock: 20 },
// //         ],
// //       },
// //     ],
// //     totalQuantity: 55,
// //     originalPrice: 100,
// //     quantitySold: 11,
// //     rating: 0,
// //     nrating: 0,
// //     comments: [{}],
// //     description: 'description demo',
// //     saleDiscountPercent: 10,
// //     finalPrice: 90,
// //     //.....
// //   };

// //   const colours = fakeProductDetail.quantityDetails.map((item) => item.color);
// //   const sizes = [
// //     ...new Set(
// //       fakeProductDetail.quantityDetails.reduce((acc, detail) => {
// //         return acc.concat(detail.sizes.map((sizeDetail) => sizeDetail.size));
// //       }, []),
// //     ),
// //   ];

// //   const initialQuantities = fakeProductDetail.quantityDetails.flatMap(
// //     (detail) =>
// //       detail.sizes.map((sizeDetail) => ({
// //         color: detail.color,
// //         size: sizeDetail.size,
// //         quantity: sizeDetail.stock,
// //       })),
// //   );
// //   // ---------------------------

// //   // const schema = yup.object().shape({});
// //   const {
// //     handleSubmit,
// //     register,
// //     watch,
// //     setValue,
// //     formState: { errors, isSubmitting },
// //   } = useForm({
// //     resolver: yupResolver(schema),
// //     defaultValues: {
// //       name: fakeProductDetail.name,
// //       originalPrice: fakeProductDetail.originalPrice,
// //       saleDiscountPercent: fakeProductDetail.saleDiscountPercent,
// //       category: fakeProductDetail.category,
// //       tradeMask: fakeProductDetail.tradeMask,
// //       style: fakeProductDetail.style,
// //       material: fakeProductDetail.material,
// //       colours,
// //       sizes,
// //       description: fakeProductDetail.description,
// //     },
// //   });
// //   const { id } = useParams();

// //   const [images, setImages] = useState([]);
// //   const [brandsList, setBrandsList] = useState([]);
// //   const [categoriesList, setCategoriesList] = useState([]);
// //   const [tradeMaskList, setTradeMaskList] = useState([]);
// //   const [styleList, setStyleList] = useState([]);
// //   const [materialList, setMaterialList] = useState([]);
// //   const [productQuantities, setProductQuantities] = useState(initialQuantities);
// //   const [selectedTradeMark, setSelectedTradeMark] = useState(null);
// //   const [selectedStyle, setSelectedStyle] = useState(null);
// //   const [selectedMaterial, setSelectedMaterial] = useState(null);
// //   const [product, setProduct] = useState({});
// //   // const productDetailResponse = productApi.getProduct({ id });
// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         //
// //         // const productDetailResponse = await productApi.getProduct({ id });

// //         // setProduct(productDetailResponse);
// //         // console.log(productDetailResponse);

// //         //
// //         const categoryApiResponse = await categoryApi.getAll();
// //         const _categoryList = categoryApiResponse.filter(
// //           (_category) => _category.status !== 0,
// //         );
// //         setCategoriesList(_categoryList);

// //         // Cập nhật danh sách brand
// //         const position = _categoryList.findIndex(
// //           (_category) => _category.name === fakeProductDetail.category,
// //         );
// //         if (position !== -1) {
// //           setBrandsList(_categoryList[position].brands);
// //         }

// //         //--------------tradeMask------------------------
// //         const tradeMaskResponse = await tradeMaskApi.getAll();
// //         const _tradeMaskList = tradeMaskResponse.filter(
// //           (_category) => _category.status !== 0,
// //         );
// //         setTradeMaskList(_tradeMaskList);

// //         const styleResponse = await styleApi.getAll();
// //         const _styleList = styleResponse.filter(
// //           (_category) => _category.status !== 0,
// //         );
// //         setStyleList(_styleList);

// //         const materiaResponse = await materialApi.getAll();
// //         const _materiaList = materiaResponse.filter(
// //           (_category) => _category.status !== 0,
// //         );
// //         setMaterialList(_materiaList);

// //         // Set initial values for trade mark, style, and material
// //         const selectedTradeMark = _tradeMaskList.find(
// //           (tm) => tm.name === fakeProductDetail.tradeMask,
// //         );
// //         setSelectedTradeMark(selectedTradeMark || null);

// //         const selectedStyle = _styleList.find(
// //           (st) => st.name === fakeProductDetail.style,
// //         );
// //         setSelectedStyle(selectedStyle || null);

// //         const selectedMaterial = _materiaList.find(
// //           (mat) => mat.name === fakeProductDetail.material,
// //         );
// //         setSelectedMaterial(selectedMaterial || null);
// //         //ảnh
// //         setImages(fakeProductDetail.images);
// //       } catch (error) {
// //         // log error message
// //       }
// //     })();
// //   }, []);

// //   // Đặt giá trị mặc định cho category sau khi Categorieslist được tải xong
// //   useEffect(() => {
// //     if (categoriesList.length > 0) {
// //       setValue('category', fakeProductDetail.category);
// //       setValue('brand', fakeProductDetail.subCategory);
// //     }
// //   }, [categoriesList, setValue, fakeProductDetail.category]);

// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   const productColors = watch('colours') || [];
// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   const productSizes = watch('sizes') || [];

// //   const handleFormSubmit = async (data) => {
// //     const { colours, sizes, ...productInfo } = data;

// //     const quantityDetails = colours.map((color) => ({
// //       color,
// //       sizes: sizes.map((size) => ({
// //         size,
// //         quantity:
// //           productQuantities.find((q) => q.color === color && q.size === size)
// //             ?.quantity || 0,
// //       })),
// //     }));

// //     const formData = new FormData();
// //     // for (let i = 0; i < productInfo.images.length; i++) {
// //     //   formData.append('images', productInfo.images[i]);
// //     // }
// //     formData.append(
// //       'productDtos',
// //       JSON.stringify({
// //         originalPrice: productInfo.originalPrice,
// //         saleDiscountPercent: productInfo.saleDiscountPercent,
// //         category: productInfo.category,
// //         description: productInfo.description,
// //         subCategory: productInfo.brand,
// //         name: productInfo.name,
// //         style: productInfo.style,
// //         tradeMask: productInfo.tradeMask,
// //         material: productInfo.material,
// //         quantityDetails: quantityDetails,
// //       }),
// //     );

// //     console.log({
// //       originalPrice: productInfo.originalPrice,
// //       saleDiscountPercent: productInfo.saleDiscountPercent,
// //       category: productInfo.category,
// //       description: productInfo.description,
// //       subCategory: productInfo.brand,
// //       name: productInfo.name,
// //       quantityDetails: quantityDetails,
// //       style: productInfo.style,
// //       tradeMask: productInfo.tradeMask,
// //       material: productInfo.material,
// //     });
// //     // if (onSubmit) {
// //     //   await onSubmit(formData);
// //     // }
// //   };

// //   const updateQuantity = (e, color, size) => {
// //     const newQuantity = e.target.value;
// //     setProductQuantities((prev) => {
// //       const existingIndex = prev.findIndex(
// //         (item) => item.color === color && item.size === size,
// //       );
// //       if (existingIndex !== -1) {
// //         const updated = [...prev];
// //         updated[existingIndex] = { color, size, quantity: +newQuantity };
// //         return updated;
// //       } else {
// //         return [...prev, { color, size, quantity: +newQuantity }];
// //       }
// //     });
// //   };

// //   const handleGetBrandsList = (category) => {
// //     const position = categoriesList.findIndex(
// //       (_category) => _category.name === category,
// //     );
// //     if (position !== -1) {
// //       return categoriesList[position].brands;
// //     }
// //     return [];
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit(handleFormSubmit)}>
// //         <div className="mb-5 flex gap-5 text-sm">
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <InputField
// //               id="productName"
// //               label="Tên sản phẩm"
// //               placeholder="Nhập tên sản phẩm..."
// //               autofocus={true}
// //               register={{ ...register('name') }}
// //               errorMessage={errors.name?.errorMessage}
// //             />
// //           </div>
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <div className="flex flex-col gap-1 text-sm">
// //               <label className="w-fit" htmlFor="category">
// //                 Loại sản phẩm
// //               </label>
// //               <select
// //                 {...register('category', {
// //                   onChange: (e) => {
// //                     const newCategory = e.target.value;
// //                     const newBrandList = handleGetBrandsList(newCategory);
// //                     setBrandsList(newBrandList);
// //                   },
// //                 })}
// //                 id="category"
// //                 className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
// //               >
// //                 <option value="" disabled selected>
// //                   ---Chọn loại sản phẩm---
// //                 </option>
// //                 {categoriesList.map((category) => (
// //                   <option value={category.name} key={category.sku}>
// //                     {category.name}
// //                   </option>
// //                 ))}
// //               </select>
// //               {errors.category?.message && (
// //                 <p className="px-1 text-sm text-red-500">
// //                   {errors.category?.message}
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <div className="flex flex-col gap-1 text-sm">
// //               <label className="w-fit" htmlFor="brand">
// //                 Chi tiết loại sản phẩm
// //               </label>
// //               <select
// //                 {...register('brand')}
// //                 className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
// //                 value={fakeProductDetail.subCategory}
// //               >
// //                 <option value="" disabled selected>
// //                   ---Chọn Chi tiết loại sản phẩm---
// //                 </option>
// //                 {brandsList.map((brand) => (
// //                   <option value={brand} key={brand}>
// //                     {brand}
// //                   </option>
// //                 ))}
// //               </select>
// //               {errors.brand?.message && (
// //                 <p className="px-1 text-sm text-red-500">
// //                   {errors.brand?.message}
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //         <div className="mb-5 flex gap-5 text-sm">
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <label htmlFor="tradeMask" className="mb-1 font-bold">
// //               Chọn TradeMark
// //             </label>
// //             <select
// //               {...register('tradeMask')}
// //               className="block w-full rounded border border-gray-300 p-2"
// //               onChange={(e) => {
// //                 const selectedId = e.target.value;
// //                 const selectedTradeMark = tradeMaskList.find(
// //                   (tm) => tm.name.toString() === selectedId,
// //                 );
// //                 setSelectedTradeMark(selectedTradeMark);
// //               }}
// //               value={fakeProductDetail.tradeMask}
// //             >
// //               <option value="" disabled selected>
// //                 Chọn TradeMark
// //               </option>
// //               {tradeMaskList.map((tradeMark) => (
// //                 <option key={tradeMark.name} value={tradeMark.name}>
// //                   {tradeMark.name}
// //                 </option>
// //               ))}
// //             </select>
// //             {selectedTradeMark && (
// //               <div className="mt-2 flex items-center gap-2">
// //                 <img
// //                   src={selectedTradeMark.image_url}
// //                   alt={selectedTradeMark.name}
// //                   className="h-20 w-20 object-cover"
// //                 />
// //                 <span>{selectedTradeMark.name}</span>
// //               </div>
// //             )}
// //             {errors.tradeMask && (
// //               <p className="text-xs text-red-500">{errors.tradeMask.message}</p>
// //             )}
// //           </div>
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <label htmlFor="style" className="mb-1 font-bold">
// //               Chọn Style
// //             </label>
// //             <select
// //               {...register('style')}
// //               className="block w-full rounded border border-gray-300 p-2"
// //               onChange={(e) => {
// //                 const selectedId = e.target.value;
// //                 const selectedStyle = styleList.find(
// //                   (tm) => tm.name.toString() === selectedId,
// //                 );
// //                 setSelectedStyle(selectedStyle);
// //               }}
// //               value={fakeProductDetail.style}
// //             >
// //               <option value="" disabled selected>
// //                 Chọn Style
// //               </option>
// //               {styleList.map((styles) => (
// //                 <option key={styles.name} value={styles.name}>
// //                   {styles.name}
// //                 </option>
// //               ))}
// //             </select>
// //             {selectedStyle && (
// //               <div className="mt-2 flex items-center gap-2">
// //                 <img
// //                   src={selectedStyle.image_url}
// //                   alt={selectedStyle.name}
// //                   className="w-30 h-20 object-cover"
// //                 />
// //                 <span>{selectedStyle.name}</span>
// //               </div>
// //             )}
// //             {errors.style && (
// //               <p className="text-xs text-red-500">{errors.style.message}</p>
// //             )}
// //           </div>
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <label htmlFor="material" className="mb-1 font-bold">
// //               Chọn Material
// //             </label>
// //             <select
// //               {...register('material')}
// //               className="block w-full rounded border border-gray-300 p-2"
// //               onChange={(e) => {
// //                 const selectedId = e.target.value;
// //                 const selectedMaterial = materialList.find(
// //                   (tm) => tm.name.toString() === selectedId,
// //                 );
// //                 setSelectedMaterial(selectedMaterial);
// //               }}
// //               value={fakeProductDetail.material}
// //             >
// //               <option value="" disabled selected>
// //                 Chọn Material
// //               </option>
// //               {materialList.map((material) => (
// //                 <option key={material.name} value={material.name}>
// //                   {material.name}
// //                 </option>
// //               ))}
// //             </select>
// //             {selectedMaterial && (
// //               <div className="mt-2 flex items-center gap-2">
// //                 <img
// //                   src={selectedMaterial.image_url}
// //                   alt={selectedMaterial.name}
// //                   className="h-20 w-20 object-cover"
// //                 />
// //                 <span>{selectedMaterial.name}</span>
// //               </div>
// //             )}
// //             {errors.material && (
// //               <p className="text-xs text-red-500">{errors.material.message}</p>
// //             )}
// //           </div>
// //         </div>
// //         <div className="mb-5 flex gap-5 text-sm">
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <InputField
// //               id="productPrice"
// //               label="Giá sản phẩm (chưa khuyến mãi)"
// //               placeholder="Nhập giá sản phẩm..."
// //               register={{ ...register('originalPrice') }}
// //               type="number"
// //               errorMessage={errors.originalPrice?.errorMessage}
// //             />
// //           </div>
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <InputField
// //               id="productSaleDiscountPercent"
// //               label="Tỷ lệ khuyến mãi"
// //               placeholder="Nhập tỷ lệ khuyến mãi..."
// //               register={{ ...register('saleDiscountPercent') }}
// //               errorMessage={errors.saleDiscountPercent?.errorMessage}
// //             />
// //           </div>
// //         </div>
// //         <div>
// //           <label htmlFor="images">Preview ảnh minh họa sản phẩm</label>
// //           <div className="mt-2 flex flex-wrap gap-2">
// //             {images.length > 0 ? (
// //               images.map((image) => (
// //                 <img
// //                   key={image.id}
// //                   src={image.img_url}
// //                   alt={image.imageName}
// //                   className={`ml-1 h-1/6 w-1/6 cursor-pointer object-cover`}
// //                 />
// //               ))
// //             ) : (
// //               <p>No images available</p>
// //             )}
// //           </div>
// //         </div>
// //         <div className="mb-5 flex gap-5 text-sm">
// //           <div className="flex basis-1/3 flex-col gap-1">
// //             <CheckboxField
// //               label="Kích thước"
// //               register={{
// //                 ...register('sizes', {
// //                   onChange: (e) => {
// //                     const { checked, value } = e.target;
// //                     if (checked) {
// //                       setProductQuantities((prev) => [
// //                         ...prev,
// //                         ...productColors.map((color) => ({
// //                           color,
// //                           size: value,
// //                           quantity: 0, // Default to 0 when added
// //                         })),
// //                       ]);
// //                     } else {
// //                       setProductQuantities((prev) =>
// //                         prev.filter((item) => item.size !== value),
// //                       );
// //                     }
// //                   },
// //                 }),
// //               }}
// //               checkboxList={SIZES}
// //               errorMessage={errors.sizes?.message}
// //             />
// //           </div>
// //           <div className="flex basis-1/2 flex-col gap-1">
// //             <CheckboxField
// //               label="Màu sắc"
// //               register={{
// //                 ...register('colours', {
// //                   onChange: (e) => {
// //                     const { checked, value } = e.target;
// //                     if (checked) {
// //                       setProductQuantities((prev) => [
// //                         ...prev,
// //                         ...productSizes.map((size) => ({
// //                           color: value,
// //                           size,
// //                           quantity: 0, // Default to 0 when added
// //                         })),
// //                       ]);
// //                     } else {
// //                       setProductQuantities((prev) =>
// //                         prev.filter((item) => item.color !== value),
// //                       );
// //                     }
// //                   },
// //                 }),
// //               }}
// //               errorMessage={errors.colours?.message}
// //               checkboxList={COLORS}
// //             />
// //           </div>
// //         </div>
// //         {productSizes.length > 0 && productColors.length > 0 && (
// //           <div className="flex flex-wrap">
// //             {productSizes.map((size) =>
// //               productColors.map((color) => (
// //                 <div
// //                   key={`${size}_${color}`}
// //                   className="mb-4 flex basis-1/4 flex-col gap-1 pr-5 text-sm"
// //                 >
// //                   <label className="mb-1 w-fit">
// //                     Số lượng sản phẩm màu {''}
// //                     <span className="font-medium capitalize">{color}</span>
// //                     <span> size </span>
// //                     <span className="font-medium capitalize">{size}</span>
// //                     <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     onChange={(e) => updateQuantity(e, color, size)}
// //                     autoComplete="off"
// //                     value={
// //                       productQuantities.find(
// //                         (q) => q.color === color && q.size === size,
// //                       )?.quantity || 0
// //                     } // Default value is 1
// //                     placeholder="Nhập số lượng sản phẩm"
// //                     min={0}
// //                     type="number"
// //                     className={`border-gray w-full rounded border border-solid px-3 py-2 outline-blue-500`}
// //                   />
// //                 </div>
// //               )),
// //             )}
// //           </div>
// //         )}
// //         <div className="mt-5">
// //           <TextAreaField
// //             id="description"
// //             label="Mô tả sản phẩm"
// //             errorMessage={errors.description?.message}
// //             register={{ ...register('description') }}
// //             // value = {description}
// //             required={true}
// //             placeholder="Nhập mô tả sản phẩm"
// //           />
// //         </div>
// //         <div className="mt-5 flex justify-end">
// //           <button
// //             className="mt-5 rounded bg-green-600 px-8 py-2 text-sm text-white"
// //             type="submit"
// //           >
// //             Submit
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default UpdateProductForm;
// import * as yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import PropTypes from 'prop-types';
// import InputField from '~/components/form-controls/InputField';
// import { FaSpinner } from 'react-icons/fa6';
// import { useEffect, useState } from 'react';
// import categoryApi from '~/apis/categoryApi';
// import tradeMaskApi from '~/apis/tradeMask';
// import materialApi from '~/apis/material';
// import styleApi from '~/apis/style';
// import CheckboxField from '~/components/form-controls/CheckboxField';
// import { COLORS, SIZES } from '~/constants/variants';
// import { useParams } from 'react-router-dom';
// import TextAreaField from '~/components/form-controls/TextAreaField';
// const schema = yup.object().shape({
//   name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
//   brand: yup.string().required('Vui lòng nhập Chi tiết loại sản phẩm.'),
//   description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
//   category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
//   tradeMask: yup.string().required('Vui lòng chọn tên thương hiệu.'),
//   style: yup.string().required('Vui lòng chọn loại Phong cách.'),
//   material: yup.string().required('Vui lòng chọn loại Chất liệu.'),
//   saleDiscountPercent: yup
//     .number()
//     .integer('Phần trăm khuyến mãi phải là số nguyên')
//     .min(0, 'Phần trăm khuyến mãi không được bé hơn 0')
//     .max(100, 'Phần trăm khuyến mãi không được lớn hơn 100')
//     .required('Vui lòng nhập phần trăm khuyến mãi'),
//   sizes: yup
//     .array()
//     .min(1, 'Vui lòng chọn ít nhất một kích cỡ')
//     .required('Vui lòng chọn kích cỡ'),
//   colours: yup
//     .array()
//     .min(1, 'Vui lòng chọn ít nhất một màu sắc')
//     .required('Vui lòng chọn màu sắc'),
//   originalPrice: yup
//     .number()
//     .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
//     .required('Vui lòng nhập giá sản phẩm')
//     .min(1, 'Giá sản phẩm phải lớn hơn 0')
//     .max(1000000000, 'Giá sản phẩm không được quá 1000000000')
//     .integer('Giá sản phẩm phải là số nguyên'),
//   // images: yup
//   //   .mixed()
//   //   // .required('Vui lòng upload ít nhất một ảnh sản phẩm')
//   //   .test('fileType', 'Chỉ chấp nhận file ảnh', (value) => {
//   //     if (!value.length) return false; // Không có file nào
//   //     return Array.from(value).every((file) =>
//   //       ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
//   //     ); // Kiểm tra từng file
//   //   })
//   //   .test('minFiles', 'Vui lòng tải lên 5 ảnh', (value) => {
//   //     return value && value.length === 5; // Kiểm tra số lượng file
//   //   }),
// });
// UpdateProductForm.propTypes = {
//   productDetail: PropTypes.object.isRequired,
// };

// function UpdateProductForm({ productDetail, onSubmit }) {
//   // const{quantityDetails } = productDetail;

//   // const fakeProductDetail =
//   // {
//   //   id: 16,
//   //   imageMain: "https://product.hstatic.net/1000026602/product/img_6137_559a685d9a884fc2b92d212b72e711be_master.jpg",
//   //   skuQa: "8A91035CC5",
//   //   colours: [
//   //       "Đỏ",
//   //       "Xanh Dương"
//   //   ],
//   //   sizes: [
//   //       "S",
//   //       "M",
//   //       "XXL",
//   //       "XS"
//   //   ],
//   //   name: 'Product 01',
//   //   category: 'Quần',
//   //   subCategory: 'Quần short_3',
//   //   tradeMask:"Devipock",
//   //   style: "Sport Wear",
//   //   material: "Cotton",
//   //   images: [
//   //       {
//   //           "id": 1,
//   //           "identification": "sdaf",
//   //           "imageName": "img_4248_763647bf331b43eaac93234d8794ca15_master.jpeg",
//   //           "img_url": "https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg"
//   //       },
//   //       {
//   //           "id": 2,
//   //           "identification": "sdaf",
//   //           "imageName": "img_4250_46364d8ebd99438182eeb4e1deff5f4b_master.jpeg",
//   //           "img_url": "https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg"
//   //       },
//   //       {
//   //           "id": 3,
//   //           "identification": "sdaf",
//   //           "imageName": "img_6846_025ee261a4ae446a905ee6b2b459e829_master.jpeg",
//   //           "img_url": "https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg"
//   //       },
//   //       {
//   //           "id": 4,
//   //           "identification": "sdaf",
//   //           "imageName": "img_6852_f2f9e6cbe79b42c79c9373c7a348646a_master.jpeg",
//   //           "img_url": "https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg"
//   //       },
//   //       {
//   //           "id": 5,
//   //           "identification": "sdaf",
//   //           "imageName": "img_6860_1344f046b30c4eb7946ba236413e42f3_master.jpeg",
//   //           "img_url": "https://i.pinimg.com/564x/ba/a5/1f/baa51f107d882dfedab0dd853eb411d4.jpg"
//   //       }
//   //   ],
//   //   quantityDetails: [
//   //     {
//   //       color: 'Đen',
//   //       sizes: [
//   //         { size: 'S', stock: 5 },
//   //         { size: 'M', stock: 10 },
//   //         { size: 'XL', stock: 0 },
//   //       ],
//   //     },
//   //     {
//   //       color: 'Trắng',
//   //       sizes: [
//   //         { size: 'S', stock: 5 },
//   //         { size: 'M', stock: 15 },
//   //         { size: 'XL', stock: 20 },
//   //       ],
//   //     },
//   //   ],
//   //   totalQuantity: 55,
//   //   originalPrice: 100,
//   //   quantitySold: 11,
//   //   rating: 0,
//   //   nrating: 0,
//   //   comments: [{}],
//   //   description: "description demo",
//   //   saleDiscountPercent: 10,
//   //   finalPrice: 90,
//   //   //.....
//   // };

//   const [productQuantities, setProductQuantities] = useState([]);

//   useEffect(() => {
//     // Calculate initialQuantities based on productDetail
//     const quantities = productDetail?.quantityDetails
//       ? productDetail.quantityDetails.flatMap((detail) =>
//           detail.sizes.map((sizeDetail) => ({
//             color: detail.color,
//             size: sizeDetail.size,
//             quantity: sizeDetail.quantity,
//           })),
//         )
//       : [];

//     // Update the state with the calculated quantities
//     setProductQuantities(quantities);
//     // Log or handle initialQuantities as needed
//     console.log('initialQuantities', quantities);
//   }, [productDetail]);
//   // ---------------------------

//   const {
//     handleSubmit,
//     register,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   useEffect(() => {
//     if (productDetail) {
//       setValue('name', productDetail.name);
//       setValue('originalPrice', productDetail.originalPrice);
//       setValue('saleDiscountPercent', productDetail.saleDiscountPercent);
//       setValue('category', productDetail.category);
//       setValue('tradeMask', productDetail.tradeMask);
//       setValue('style', productDetail.style);
//       setValue('material', productDetail.material);
//       setValue('colours', productDetail.colours);
//       setValue('sizes', productDetail.sizes);
//       setValue('description', productDetail.description);
//     }
//     (async () => {
//       try {
//         const categoryApiResponse = await categoryApi.getAll();
//         const _categoryList = categoryApiResponse.filter(
//           (_category) => _category.status !== 0,
//         );
//         setCategoriesList(_categoryList);
//         // console.log(productDetail);
//         // console.log(id);
//         // Cập nhật danh sách brand
//         const position = _categoryList.findIndex(
//           (_category) => _category.name === productDetail.category,
//         );
//         if (position !== -1) {
//           setBrandsList(_categoryList[position].brands);
//         }

//         //--------------tradeMask------------------------
//         const tradeMaskResponse = await tradeMaskApi.getAll();
//         const _tradeMaskList = tradeMaskResponse.filter(
//           (_category) => _category.status !== 0,
//         );
//         setTradeMaskList(_tradeMaskList);

//         const styleResponse = await styleApi.getAll();
//         const _styleList = styleResponse.filter(
//           (_category) => _category.status !== 0,
//         );
//         setStyleList(_styleList);

//         const materiaResponse = await materialApi.getAll();
//         const _materiaList = materiaResponse.filter(
//           (_category) => _category.status !== 0,
//         );
//         setMaterialList(_materiaList);

//         // Set initial values for trade mark, style, and material
//         const selectedTradeMark = _tradeMaskList.find(
//           (tm) => tm.name === productDetail.tradeMask,
//         );
//         setSelectedTradeMark(selectedTradeMark || null);

//         const selectedStyle = _styleList.find(
//           (st) => st.name === productDetail.style,
//         );
//         setSelectedStyle(selectedStyle || null);

//         const selectedMaterial = _materiaList.find(
//           (mat) => mat.name === productDetail.material,
//         );
//         setSelectedMaterial(selectedMaterial || null);
//         //ảnh
//         setImages(productDetail.images);
//       } catch (error) {
//         // log error message
//       }
//     })();
//   }, [productDetail, setValue]);
//   const { id } = useParams();
//   const [images, setImages] = useState([]);
//   const [brandsList, setBrandsList] = useState([]);
//   const [categoriesList, setCategoriesList] = useState([]);
//   const [tradeMaskList, setTradeMaskList] = useState([]);
//   const [styleList, setStyleList] = useState([]);
//   const [materialList, setMaterialList] = useState([]);
//   const [selectedTradeMark, setSelectedTradeMark] = useState(null);
//   const [selectedStyle, setSelectedStyle] = useState(null);
//   const [selectedMaterial, setSelectedMaterial] = useState(null);

//   // Đặt giá trị mặc định cho category sau khi Categorieslist được tải xong
//   useEffect(() => {
//     if (categoriesList?.length > 0) {
//       setValue('category', productDetail.category);
//       setValue('brand', productDetail.subCategory);
//     }
//   }, [categoriesList, setValue, productDetail.category]);

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const productColors = watch('colours') || [];
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const productSizes = watch('sizes') || [];

//   const handleFormSubmit = async (data) => {
//     console.log('Submit Form');

//     try {
//       // Your existing logic

//       const { colours, sizes, ...productInfo } = data;

//       const quantityDetails = colours.map((color) => ({
//         color,
//         sizes: sizes.map((size) => ({
//           size,
//           quantity:
//             productQuantities.find((q) => q.color === color && q.size === size)
//               ?.quantity || 0,
//         })),
//       }));
//       // setProductQuantities(quantityDetails);
//       const formData = new FormData();

//       formData.append(
//         'productDtos',
//         JSON.stringify({
//           originalPrice: productInfo.originalPrice,
//           saleDiscountPercent: productInfo.saleDiscountPercent,
//           category: productInfo.category,
//           description: productInfo.description,
//           subCategory: productInfo.brand,
//           name: productInfo.name,
//           style: productInfo.style,
//           tradeMask: productInfo.tradeMask,
//           material: productInfo.material,
//           quantityDetails: quantityDetails,
//         }),
//       );

//       console.log({
//         originalPrice: productInfo.originalPrice,
//         saleDiscountPercent: productInfo.saleDiscountPercent,
//         category: productInfo.category,
//         description: productInfo.description,
//         subCategory: productInfo.brand,
//         name: productInfo.name,
//         quantityDetails: quantityDetails,
//         style: productInfo.style,
//         tradeMask: productInfo.tradeMask,
//         material: productInfo.material,
//       });
//       // if (onSubmit) {
//       //   onSubmit(formData);
//       // }
//     } catch (error) {
//       console.error('Submission error:', error);
//     }
//     // if (onSubmit) {
//     //   await onSubmit(formData);
//     // }
//   };

//   const updateQuantity = (e, color, size) => {
//     const newQuantity = e.target.value;
//     setProductQuantities((prev) => {
//       const existingIndex = prev.findIndex(
//         (item) => item.color === color && item.size === size,
//       );
//       if (existingIndex !== -1) {
//         const updated = [...prev];
//         updated[existingIndex] = { color, size, quantity: +newQuantity };
//         return updated;
//       } else {
//         return [...prev, { color, size, quantity: +newQuantity }];
//       }
//     });
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
//     <div>
//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <div className="mb-5 flex gap-5 text-sm">
//           <div className="flex basis-1/3 flex-col gap-1">
//             <InputField
//               id="productName"
//               label="Tên sản phẩm"
//               placeholder="Nhập tên sản phẩm..."
//               autofocus={true}
//               register={{ ...register('name') }}
//               errorMessage={errors.name?.errorMessage}
//             />
//           </div>
//           <div className="flex basis-1/3 flex-col gap-1">
//             <div className="flex flex-col gap-1 text-sm">
//               <label className="w-fit" htmlFor="category">
//                 Loại sản phẩm
//               </label>
//               <select
//                 {...register('category', {
//                   onChange: (e) => {
//                     const newCategory = e.target.value;
//                     const newBrandList = handleGetBrandsList(newCategory);
//                     setBrandsList(newBrandList);
//                   },
//                 })}
//                 id="category"
//                 className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
//               >
//                 <option value="" disabled selected>
//                   ---Chọn loại sản phẩm---
//                 </option>
//                 {categoriesList.map((category) => (
//                   <option value={category.name} key={category.sku}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//               {errors.category?.message && (
//                 <p className="px-1 text-sm text-red-500">
//                   {errors.category?.message}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="flex basis-1/3 flex-col gap-1">
//             <div className="flex flex-col gap-1 text-sm">
//               <label className="w-fit" htmlFor="brand">
//                 Chi tiết loại sản phẩm
//               </label>
//               <select
//                 {...register('brand')}
//                 className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
//               >
//                 <option value="" disabled selected>
//                   ---Chọn Chi tiết loại sản phẩm---
//                 </option>
//                 {brandsList.map((brand) => (
//                   <option value={brand} key={brand}>
//                     {brand}
//                   </option>
//                 ))}
//               </select>
//               {errors.brand?.message && (
//                 <p className="px-1 text-sm text-red-500">
//                   {errors.brand?.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="mb-5 flex gap-5 text-sm">
//           <div className="flex basis-1/3 flex-col gap-1">
//             <label htmlFor="tradeMask" className="mb-1 font-bold">
//               Chọn TradeMark
//             </label>
//             <select
//               {...register('tradeMask')}
//               className="block w-full rounded border border-gray-300 p-2"
//               onChange={(e) => {
//                 const selectedId = e.target.value;
//                 const selectedTradeMark = tradeMaskList.find(
//                   (tm) => tm.name.toString() === selectedId,
//                 );
//                 setSelectedTradeMark(selectedTradeMark);
//               }}
//               value={productDetail.tradeMask}
//             >
//               <option value="" disabled selected>
//                 Chọn TradeMark
//               </option>
//               {tradeMaskList.map((tradeMark) => (
//                 <option key={tradeMark.name} value={tradeMark.name}>
//                   {tradeMark.name}
//                 </option>
//               ))}
//             </select>
//             {selectedTradeMark && (
//               <div className="mt-2 flex items-center gap-2">
//                 <img
//                   src={selectedTradeMark.image_url}
//                   alt={selectedTradeMark.name}
//                   className="h-20 w-20 object-cover"
//                 />
//                 <span>{selectedTradeMark.name}</span>
//               </div>
//             )}
//             {errors.tradeMask && (
//               <p className="text-xs text-red-500">{errors.tradeMask.message}</p>
//             )}
//           </div>
//           <div className="flex basis-1/3 flex-col gap-1">
//             <label htmlFor="style" className="mb-1 font-bold">
//               Chọn Style
//             </label>
//             <select
//               {...register('style')}
//               className="block w-full rounded border border-gray-300 p-2"
//               onChange={(e) => {
//                 const selectedId = e.target.value;
//                 const selectedStyle = styleList.find(
//                   (tm) => tm.name.toString() === selectedId,
//                 );
//                 setSelectedStyle(selectedStyle);
//               }}
//               value={productDetail.style}
//             >
//               <option value="" disabled selected>
//                 Chọn Style
//               </option>
//               {styleList.map((styles) => (
//                 <option key={styles.name} value={styles.name}>
//                   {styles.name}
//                 </option>
//               ))}
//             </select>
//             {selectedStyle && (
//               <div className="mt-2 flex items-center gap-2">
//                 <img
//                   src={selectedStyle.image_url}
//                   alt={selectedStyle.name}
//                   className="w-30 h-20 object-cover"
//                 />
//                 <span>{selectedStyle.name}</span>
//               </div>
//             )}
//             {errors.style && (
//               <p className="text-xs text-red-500">{errors.style.message}</p>
//             )}
//           </div>
//           <div className="flex basis-1/3 flex-col gap-1">
//             <label htmlFor="material" className="mb-1 font-bold">
//               Chọn Material
//             </label>
//             <select
//               {...register('material')}
//               className="block w-full rounded border border-gray-300 p-2"
//               onChange={(e) => {
//                 const selectedId = e.target.value;
//                 const selectedMaterial = materialList.find(
//                   (tm) => tm.name.toString() === selectedId,
//                 );
//                 setSelectedMaterial(selectedMaterial);
//               }}
//               value={productDetail.material}
//             >
//               <option value="" disabled selected>
//                 Chọn Material
//               </option>
//               {materialList.map((material) => (
//                 <option key={material.name} value={material.name}>
//                   {material.name}
//                 </option>
//               ))}
//             </select>
//             {selectedMaterial && (
//               <div className="mt-2 flex items-center gap-2">
//                 <img
//                   src={selectedMaterial.image_url}
//                   alt={selectedMaterial.name}
//                   className="h-20 w-20 object-cover"
//                 />
//                 <span>{selectedMaterial.name}</span>
//               </div>
//             )}
//             {errors.material && (
//               <p className="text-xs text-red-500">{errors.material.message}</p>
//             )}
//           </div>
//         </div>
//         <div className="mb-5 flex gap-5 text-sm">
//           <div className="flex basis-1/3 flex-col gap-1">
//             <InputField
//               id="productPrice"
//               label="Giá sản phẩm (chưa khuyến mãi)"
//               placeholder="Nhập giá sản phẩm..."
//               register={{ ...register('originalPrice') }}
//               type="number"
//               errorMessage={errors.originalPrice?.errorMessage}
//             />
//           </div>
//           <div className="flex basis-1/3 flex-col gap-1">
//             <InputField
//               id="productSaleDiscountPercent"
//               label="Tỷ lệ khuyến mãi"
//               placeholder="Nhập tỷ lệ khuyến mãi..."
//               register={{ ...register('saleDiscountPercent') }}
//               errorMessage={errors.saleDiscountPercent?.errorMessage}
//             />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="images">Preview ảnh minh họa sản phẩm</label>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {images && images?.length !== 0 ? (
//               images.map((image) => (
//                 <img
//                   key={image.id}
//                   src={image.img_url}
//                   alt={image.imageName}
//                   className={`ml-1 h-1/6 w-1/6 cursor-pointer object-cover`}
//                 />
//               ))
//             ) : (
//               <p>No images available</p>
//             )}
//           </div>
//         </div>
//         <div className="mb-5 flex gap-5 text-sm">
//           <div className="flex basis-1/3 flex-col gap-1">
//             <CheckboxField
//               label="Kích thước"
//               register={{
//                 ...register('sizes', {
//                   onChange: (e) => {
//                     const { checked, value } = e.target;
//                     if (checked) {
//                       setProductQuantities((prev) => [
//                         ...prev,
//                         ...productColors.map((color) => ({
//                           color,
//                           size: value,
//                           quantity: 0, // Default to 0 when added
//                         })),
//                       ]);
//                     } else {
//                       setProductQuantities((prev) =>
//                         prev.filter((item) => item.size !== value),
//                       );
//                     }
//                   },
//                 }),
//               }}
//               checkboxList={SIZES}
//               errorMessage={errors.sizes?.message}
//             />
//           </div>
//           <div className="flex basis-1/2 flex-col gap-1">
//             <CheckboxField
//               label="Màu sắc"
//               register={{
//                 ...register('colours', {
//                   onChange: (e) => {
//                     const { checked, value } = e.target;
//                     if (checked) {
//                       setProductQuantities((prev) => [
//                         ...prev,
//                         ...productSizes.map((size) => ({
//                           color: value,
//                           size,
//                           quantity: 0, // Default to 0 when added
//                         })),
//                       ]);
//                     } else {
//                       setProductQuantities((prev) =>
//                         prev.filter((item) => item.color !== value),
//                       );
//                     }
//                   },
//                 }),
//               }}
//               errorMessage={errors.colours?.message}
//               checkboxList={COLORS}
//             />
//           </div>
//         </div>
//         {productSizes?.length > 0 && productColors?.length > 0 && (
//           <div className="flex flex-wrap">
//             {productSizes.map((size) =>
//               productColors.map((color) => (
//                 <div
//                   key={`${size}_${color}`}
//                   className="mb-4 flex basis-1/4 flex-col gap-1 pr-5 text-sm"
//                 >
//                   <label className="mb-1 w-fit">
//                     Số lượng sản phẩm màu {''}
//                     <span className="font-medium capitalize">{color}</span>
//                     <span> size </span>
//                     <span className="font-medium capitalize">{size}</span>
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     onChange={(e) => updateQuantity(e, color, size)}
//                     autoComplete="off"
//                     value={
//                       productQuantities.find(
//                         (q) => q.color === color && q.size === size,
//                       )?.quantity || 0
//                     } // Default value is 1
//                     placeholder="Nhập số lượng sản phẩm"
//                     min={0}
//                     type="number"
//                     className={`border-gray w-full rounded border border-solid px-3 py-2 outline-blue-500`}
//                   />
//                 </div>
//               )),
//             )}
//           </div>
//         )}
//         <div className="mt-5">
//           <TextAreaField
//             id="description"
//             label="Mô tả sản phẩm"
//             errorMessage={errors.description?.message}
//             register={{ ...register('description') }}
//             // value = {description}
//             required={true}
//             placeholder="Nhập mô tả sản phẩm"
//           />
//         </div>
//         <div className="mt-5 flex justify-end">
//           <button
//             className="mt-5 rounded bg-green-600 px-8 py-2 text-sm text-white"
//             type="submit"
//           >
//             Save
//           </button>
//         </div>
//         {/* <div className="mt-5 flex justify-end">
//         <button
//           className={`${
//             isSubmitting
//               ? 'cursor-not-allowed bg-green-500'
//               : 'cursor-pointer bg-green-600 hover:bg-green-500'
//           } rounded px-5 py-2 text-sm uppercase tracking-widest text-white`}
//         >
//           {isSubmitting ? (
//             <p className="flex items-center justify-center gap-4">
//               <FaSpinner className="animate-spin" />
//               Loading...
//             </p>
//           ) : (
//             'update mới sản phẩm'
//           )}
//         </button>
//       </div> */}
//       </form>
//     </div>
//   );
// }

// export default UpdateProductForm;

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import InputField from '~/components/form-controls/InputField';
import { FaSpinner } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import categoryApi from '~/apis/categoryApi';
import tradeMaskApi from '~/apis/tradeMask';
import materialApi from '~/apis/material';
import styleApi from '~/apis/style';
import CheckboxField from '~/components/form-controls/CheckboxField';
import { COLORS, SIZES } from '~/constants/variants';
import { useParams } from 'react-router-dom';
import TextAreaField from '~/components/form-controls/TextAreaField';
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm.'),
  brand: yup.string().required('Vui lòng nhập Chi tiết loại sản phẩm.'),
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm.'),
  category: yup.string().required('Vui lòng chọn loại sản phẩm.'),
  tradeMask: yup.string().required('Vui lòng chọn tên thương hiệu.'),
  style: yup.string().required('Vui lòng chọn loại Phong cách.'),
  material: yup.string().required('Vui lòng chọn loại Chất liệu.'),
  saleDiscountPercent: yup
    .number()
    .integer('Phần trăm khuyến mãi phải là số nguyên')
    .min(0, 'Phần trăm khuyến mãi không được bé hơn 0')
    .max(100, 'Phần trăm khuyến mãi không được lớn hơn 100')
    .required('Vui lòng nhập phần trăm khuyến mãi'),
  sizes: yup
    .array()
    .min(1, 'Vui lòng chọn ít nhất một kích cỡ')
    .required('Vui lòng chọn kích cỡ'),
  colours: yup
    .array()
    .min(1, 'Vui lòng chọn ít nhất một màu sắc')
    .required('Vui lòng chọn màu sắc'),
  originalPrice: yup
    .number()
    .typeError('Vui lòng nhập giá sản phẩm hợp lệ')
    .required('Vui lòng nhập giá sản phẩm')
    .min(1, 'Giá sản phẩm phải lớn hơn 0')
    .max(1000000000, 'Giá sản phẩm không được quá 1000000000')
    .integer('Giá sản phẩm phải là số nguyên'),
  // images_save: yup
  // .mixed()
  // .required('Vui lòng upload ít nhất một ảnh sản phẩm')
  // .test('fileType', 'Chỉ chấp nhận file ảnh', (value) => {
  //   if (!value.length) return false; // Không có file nào
  //   return Array.from(value).every((file) =>
  //     ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
  //   ); // Kiểm tra từng file
  // }),
  // .test('minFiles', 'Vui lòng tải lên 5 ảnh', (value) => {
  //   return value && value.length === 5; // Kiểm tra số lượng file
  // }),
});
UpdateProductForm.propTypes = {
  productDetail: PropTypes.object.isRequired,
};

function UpdateProductForm({ productDetail, onSubmit }) {
  const [productQuantities, setProductQuantities] = useState([]);
  useEffect(() => {
    // Calculate initialQuantities based on productDetail
    const quantities = productDetail?.quantityDetails
      ? productDetail.quantityDetails.flatMap((detail) =>
          detail.sizes.map((sizeDetail) => ({
            color: detail.color,
            size: sizeDetail.size,
            quantity: sizeDetail.quantity,
          })),
        )
      : [];

    // Update the state with the calculated quantities
    setProductQuantities(quantities);
    // Log or handle initialQuantities as needed
    console.log('initialQuantities', quantities);
  }, [productDetail]);
  // ---------------------------

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (productDetail) {
      setValue('name', productDetail.name);
      setValue('originalPrice', productDetail.originalPrice);
      setValue('saleDiscountPercent', productDetail.saleDiscountPercent);
      setValue('category', productDetail.category);
      setValue('tradeMask', productDetail.tradeMask);
      setValue('style', productDetail.style);
      setValue('material', productDetail.material);
      setValue('colours', productDetail.colours);
      setValue('sizes', productDetail.sizes);
      setValue('description', productDetail.description);
    }
    (async () => {
      try {
        const categoryApiResponse = await categoryApi.getAll();
        const _categoryList = categoryApiResponse.filter(
          (_category) => _category.status !== 0,
        );
        setCategoriesList(_categoryList);
        // console.log(productDetail);
        // console.log(id);
        // Cập nhật danh sách brand
        const position = _categoryList.findIndex(
          (_category) => _category.name === productDetail.category,
        );
        if (position !== -1) {
          setBrandsList(_categoryList[position].brands);
        }

        //--------------tradeMask------------------------
        const tradeMaskResponse = await tradeMaskApi.getAll();
        const _tradeMaskList = tradeMaskResponse.filter(
          (_category) => _category.status !== 0,
        );
        setTradeMaskList(_tradeMaskList);

        const styleResponse = await styleApi.getAll();
        const _styleList = styleResponse.filter(
          (_category) => _category.status !== 0,
        );
        setStyleList(_styleList);

        const materiaResponse = await materialApi.getAll();
        const _materiaList = materiaResponse.filter(
          (_category) => _category.status !== 0,
        );
        setMaterialList(_materiaList);

        // Set initial values for trade mark, style, and material
        const selectedTradeMark = _tradeMaskList.find(
          (tm) => tm.name === productDetail.tradeMask,
        );
        setSelectedTradeMark(selectedTradeMark || null);

        const selectedStyle = _styleList.find(
          (st) => st.name === productDetail.style,
        );
        setSelectedStyle(selectedStyle || null);

        const selectedMaterial = _materiaList.find(
          (mat) => mat.name === productDetail.material,
        );
        setSelectedMaterial(selectedMaterial || null);
        //ảnh
        setImages(productDetail.images);
        // setImages((prevImages) => [...prevImages, productDetail.imageMain]);
      } catch (error) {
        // log error message
      }
    })();
  }, [productDetail, setValue]);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tradeMaskList, setTradeMaskList] = useState([]);
  const [styleList, setStyleList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [selectedTradeMark, setSelectedTradeMark] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [images_save, setImages_save] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const handleImageClick = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    const selectedImage = images_save.find(
      (image) => image.index === imageIndex,
    );
    console.log(`Selected image: ${selectedImage.name}, Index: ${imageIndex}`);
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push({ src: e.target.result, name: file.name, index: index });
        if (newImages.length === files.length) {
          // Ensure all files are processed
          setImages_save(newImages);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  // Đặt giá trị mặc định cho category sau khi Categorieslist được tải xong
  useEffect(() => {
    if (categoriesList?.length > 0) {
      setValue('category', productDetail.category);
      setValue('brand', productDetail.subCategory);
    }
  }, [categoriesList, setValue, productDetail.category]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const productColors = watch('colours') || [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const productSizes = watch('sizes') || [];

  const handleFormSubmit = async (data) => {
    console.log('Submit Form');

    try {
      const { colours, sizes, ...productInfo } = data;

      const quantityDetails = colours.map((color) => ({
        color,
        sizes: sizes.map((size) => ({
          size,
          quantity:
            productQuantities.find((q) => q.color === color && q.size === size)
              ?.quantity || 0,
        })),
      }));
      // setProductQuantities(quantityDetails);
      const formData = new FormData();
      if (productInfo.images_save.length > 0) {
        for (let i = 0; i < productInfo.images_save.length; i++) {
          formData.append('images', productInfo.images_save[i]);
        }
      } else {
        formData.append('images', null);
      }

      formData.append(
        'productDtos',
        JSON.stringify({
          originalPrice: productInfo.originalPrice,
          saleDiscountPercent: productInfo.saleDiscountPercent,
          category: productInfo.category,
          description: productInfo.description,
          subCategory: productInfo.brand,
          name: productInfo.name,
          style: productInfo.style,
          tradeMask: productInfo.tradeMask,
          material: productInfo.material,
          quantityDetails: quantityDetails,
          imageMain: images_save[selectedImageIndex]?.name,
        }),
      );

      // console.log({
      //   originalPrice: productInfo.originalPrice,
      //   saleDiscountPercent: productInfo.saleDiscountPercent,
      //   category: productInfo.category,
      //   description: productInfo.description,
      //   subCategory: productInfo.brand,
      //   name: productInfo.name,
      //   quantityDetails: quantityDetails,
      //   style: productInfo.style,
      //   tradeMask: productInfo.tradeMask,
      //   material: productInfo.material,
      // });
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const updateQuantity = (e, color, size) => {
    const newQuantity = e.target.value;
    setProductQuantities((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.color === color && item.size === size,
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = { color, size, quantity: +newQuantity };
        return updated;
      } else {
        return [...prev, { color, size, quantity: +newQuantity }];
      }
    });
  };

  const handleGetBrandsList = (category) => {
    const position = categoriesList.findIndex(
      (_category) => _category.name === category,
    );
    if (position !== -1) {
      return categoriesList[position].brands;
    }
    return [];
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-5 flex gap-5 text-sm">
          <div className="flex basis-1/3 flex-col gap-1">
            <InputField
              id="productName"
              label="Tên sản phẩm"
              placeholder="Nhập tên sản phẩm..."
              autofocus={true}
              register={{ ...register('name') }}
              errorMessage={errors.name?.errorMessage}
            />
          </div>
          <div className="flex basis-1/3 flex-col gap-1">
            <div className="flex flex-col gap-1 text-sm">
              <label className="w-fit" htmlFor="category">
                Loại sản phẩm
              </label>
              <select
                {...register('category', {
                  onChange: (e) => {
                    const newCategory = e.target.value;
                    const newBrandList = handleGetBrandsList(newCategory);
                    setBrandsList(newBrandList);
                  },
                })}
                id="category"
                className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
              >
                <option value="" disabled selected>
                  ---Chọn loại sản phẩm---
                </option>
                {categoriesList.map((category) => (
                  <option value={category.name} key={category.sku}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category?.message && (
                <p className="px-1 text-sm text-red-500">
                  {errors.category?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex basis-1/3 flex-col gap-1">
            <div className="flex flex-col gap-1 text-sm">
              <label className="w-fit" htmlFor="brand">
                Chi tiết loại sản phẩm
              </label>
              <select
                {...register('brand')}
                className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
              >
                <option value="" disabled selected>
                  ---Chọn Chi tiết loại sản phẩm---
                </option>
                {brandsList.map((brand) => (
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.brand?.message && (
                <p className="px-1 text-sm text-red-500">
                  {errors.brand?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mb-5 flex gap-5 text-sm">
          <div className="flex basis-1/3 flex-col gap-1">
            <label htmlFor="tradeMask" className="mb-1 font-bold">
              Chọn TradeMark
            </label>
            <select
              {...register('tradeMask')}
              className="block w-full rounded border border-gray-300 p-2"
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedTradeMark = tradeMaskList.find(
                  (tm) => tm.name.toString() === selectedId,
                );
                setSelectedTradeMark(selectedTradeMark);
              }}
            >
              <option value="" disabled selected>
                Chọn TradeMark
              </option>
              {tradeMaskList.map((tradeMark) => (
                <option key={tradeMark.name} value={tradeMark.name}>
                  {tradeMark.name}
                </option>
              ))}
            </select>
            {selectedTradeMark && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={selectedTradeMark.image_url}
                  alt={selectedTradeMark.name}
                  className="h-[180px] w-[180px] rounded-2xl object-cover"
                />
                <span className="ml-6 text-lg font-bold">
                  {selectedTradeMark.name}
                </span>
              </div>
            )}
            {errors.tradeMask && (
              <p className="text-xs text-red-500">{errors.tradeMask.message}</p>
            )}
          </div>
          <div className="flex basis-1/3 flex-col gap-1">
            <label htmlFor="style" className="mb-1 font-bold">
              Chọn Style
            </label>
            <select
              {...register('style')}
              className="block w-full rounded border border-gray-300 p-2"
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedStyle = styleList.find(
                  (tm) => tm.name.toString() === selectedId,
                );
                setSelectedStyle(selectedStyle);
              }}
            >
              <option value="" disabled selected>
                Chọn Style
              </option>
              {styleList.map((styles) => (
                <option key={styles.name} value={styles.name}>
                  {styles.name}
                </option>
              ))}
            </select>
            {selectedStyle && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={selectedStyle.image_url}
                  alt={selectedStyle.name}
                  className="h-[180px] w-[360px] rounded-2xl object-cover"
                />
                <span className="ml-2 text-lg font-bold">
                  {selectedStyle.name}
                </span>
              </div>
            )}
            {errors.style && (
              <p className="text-xs text-red-500">{errors.style.message}</p>
            )}
          </div>
          <div className="flex basis-1/3 flex-col gap-1">
            <label htmlFor="material" className="mb-1 font-bold">
              Chọn Material
            </label>
            <select
              {...register('material')}
              className="block w-full rounded border border-gray-300 p-2"
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedMaterial = materialList.find(
                  (tm) => tm.name.toString() === selectedId,
                );
                setSelectedMaterial(selectedMaterial);
              }}
            >
              <option value="" disabled selected>
                Chọn Material
              </option>
              {materialList.map((material) => (
                <option key={material.name} value={material.name}>
                  {material.name}
                </option>
              ))}
            </select>
            {selectedMaterial && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={selectedMaterial.image_url}
                  alt={selectedMaterial.name}
                  className="h-[180px] w-[180px] rounded-2xl object-cover"
                />
                <span className="ml-6 text-lg font-bold">
                  {selectedMaterial.name}
                </span>
              </div>
            )}
            {errors.material && (
              <p className="text-xs text-red-500">{errors.material.message}</p>
            )}
          </div>
        </div>
        <div className="mb-5 flex gap-5 text-sm">
          <div className="flex basis-1/3 flex-col gap-1">
            <InputField
              id="productPrice"
              label="Giá sản phẩm (chưa khuyến mãi)"
              placeholder="Nhập giá sản phẩm..."
              register={{ ...register('originalPrice') }}
              type="number"
              errorMessage={errors.originalPrice?.errorMessage}
            />
          </div>
          <div className="flex basis-1/3 flex-col gap-1">
            <InputField
              id="productSaleDiscountPercent"
              label="Tỷ lệ khuyến mãi"
              placeholder="Nhập tỷ lệ khuyến mãi..."
              register={{ ...register('saleDiscountPercent') }}
              errorMessage={errors.saleDiscountPercent?.errorMessage}
            />
          </div>
        </div>
        <label htmlFor="images">Ảnh minh họa sản phẩm Gốc</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {images && images?.length !== 0 ? (
            images.map((image) => (
              <img
                key={image.id}
                src={image}
                alt={image.imageName}
                className={`ml-1 h-1/6 w-1/6 cursor-pointer object-cover`}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="mb-5 flex basis-1/3 flex-col gap-1 text-sm">
          <div className="flex basis-1/3 flex-col gap-1 text-sm">
            <label htmlFor="images_save">
              Chỉnh sửa Ảnh minh họa{' '}
              {selectedImageIndex !== null && (
                <p className="mt-2 text-sm">
                  Ảnh chính : {images_save[selectedImageIndex].name}, Index:{' '}
                  {selectedImageIndex}
                </p>
              )}
            </label>
            <input
              type="file"
              {...register('images_save')}
              onChange={handleFileChange}
              multiple
            />
            {errors.images_save && (
              <p className="px-1 text-sm text-red-500">
                {errors.images_save.message}
              </p>
            )}
          </div>
          <label htmlFor="images">Preview ảnh minh họa sản phẩm</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {images_save.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={`Preview ${index}`}
                className={`h-1/6 w-1/6 cursor-pointer object-cover ${selectedImageIndex === index ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handleImageClick(image.index)}
              />
            ))}
          </div>
        </div>
        <div className="mb-5 flex gap-5 text-sm">
          <div className="flex basis-1/3 flex-col gap-1">
            <CheckboxField
              label="Kích thước"
              register={{
                ...register('sizes', {
                  onChange: (e) => {
                    const { checked, value } = e.target;
                    if (checked) {
                      setProductQuantities((prev) => [
                        ...prev,
                        ...productColors.map((color) => ({
                          color,
                          size: value,
                          quantity: 0, // Default to 0 when added
                        })),
                      ]);
                    } else {
                      setProductQuantities((prev) =>
                        prev.filter((item) => item.size !== value),
                      );
                    }
                  },
                }),
              }}
              checkboxList={SIZES}
              errorMessage={errors.sizes?.message}
            />
          </div>
          <div className="flex basis-1/2 flex-col gap-1">
            <CheckboxField
              label="Màu sắc"
              register={{
                ...register('colours', {
                  onChange: (e) => {
                    const { checked, value } = e.target;
                    if (checked) {
                      setProductQuantities((prev) => [
                        ...prev,
                        ...productSizes.map((size) => ({
                          color: value,
                          size,
                          quantity: 0, // Default to 0 when added
                        })),
                      ]);
                    } else {
                      setProductQuantities((prev) =>
                        prev.filter((item) => item.color !== value),
                      );
                    }
                  },
                }),
              }}
              errorMessage={errors.colours?.message}
              checkboxList={COLORS}
            />
          </div>
        </div>
        {productSizes?.length > 0 && productColors?.length > 0 && (
          <div className="flex flex-wrap">
            {productSizes.map((size) =>
              productColors.map((color) => (
                <div
                  key={`${size}_${color}`}
                  className="mb-4 flex basis-1/4 flex-col gap-1 pr-5 text-sm"
                >
                  <label className="mb-1 w-fit">
                    Số lượng sản phẩm màu {''}
                    <span className="font-medium capitalize">{color}</span>
                    <span> size </span>
                    <span className="font-medium capitalize">{size}</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={(e) => updateQuantity(e, color, size)}
                    autoComplete="off"
                    value={
                      productQuantities.find(
                        (q) => q.color === color && q.size === size,
                      )?.quantity || 0
                    } // Default value is 1
                    placeholder="Nhập số lượng sản phẩm"
                    min={0}
                    type="number"
                    className={`border-gray w-full rounded border border-solid px-3 py-2 outline-blue-500`}
                  />
                </div>
              )),
            )}
          </div>
        )}
        <div className="mt-5">
          <TextAreaField
            id="description"
            label="Mô tả sản phẩm"
            errorMessage={errors.description?.message}
            register={{ ...register('description') }}
            // value = {description}
            required={true}
            placeholder="Nhập mô tả sản phẩm"
          />
        </div>
        <div className="mt-5 flex justify-end">
          <button
            className="mt-5 rounded bg-green-600 px-8 py-2 text-sm text-white"
            type="submit"
          >
            Save
          </button>
        </div>
        {/* <div className="mt-5 flex justify-end">
        <button
          className={`${
            isSubmitting
              ? 'cursor-not-allowed bg-green-500'
              : 'cursor-pointer bg-green-600 hover:bg-green-500'
          } rounded px-5 py-2 text-sm uppercase tracking-widest text-white`}
        >
          {isSubmitting ? (
            <p className="flex items-center justify-center gap-4">
              <FaSpinner className="animate-spin" />
              Loading...
            </p>
          ) : (
            'update mới sản phẩm'
          )}
        </button>
      </div> */}
      </form>
    </div>
  );
}

export default UpdateProductForm;
