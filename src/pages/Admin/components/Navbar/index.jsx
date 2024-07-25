import { NavLink } from 'react-router-dom';

const NavList = [
  {
    id: '1',
    path: '/',
    name: 'Dashboard',
  },
  {
    id: '5',
    name: 'Kho hàng',
    path: '/warehouse',
  },
  {
    id: '2',
    name: 'Sản phẩm',
    children: [
      {
        id: '2.1',
        path: '/products/',
        name: 'Danh sách sản phẩm',
      },
      {
        id: '2.2',
        path: '/products/create',
        name: 'Tạo mới sản phẩm',
      },
    ],
  },
  {
    id: '3',
    name: 'Loại sản phẩm',
    children: [
      { id: '3.1', path: '/categories/', name: 'Danh sách loại sản phẩm' },
      { id: '3.2', path: '/categories/create', name: 'Thêm mới loại sản phẩm' },
    ],
  },
  {
    id: '4',
    name: 'Đơn hàng',
    children: [
      { id: '4.1', path: '/orders/', name: 'Danh sách đơn hàng' },
      {
        id: '4.2',
        path: '/orders/received',
        name: 'Đơn hàng đã giao thành công',
      },
      { id: '4.3', path: '/orders/delivering', name: 'Đơn hàng đang giao' },
      { id: '4.4', path: '/orders/cancelled', name: 'Đơn hàng đã hủy' },
    ],
  },
];

function Navbar() {
  return (
    <nav className="my-10">
      <ul>
        {NavList.map((navItem) => {
          if (navItem.children) {
            return (
              <li className="p-2" key={navItem.id}>
                <span className="font-medium uppercase">{navItem.name}</span>
                <ul className="pl-5">
                  {navItem.children.map((navChildrenItem) => (
                    <li key={navChildrenItem.id} className="my-1">
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
            <li key={navItem.id}>
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
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
