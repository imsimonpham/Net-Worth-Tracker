import React, {useState, useEffect} from 'react';
import AccountTable from '../Tables/AccountTable';
import { getAccounts, API_BASE_URL } from '../../functions/data';


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
  const deleteAccount = async(id)=> {
    try {
      const deleteAcct = await fetch(
        `${API_BASE_URL}/accounts/${id}`, {
          method: 'DELETE', 
        }
      )

      setAccounts(accounts.filter(
        account => account.id !== id
      ));
    } catch (err){
      console.error(err.message);
    }
  }
  
  return (
    <div className="section-primary">
      <AccountTable accounts={accounts} deleteAccount={deleteAccount}/>
    </div>
  )
}