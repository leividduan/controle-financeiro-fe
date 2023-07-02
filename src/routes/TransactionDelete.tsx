import Modal from '../components/Modal';
import { ActionFunctionArgs, Form, redirect, useLoaderData } from 'react-router-dom';
import TransactionService from '../services/TransactionService';
import APIError from '../errors/APIError';
import { LoaderTransaction } from './TransactionSave';

export async function action({ params }:ActionFunctionArgs) {
  try {
    const id = parseInt(params.transactionId ?? '0');
    if (id) {
      await TransactionService.delete(id);
    }
    return redirect('/transactions');
  } catch (error) {
    if(error instanceof APIError){
      console.log(error);
    }
  }
}

function TransactionDelete() {
  const {transaction} = useLoaderData() as LoaderTransaction;

  return (
    <Modal title="Excluir conta" confirmLabel="Excluir" cancelLabel="Cancelar" formFor="deleteAccount">
      <Form id="deleteAccount" noValidate method="post">
        <h1>Você realmente deseja excluir a movimentação <span className="font-bold">&quot;{transaction.title}&quot;</span>?</h1>
      </Form>
    </Modal>
  );
}

export default TransactionDelete;