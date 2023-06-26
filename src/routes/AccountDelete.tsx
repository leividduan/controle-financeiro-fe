import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { Account } from '../types/Account';
import { useNavigate, useParams } from 'react-router-dom';
import AccountService from '../services/AccountService';

function AccountDelete() {
  const [account, setAccount] = useState<Account | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() =>{
    async function loadAccount() {
      try {
        const id = parseInt(params.accountId ?? '0');
        const account:Account = await AccountService.getById(id);
        setAccount(account);
      } catch (error) {
        console.log(error);
      }
    }
    loadAccount();
  },[]);

  async function handleOnClickConfirm() {
    try {
      if (!account) {
        return;
      }

      await AccountService.delete(account.id);
      setAccount(account);
      navigate('/accounts');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal title="Excluir conta" confirmLabel="Excluir" cancelLabel="Cancelar" confirmFn={handleOnClickConfirm}>
      <h1>Você realmente deseja excluir a conta <span className="font-bold">&quot;{account?.name}&quot;</span>?</h1>
    </Modal>
  );
}

export default AccountDelete;