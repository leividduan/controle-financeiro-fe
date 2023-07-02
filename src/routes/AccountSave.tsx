import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import Input from '../components/Input';
import useErrors from '../hooks/useErrors';
import AccountService from '../services/AccountService';
import { Account, AccountCreate } from '../types/Account';
import getCurrentUser from '../utils/getUser';
import APIError from '../errors/APIError';

export async function loader({params}:any) {
  try {
    const id = parseInt(params.accountId ?? '0');
    if (id) {
      const account:Account = await AccountService.getById(id);
      return account;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function action({ params, request }:any) {
  try {
    const user = getCurrentUser();
    const formData = await request.formData();

    const account: AccountCreate = {
      name: formData.get('name'),
      is_active: true,
      id_user: user.id
    };
  
    const id = parseInt(params.accountId ?? '0');
    if (id) {
      await AccountService.editAccount(account, id);
    } else {
      await AccountService.createAccount(account);
    }
    return redirect('/accounts');
  } catch (error) {
    if(error instanceof APIError){
      console.log(error);
    }
  }
}

interface AccountSaveProp {
  isEdit: boolean
}

function AccountSave({isEdit}:AccountSaveProp) {
  const account = useLoaderData() as Account;
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(isEdit);
  const {setError, removeError, getErrorMessageByFieldName, errors } = useErrors();

  const isFormValid = name && errors.length === 0;

  function handleNameChange(event:React.FormEvent<HTMLInputElement>) {
    if (!event.currentTarget.value) {
      setError({ field: 'name', message: 'Campo obrigatório.' });
    } else if (event.currentTarget.value && event.currentTarget.value.length > 150) {
      setError({ field: 'name', message: 'Campo maior que o permitido.' });
    } else {
      removeError('name');
    }

    setName(event.currentTarget.value);
  }
 
  if (isEdit) {
    useEffect(() => {
      if (account) {
        setName(account.name);
        setIsLoading(false);
      }
    }, []);
  }


  return (
    <Modal title={isEdit ? 'Editar conta' : 'Criar conta'} confirmLabel="Salvar" cancelLabel="Fechar" formFor="accountForm" cancelTo="/accounts" disableConfirmBtn={!isFormValid}>
      <Form id="accountForm" className="space-y-4" noValidate method="post">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
          <Input 
            type="text" 
            name="name" 
            id="name" 
            placeholder="Ex: Carteira ou Banco X" 
            required
            value={name}
            onChange={handleNameChange} 
            error={getErrorMessageByFieldName('name')}
            disabled={isLoading}
          />
        </div>
      </Form>
    </Modal>
  );
}

export default AccountSave;