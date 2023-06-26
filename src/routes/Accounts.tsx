import Title from '../components/Title';
import { Account, AccountList } from '../types/Account';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import AccountService from '../services/AccountService';

export async function loader() {
  const accounts = (await AccountService.get() as AccountList).data;
  return accounts;
}

function Accounts() {
  const accounts = useLoaderData() as Account[];

  return (
    <>
      <div className={`flex items-center justify-${accounts.length === 0 ? 'center' : 'between mb-4'}`}>
        {!!accounts.length && (
          <Title>
            Você possui {accounts.length} {accounts.length === 1 ? 'conta' : 'contas'}
          </Title>
        )}
        <Link to="/accounts/new" type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-primary-400 disabled:cursor-not-allowed">Nova conta</Link>
      </div>

      {!!accounts.length && (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {accounts?.map((account) => {
                return (
                  <li className="py-3 sm:py-4" key={account.id}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {account.name}
                        </p>
                      </div>
                      <Link to={`/accounts/${account.id}/edit`} className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-primary-500 md:hover:text-primary-900 md:hover:bg-transparent">
                        editar
                      </Link>
                      <Link to={`/accounts/${account.id}/delete`} className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-primary-500 md:hover:text-red-900 md:hover:bg-transparent">
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
 
export default Accounts;