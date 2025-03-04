import React, {useState, useEffect} from 'react';
import AccountTable from '../Tables/AccountTable';
import { getAccounts, deleteAccountById } from '../../functions/data';


export default function ManageAccountsForm () {
  //fetch accounts
  const [accounts, setAccounts] = useState([]);
  const loadAccounts = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts);
  };
    
  useEffect(()=> {
    loadAccounts();
  }, []);

  //delete accounts
  const deleteAccount = async (id) => {
    const deleteAcct = await deleteAccountById(id);
    setAccounts(accounts.filter(
      account => account.id !== id
    ));
  }
  
  return (
    <div className="section-primary">
      <AccountTable accounts={accounts} deleteAccount={deleteAccount}/>
    </div>
  )
}