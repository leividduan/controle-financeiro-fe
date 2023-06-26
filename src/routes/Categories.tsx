import Title from '../components/Title';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import CategoryService from '../services/CategoryService';
import { Category, CategoryList } from '../types/Category';

export async function loader() {
  const categories = (await CategoryService.get() as CategoryList).data;
  return categories;
}

function Categories() {
  const categories = useLoaderData() as Category[];

  return (
    <>
      <div className={`flex items-center justify-${categories.length === 0 ? 'center' : 'between mb-4'}`}>
        {!!categories.length && (
          <Title>
            Você possui {categories.length} {categories.length === 1 ? 'categoria' : 'categorias'}
          </Title>
        )}
        <Link to="/categories/new" type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-primary-400 disabled:cursor-not-allowed">Nova categoria</Link>
      </div>

      {!!categories.length && (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories?.map((category) => {
                return (
                  <li className="py-3 sm:py-4" key={category.id}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {category.name}
                          {category.type === 'EXPENSE' ? <small className="ml-3 text-red-700">despesa</small> : <small className="ml-3 text-green-700">receita</small>}
                          
                        </p>
                      </div>
                      <Link to={`/categories/${category.id}/edit`} className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-primary-500 md:hover:text-primary-900 md:hover:bg-transparent">
                        editar
                      </Link>
                      <Link to={`/categories/${category.id}/delete`} className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-primary-500 md:hover:text-red-900 md:hover:bg-transparent">
                        excluir
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}
 
export default Categories;