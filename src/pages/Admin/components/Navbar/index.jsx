import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const NavList = [
  {
    name: 'Thống kê doanh thu',
    path: '/',
  },
  {
    name: 'Loại sản phẩm',
    path: '/categories',
  },
  {
    name: 'Thương hiệu Hợp Tác',
    path: '/tradeMask',
  },
  {
    name: 'Phong cách',
    path: '/style',
  },
  {
    name: 'Chất liệu',
    path: '/material',
  },
  {
    name: 'Sản phẩm',
    children: [
      {
        path: '/product',
        name: 'Danh sách sản phẩm',
      },
      {
        path: '/product/create_product',
        name: 'Thêm sản phẩm',
      },
    ],
  },

  {
    name: 'Đơn hàng',
    children: [
      { path: '/orders/', name: 'Danh sách đơn hàng' },
      { path: '/orders/cancelled', name: 'Đơn hàng đã hủy' },
    ],
  },
  {
    name: 'Hỗ trợ khách hàng',
    children: [
      {
        name: 'Q&A',
        path: '/support/qa',
      },
    ],
  },
];

function Navbar() {
  return (
    <nav>
      <ul className="text-sm">
        {/* {NavList.map((navItem) => {
          if (navItem.children) {
            return (
              <li className="mb-1 p-2" key={uuidv4()}>
                <span className="font-medium uppercase">{navItem.name}</span>
                <ul className="pl-5">
                  {navItem.children.map((navChildrenItem) => (
                    <li key={uuidv4()} className="my-1">
                      <NavLink
                        to={navChildrenItem.path}
                        className={({ isActive }) =>
                          `${isActive ? 'bg-white text-[#2c2c2c]' : 'hover:bg-white hover:text-[#2c2c2c]'} block cursor-pointer px-4 py-2 transition-all`
                        }
                        end
                      >
                        {navChildrenItem.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }
          return (
            <li className="mb-1" key={uuidv4()}>
              <NavLink
                to={navItem.path}
                className={({ isActive }) =>
                  `${isActive ? 'bg-white text-[#2c2c2c]' : 'hover:bg-white hover:text-[#2c2c2c]'} block cursor-pointer p-2 font-medium uppercase transition-all`
                }
                end
              >
                {navItem.name}
              </NavLink>
            </li>
          );
        })} */}
      </ul>
    </nav>
  );
}

export default Navbar;
