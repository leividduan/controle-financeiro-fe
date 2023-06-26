import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import APIError from '../errors/APIError';
import useErrors from '../hooks/useErrors';
import AccountService from '../services/AccountService';
import { Account, AccountCreate } from '../types/Account';
import getCurrentUser from '../utils/getUser';

interface AccountSaveProp {
  isEdit: boolean
}

function AccountSave({isEdit}:AccountSaveProp) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setError, removeError, getErrorMessageByFieldName, errors } = useErrors();
  const params = useParams();
  const navigate = useNavigate();

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

  async function handleSubmit(event:React.SyntheticEvent<HTMLFormElement>) {
    try {
      if(!isFormValid) {
        return;
      }

      setIsSubmitting(true);
      event.preventDefault();
      const user = getCurrentUser();
   
      const account: AccountCreate = {
        name,
        is_active: true,
        id_user: user.id
      };

      if (isEdit) {
        const id = parseInt(params.accountId ?? '0');
        await AccountService.editAccount(account, id);
      } else {
        await AccountService.createAccount(account);
      }
      navigate('/accounts');
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
      async function loadAccount() {
        try {
          const id = parseInt(params.accountId ?? '0');
          const account:Account = await AccountService.getById(id);
          setName(account.name);
        } catch (error) {
          console.log(error);
        }
      }
      loadAccount();
      setIsLoading(false);
    },[]);
  }


  return (
    <Modal title={isEdit ? 'Editar conta' : 'Criar conta'} confirmLabel="Salvar" cancelLabel="Fechar" formFor="accountForm">
      <form id="accountForm" className="space-y-4" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome</label>
          <Input 
            type="name" 
            name="name" 
            id="name" 
            placeholder="Ex: Carteira ou Banco X" 
            required
            value={name}
            onChange={handleNameChange} 
            error={getErrorMessageByFieldName('name')}
            disabled={isLoading && !isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AccountSave;