import { TiEdit } from 'react-icons/ti';
import { MdDeleteOutline } from 'react-icons/md';
import { useState } from 'react';
import ProductItem from '../ProductItem';

function TableBody() {
  const [productsList, setProductsList] = useState([
    {
      id: 1,
      img: `https://firebasestorage.googleapis.com/v0/b/ecommerce-website-5ff4a.appspot.com/o/product_images%2Fproduct04.png?alt=media&token=a51497fc-4824-4523-9101-fe19ac47025f`,
      name: `ASUS FHD Gaming Laptop ASUS FHD Gaming Laptop ASUS FHD Gaming Laptop
          ASUS FHD Gaming Laptop`,
      price: 5000000,
      salePercent: 0,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum`,
      status: true,
    },
    {
      id: 2,
      img: `https://firebasestorage.googleapis.com/v0/b/ecommerce-website-5ff4a.appspot.com/o/product_images%2Fproduct01.png?alt=media&token=527fbc62-8677-4cb1-b00c-0d149f9c3631`,
      name: `HAVIT HV-G92 Gamepad`,
      price: 5000000,
      salePercent: 10,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum`,
      status: false,
    },
  ]);
  return (
    <div className="shadow-table w-full py-2">
      {productsList.map((productItem, index) => (
        <div
          key={productItem.id}
          className={`${index < productsList.length - 1 ? 'border-gray border-b border-solid' : ''}`}
        >
          <ProductItem
            productId={productItem.id}
            productImg={productItem.img}
            productName={productItem.name}
            productPrice={productItem.price}
            productSalePercent={productItem.salePercent}
            productDescription={productItem.description}
            productStatus={productItem.status}
          />
        </div>
      ))}
    </div>
  );
}

export default TableBody;
