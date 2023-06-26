import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { Transaction } from '../types/Transaction';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionService from '../services/TransactionService';

function TransactionDelete() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() =>{
    async function loadTransaction() {
      try {
        const id = parseInt(params.transactionId ?? '0');
        const transaction:Transaction = await TransactionService.getById(id);
        setTransaction(transaction);
      } catch (error) {
        console.log(error);
      }
    }
    loadTransaction();
  },[]);

  async function handleOnClickConfirm() {
    try {
      if (!transaction) {
        return;
      }

      await TransactionService.delete(transaction.id);
      setTransaction(transaction);
      navigate('/transactions');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal title="Excluir conta" confirmLabel="Excluir" cancelLabel="Cancelar" confirmFn={handleOnClickConfirm}>
      <h1>Você realmente deseja excluir a movimentação <span className="font-bold">&quot;{transaction?.title}&quot;</span>?</h1>
    </Modal>
  );
}

export default TransactionDelete;