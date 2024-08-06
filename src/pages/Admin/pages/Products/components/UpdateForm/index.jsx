import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import InputField from '~/components/form-controls/InputField';
import SelectField from '~/components/form-controls/SelectField';
import { useEffect, useState } from 'react';
import categoryApi from '~/apis/categoryApi';
import CheckboxField from '~/components/form-controls/CheckboxField';
import { COLORS, SIZES } from '~/constants/variants';

UpdateProductForm.propTypes = {
  productDetail: PropTypes.object.isRequired,
};

function UpdateProductForm({ productDetail }) {
  // Fake dữ liệu Product Detail
  const fakeProductDetail = {
    name: 'Product 01',
    quantityDetails: [
      {
        color: 'Đen',
        sizes: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 10 },
          { size: 'XL', stock: 0 },
        ],
      },
      {
        color: 'Trắng',
        sizes: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 15 },
          { size: 'XL', stock: 20 },
        ],
      },
    ],
    totalQuantity: 55,
    originalPrice: 100,
    rating: 0,
    nrating: 0,
    comments: [{}],
    saleDiscountPercent: 10,
    finalPrice: 90,
    category: 'Quần short',
    brand: 'Floral',
    images: [],
  };

  const colours = fakeProductDetail.quantityDetails.map((item) => item.color);
  const sizes = [
    ...new Set(
      fakeProductDetail.quantityDetails.reduce((acc, detail) => {
        return acc.concat(detail.sizes.map((sizeDetail) => sizeDetail.size));
      }, []),
    ),
  ];

  const initialQuantities = fakeProductDetail.quantityDetails.flatMap(
    (detail) =>
      detail.sizes.map((sizeDetail) => ({
        color: detail.color,
        size: sizeDetail.size,
        quantity: sizeDetail.stock,
      })),
  );
  // ---------------------------

  const schema = yup.object().shape({});
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: fakeProductDetail.name,
      originalPrice: fakeProductDetail.originalPrice,
      saleDiscountPercent: fakeProductDetail.saleDiscountPercent,
      category: fakeProductDetail.category,
      colours,
      sizes,
    },
  });
  const [brandsList, setBrandsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [productQuantities, setProductQuantities] = useState(initialQuantities);
  useEffect(() => {
    (async () => {
      try {
        const categoryApiResponse = await categoryApi.getAll();
        const _categoryList = categoryApiResponse.filter(
          (_category) => _category.status !== 0,
        );

        setCategoriesList(_categoryList);

        // Cập nhật danh sách brand
        const position = _categoryList.findIndex(
          (_category) => _category.name === fakeProductDetail.category,
        );
        if (position !== -1) {
          setBrandsList(_categoryList[position].brands);
        }
      } catch (error) {
        // log error message
      }
    })();
  }, []);

  // Đặt giá trị mặc định cho category sau khi Categorieslist được tải xong
  useEffect(() => {
    if (categoriesList.length > 0) {
      setValue('category', fakeProductDetail.category);
      setValue('brand', fakeProductDetail.brand);
    }
  }, [categoriesList, setValue, fakeProductDetail.category]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const productColors = watch('colours') || [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const productSizes = watch('sizes') || [];

  const handleFormSubmit = async (data) => {
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

    const formData = new FormData();
    // for (let i = 0; i < productInfo.images.length; i++) {
    //   formData.append('images', productInfo.images[i]);
    // }
    formData.append(
      'productDtos',
      JSON.stringify({
        originalPrice: productInfo.originalPrice,
        saleDiscountPercent: productInfo.saleDiscountPercent,
        category: productInfo.category,
        description: productInfo.description,
        brand: productInfo.brand,
        name: productInfo.name,
        quantityDetails: quantityDetails,
      }),
    );

    console.log({
      originalPrice: productInfo.originalPrice,
      saleDiscountPercent: productInfo.saleDiscountPercent,
      category: productInfo.category,
      description: productInfo.description,
      brand: productInfo.brand,
      name: productInfo.name,
      quantityDetails: quantityDetails,
    });
    // if (onSubmit) {
    //   await onSubmit(formData);
    // }
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
        <InputField
          id="productName"
          label="Tên sản phẩm"
          placeholder="Nhập tên sản phẩm..."
          autofocus={true}
          register={{ ...register('name') }}
          errorMessage={errors.name?.errorMessage}
        />
        <InputField
          id="productPrice"
          label="Giá sản phẩm (chưa khuyến mãi)"
          placeholder="Nhập giá sản phẩm..."
          register={{ ...register('originalPrice') }}
          type="number"
          errorMessage={errors.originalPrice?.errorMessage}
        />
        <InputField
          id="productSaleDiscountPercent"
          label="Tỷ lệ khuyến mãi"
          placeholder="Nhập tỷ lệ khuyến mãi..."
          register={{ ...register('saleDiscountPercent') }}
          errorMessage={errors.saleDiscountPercent?.errorMessage}
        />
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

        <div className="flex basis-1/3 flex-col gap-1">
          <div className="flex flex-col gap-1 text-sm">
            <label className="w-fit" htmlFor="brand">
              Thương hiệu sản phẩm
            </label>
            <select
              {...register('brand')}
              className="border-gray w-full border border-solid px-3 py-2 text-sm outline-blue-500"
            >
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

        {productSizes.length > 0 && productColors.length > 0 && (
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
        <button
          className="mt-5 rounded bg-green-600 px-8 py-2 text-sm text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateProductForm;
