import React, { useState } from 'react';
import { Form  } from 'react-bootstrap';
import AccountDeleteButton from '../../Buttons/AccountDeleteButton';
import {updateAccountNameById } from '../../../../functions/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faSackDollar} from '@fortawesome/free-solid-svg-icons';

export default function AccountRow({account, accounts, getAccounts, deleteAccount, index, isMobile}){
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
    await getAccounts();
  }

  if(!isMobile){
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
        <td>{account.balance}</td>
        <td style={{textAlign: "right"}}>
          <AccountDeleteButton 
            account={account} deleteAccount={deleteAccount}/>
        </td>
      </tr> 
    )
  } else {
    return (
      <div key={account.id} className={index !== accounts.length - 1 ? "mb-2" : ""}>
        <p className="d-flex justify-content-between">
          <span>
            {account.type === 'Cash' ? 
              <FontAwesomeIcon icon={faSackDollar} /> : 
              <FontAwesomeIcon icon={faSeedling} />
            } 
            &nbsp;{account.name}
          </span>
          <span>{account.totalBalance}</span>
        </p> 
      </div>
    )
  }

}