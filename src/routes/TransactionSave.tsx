import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import Input from '../components/Input';
import APIError from '../errors/APIError';
import useErrors from '../hooks/useErrors';
import { Transaction, TransactionCreate } from '../types/Transaction';
import TransactionService from '../services/TransactionService';
import CategoryService from '../services/CategoryService';
import { Category } from '../types/Category';
import { Account } from '../types/Account';
import AccountService from '../services/AccountService';

export async function loader({params}:LoaderFunctionArgs) {
  try {
    let transaction: Transaction | null = null;
    const id = parseInt(params.transactionId ?? '0');
    if (id) {
      transaction = await TransactionService.getById(id);
    }

    const categoriesList = (await CategoryService.get()).data;
    const accountsList = (await AccountService.get()).data;

    return { transaction, categoriesList, accountsList };
  } catch (error) {
    console.log(error);
  }
}

export async function action({ params, request }:ActionFunctionArgs) {
  try {
    const transaction = Object.fromEntries(await request.formData()) as unknown as TransactionCreate;

    const id = parseInt(params.transactionId ?? '0');
    if (id) {
      await TransactionService.editTransaction(transaction, id);
    } else {
      await TransactionService.createTransaction(transaction);
    }

    return redirect('/transactions');
  } catch (error) {
    if(error instanceof APIError){
      console.log(error);
    }
  }
}

export interface LoaderTransaction {
  transaction: Transaction,
  categoriesList: Category[],
  accountsList: Account[]
}

interface TransactionSaveProp {
  isEdit: boolean
}

function TransactionsSave({isEdit}:TransactionSaveProp) {
  const { transaction, categoriesList, accountsList } = useLoaderData() as LoaderTransaction;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState(0);
  const [account, setAccount] = useState(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(isEdit);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

  const isFormValid = title && errors.length === 0;

  useEffect(() => {
    setCategories(categoriesList);
    setAccounts(accountsList);
  },[]);

  function handleNameChange(event:React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'title', message: 'Campo obrigatório.' });
    } else if (event.currentTarget.value && event.currentTarget.value.length > 150) {
      setError({ field: 'title', message: 'Campo maior que o permitido.' });
    } else {
      removeError('title');
    }

    setTitle(event.currentTarget.value);
  }

  function handleDescriptionChange(event:React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'description', message: 'Campo obrigatório.' });
    } else if (event.currentTarget.value && event.currentTarget.value.length > 150) {
      setError({ field: 'description', message: 'Campo maior que o permitido.' });
    } else {
      removeError('description');
    }

    setDescription(event.currentTarget.value);
  }

  function handleAmountChange(event:React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'amount', message: 'Campo obrigatório.' });
    } else {
      removeError('amount');
    }

    setAmount(parseInt(event.currentTarget.value));
  }

  function handleAccountChange(event:React.FormEvent<HTMLSelectElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'type', message: 'Campo obrigatório.' });
    } else {
      removeError('account');
    }

    setAccount(parseInt(event.currentTarget.value));
  }

  function handleCategoryChange(event:React.FormEvent<HTMLSelectElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'type', message: 'Campo obrigatório.' });
    } else {
      removeError('category');
    }

    setCategory(parseInt(event.currentTarget.value));
  }
  
  if (isEdit) {
    useEffect(() =>{
      setTitle(transaction.title);
      setDescription(transaction.description);
      setAmount(transaction.value);
      setCategory(transaction.id_category);
      setAccount(transaction.id_account);
      setIsLoading(false);
    },[]);
  }


  return (
    <Modal title={isEdit ? 'Editar movimentação' : 'Criar movimentação'} confirmLabel="Salvar" cancelLabel="Fechar" formFor="transactionForm" cancelTo="/transactions" disableConfirmBtn={!isFormValid}>
      <Form id="transactionForm" className="space-y-4" noValidate method="post">
        <div>
          <label htmlFor="account" className="block mb-2 text-sm font-medium text-gray-900">Conta</label>
          <select
            className="bg-gray-50 focus:outline-primary-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 disabled:text-gray-400"
            name="id_account" 
            id="account" 
            required
            value={account}
            onChange={handleAccountChange} 
            disabled={isLoading}
          >
            <option value="">Selecione</option>
            {accounts.map((account) => {
              return <option key={account.id} value={account.id}>{account.name}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Categoria</label>
          <select
            className="bg-gray-50 focus:outline-primary-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 disabled:text-gray-400"
            name="id_category" 
            id="category" 
            required
            value={category}
            onChange={handleCategoryChange} 
            disabled={isLoading}
          >
            <option value="">Selecione</option>
            {categories.map((category) => {
              return <option key={category.id} value={category.id}>{category.name}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
          <Input 
            type="text" 
            name="title" 
            id="title" 
            placeholder="Ex: Supermercado ou Cuidados pessoais" 
            required
            value={title}
            onChange={handleNameChange} 
            error={getErrorMessageByFieldName('title')}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
          <Input 
            type="text" 
            name="description" 
            id="description" 
            placeholder="Ex: Despesa criada para gastos com mercado em geral." 
            required
            value={description}
            onChange={handleDescriptionChange} 
            error={getErrorMessageByFieldName('description')}
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Valor</label>
          <Input 
            type="number"
            min="1"
            step="any"
            name="value" 
            id="amount" 
            placeholder="Ex: Despesa criada para gastos com mercado em geral." 
            required
            value={amount.toString()}
            onChange={handleAmountChange} 
            error={getErrorMessageByFieldName('amount')}
            disabled={isLoading}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default TransactionsSave;