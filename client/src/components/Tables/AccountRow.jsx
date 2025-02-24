import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import AccountDeleteButton from '../Buttons/AccountDeleteButton';

export default function AccountRow({account, deleteAccount}){
  //variables
  const [isEditing, setIsEditing] = useState(false);
  const [accountName, setAccountName] = useState(account.name);

  // handle variable change
  const handleEditClick = () => setIsEditing(true);
  const accountNameChange = (e) => setAccountName(e.target.value);
  const handleBlur = (e) => {
    setAccountName(e.target.value);
    updateAccount(account.id);
    setIsEditing(false);
  }

  const updateAccount = async (id) => {
    try {
      const body = {name: accountName}
      if(!accountName) {
        setAccountName(account.name); 
        return;
      } 
      const res = await fetch (
        `http://localhost:5000/accounts/${id}`, {
          method: 'PUT', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        }
      )
    } catch (err) {
      console.error(err.message);
    }
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
      <td>{account.balance}</td>
      <td style={{textAlign: "right"}}>
        <AccountDeleteButton 
          account={account} deleteAccount={deleteAccount}/>
      </td>
    </tr>
  )
}