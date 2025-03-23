import React from 'react';
import AccountTable from '../UI/Tables/Accounts/AccountTable';
import {deleteAccountById } from '../../functions/data';

export default function ManageAccountsForm ({accounts, setAccounts}) {
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