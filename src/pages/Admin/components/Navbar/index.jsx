import { NavLink } from 'react-router-dom';

const NavList = [
  {
    id: '1',
    name: 'Thống kê doanh thu',
    path: '/',
  },
  {
    id: '2',
    name: 'Kho hàng',
    path: '/warehouse',
  },
  {
    id: '3',
    name: 'Loại sản phẩm',
    path: '/categories',
  },
  {
    id: '4',
    name: 'Thương hiệu Hợp Tác',
    path: '/tradeMask',
  },
  {
    id: '5',
    name: 'Sản phẩm',
    children: [
      {
        id: '5.1',
        path: '/product',
        name: 'Danh sách sản phẩm',
      },
      {
        id: '5.2',
        path: '/product/create_product',
        name: 'Thêm sản phẩm',
      },
    ],
  },

  {
    id: '6',
    name: 'Đơn hàng',
    children: [
      { id: '6.1', path: '/orders/', name: 'Danh sách đơn hàng' },
      {
        id: '6.2',
        path: '/orders/received',
        name: 'Đơn hàng đã giao',
      },
      { id: '6.3', path: '/orders/delivering', name: 'Đơn hàng đang giao' },
      { id: '6.4', path: '/orders/cancelled', name: 'Đơn hàng đã hủy' },
    ],
  },
  {
    id: '7',
    name: 'Hỗ trợ khách hàng',
    children: [
      {
        id: '7.1',
        name: 'Tin nhắn',
        path: '/support/message',
      },
      {
        id: '7.2',
        name: 'Q&A',
        path: '/support/qa',
      },
    ],
  },
];

function Navbar() {
  return (
    <nav className="my-8">
      <ul className="text-sm">
        {NavList.map((navItem) => {
          if (navItem.children) {
            return (
              <li className="mb-1 p-2" key={navItem.id}>
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
            <li className="mb-1" key={navItem.id}>
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
