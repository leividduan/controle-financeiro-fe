import { Link, useLocation } from 'react-router-dom';

function Header() {
  const menus = [
    {
      text: 'início',
      to: '/'
    },
    {
      text: 'contas',
      to: '/accounts'
    },
    {
      text: 'categorias',
      to: '/categories'
    },
    {
      text: 'movimentações',
      to: '/transactions'
    },
  ];
  const location = useLocation();
  return (
    <>
      <nav className="bg-primary-100 sticky w-full shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {menus.map((menu) => {
              return (
                <li key={menu.text}>
                  <Link to={menu.to} className={`block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-primary-${location.pathname === menu.to ? '700' : '500'} md:hover:text-primary-900 md:hover:bg-transparent`}>{menu.text}</Link>
                </li>
              );
            }) }
          </ul>
        </div>
      </nav>
    </>
  );
}
 
export default Header;