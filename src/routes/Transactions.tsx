import Title from '../components/Title';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Transaction, TransactionList } from '../types/Transaction';
import TransactionService from '../services/TransactionService';

export async function loader() {
  const transactions = (await TransactionService.get() as TransactionList).data;
  return transactions;
}

function Transactions() {
  const transactions = useLoaderData() as Transaction[];

  return (
    <>
      <div className={`flex items-center justify-${transactions.length === 0 ? 'center' : 'between mb-4'}`}>
        {!!transactions.length && (
          <Title>
            Você possui {transactions.length} {transactions.length === 1 ? 'movimentação' : 'movimentações'}
          </Title>
        )}
        <Link to="/transactions/new" type="submit" className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-primary-400 disabled:cursor-not-allowed">Nova movimentação</Link>
      </div>

      {!!transactions.length && (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions?.map((transaction) => {
                return (
                  <li className="py-1" key={transaction.id}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {transaction.title}
                          <small className="ml-3 text-primary-700">R$ {transaction.value}</small>
                        </p>
                      </div>
                      <Link to={`/transactions/${transaction.id}/edit`} className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-primary-500 md:hover:text-primary-900 md:hover:bg-transparent">
                        editar
                      </Link>
                      <Link to={`/transactions/${transaction.id}/delete`} className="block py-2 pl-3 pr-4 rounded md:border-0 md:p-0 text-primary-500 md:hover:text-red-900 md:hover:bg-transparent">
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
 
export default Transactions;