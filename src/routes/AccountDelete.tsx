import Modal from '../components/Modal';
import { Account } from '../types/Account';
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import AccountService from '../services/AccountService';
import APIError from '../errors/APIError';

export async function action({ params }:any) {
  try {
    const id = parseInt(params.accountId ?? '0');
    if (id) {
      await AccountService.delete(id);
    }
    return redirect('/accounts');
  } catch (error) {
    if(error instanceof APIError){
      console.log(error);
    }
  }
}

function AccountDelete() {
  const account = useLoaderData() as Account;

  return (
    <Modal title="Excluir conta" confirmLabel="Excluir" cancelLabel="Cancelar" formFor="deleteAccount">
      <Form id="deleteAccount" noValidate method="post">
        <h1>Você realmente deseja excluir a conta <span className="font-bold">&quot;{account?.name}&quot;</span>?</h1>
      </Form>
    </Modal>
  );
}

export default AccountDelete;