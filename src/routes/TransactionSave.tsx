import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import APIError from '../errors/APIError';
import useErrors from '../hooks/useErrors';
import getCurrentUser from '../utils/getUser';
import { Transaction, TransactionCreate } from '../types/Transaction';
import TransactionService from '../services/TransactionService';
import CategoryService from '../services/CategoryService';
import { Category } from '../types/Category';
import { Account } from '../types/Account';
import AccountService from '../services/AccountService';

interface TransactionSaveProp {
  isEdit: boolean
}

function TransactionsSave({isEdit}:TransactionSaveProp) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState(0);
  const [account, setAccount] = useState(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();
  const params = useParams();
  const navigate = useNavigate();

  const isFormValid = title && errors.length === 0;

  useEffect(() =>{
    async function loadDependencies() {
      try {
        const categoriesList = (await CategoryService.get()).data;
        console.log(categoriesList);
        
        setCategories(categoriesList);

        const accountsList = (await AccountService.get()).data;
        setAccounts(accountsList);
      } catch (error) {
        console.log(error);
      }
    }
    loadDependencies();
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

  async function handleSubmit(event:React.SyntheticEvent<HTMLFormElement>) {
    try {
      if(!isFormValid) {
        return;
      }

      setIsSubmitting(true);
      event.preventDefault();
      const user = getCurrentUser();
      
      const transaction: TransactionCreate = {
        title,
        description,
        value: amount,
        id_account: account,
        id_category: category
      };

      if (isEdit) {
        const id = parseInt(params.transactionId ?? '0');
        await TransactionService.editTransaction(transaction, id);
      } else {
        await TransactionService.createTransaction(transaction);
      }
      navigate('/transactions');
      setIsSubmitting(false);
      
    } catch (err) {
      if(err instanceof APIError){
        console.log(err);
        
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (isEdit) {
    useEffect(() =>{
      async function loadTransaction() {
        try {
          const id = parseInt(params.transactionId ?? '0');
          const transaction:Transaction = await TransactionService.getById(id);
          setTitle(transaction.title);
          setDescription(transaction.description);
          setAmount(transaction.value);
          setCategory(transaction.id_category);
          setAccount(transaction.id_account);
        } catch (error) {
          console.log(error);
        }
      }
      loadTransaction();
      setIsLoading(false);
    },[]);
  }


  return (
    <Modal title={isEdit ? 'Editar movimentação' : 'Criar movimentação'} confirmLabel="Salvar" cancelLabel="Fechar" formFor="transactionForm">
      <form id="transactionForm" className="space-y-4" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="account" className="block mb-2 text-sm font-medium text-gray-900">Conta</label>
          <select
            className="bg-gray-50 focus:outline-primary-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 disabled:text-gray-400"
            name="account" 
            id="account" 
            required
            value={account}
            onChange={handleAccountChange} 
            disabled={isLoading && !isSubmitting}
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
            name="category" 
            id="category" 
            required
            value={category}
            onChange={handleCategoryChange} 
            disabled={isLoading && !isSubmitting}
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
            type="title" 
            name="title" 
            id="title" 
            placeholder="Ex: Supermercado ou Cuidados pessoais" 
            required
            value={title}
            onChange={handleNameChange} 
            error={getErrorMessageByFieldName('title')}
            disabled={isLoading && !isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Descrição</label>
          <Input 
            type="description" 
            name="description" 
            id="description" 
            placeholder="Ex: Despesa criada para gastos com mercado em geral." 
            required
            value={description}
            onChange={handleDescriptionChange} 
            error={getErrorMessageByFieldName('description')}
            disabled={isLoading && !isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Valor</label>
          <Input 
            type="number"
            min="1"
            step="any"
            name="amount" 
            id="amount" 
            placeholder="Ex: Despesa criada para gastos com mercado em geral." 
            required
            value={amount.toString()}
            onChange={handleAmountChange} 
            error={getErrorMessageByFieldName('amount')}
            disabled={isLoading && !isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
}

export default TransactionsSave;