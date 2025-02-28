import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import AccountDeleteButton from '../Buttons/AccountDeleteButton';
import {updateAccountNameById } from '../../functions/data';

export default function AccountRow({account, deleteAccount}){
  //variables
  const [isEditing, setIsEditing] = useState(false);
  const [accountName, setAccountName] = useState(account.name);

  // handle variable change
  const handleEditClick = () => setIsEditing(true);
  const accountNameChange = (e) => setAccountName(e.target.value);
  const handleBlur = (e) => {
    setAccountName(e.target.value);
    updateAccountName(account.id);
    setIsEditing(false);
  }

  const updateAccountName = async (id) => {
    const body = {name: accountName}
    if(!accountName) {
      setAccountName(account.name); 
      return;
    } 
    const account = await updateAccountNameById(id, body);
  }

  return (
    <tr>
      <td>
        {
          isEditing ? 
          (
            <Form.Control 
              type="text" 
              autoFocus
              value={accountName}
              onChange={accountNameChange}
              onBlur={handleBlur}
            />        
          ) : (  
            <span 
              onClick={handleEditClick} 
              style={{cursor: "pointer", display: "inline-block",}}>{accountName}
            </span>
          )
        }
      </td>
      <td>{account.type}</td>
      <td>{account.cashBalance}</td>
      <td>{account.investmentBalance}</td>
      <td>{account.totalBalance}</td>
      <td style={{textAlign: "right"}}>
        <AccountDeleteButton 
          account={account} deleteAccount={deleteAccount}/>
      </td>
    </tr>
  )
}