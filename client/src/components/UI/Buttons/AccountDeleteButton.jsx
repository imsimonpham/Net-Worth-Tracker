import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-bootstrap';
import { convertToFloat } from '../../../functions/utilities';

export default function AccountDeleteButton({account, deleteAccount}){
  const [show, setShow] = useState(false);
  const handleBalanceVerification = () => {
    if(convertToFloat(account.totalBalance) === 0)
      setShow(true);
    else 
      alert('The account must have a zero balance before it can be deleted.')
  }

  return (
    <div>   
      { 
        show
        ?
          <div className='d-flex'>
            <Button 
              className='btn btn-success me-2' 
              onClick={()=>deleteAccount(account.id)}>
              <FontAwesomeIcon icon={faCheck} style={{color: "#198754"}} />
            </Button>
            <Button 
              className='btn btn-danger' 
              onClick={() => setShow(false)}>
              <FontAwesomeIcon icon={faX} style={{color: '#F26B53'}}/>
            </Button>
          </div> 
        : 
          <Button 
            className='btn btn-danger' 
            onClick={handleBalanceVerification}>
            <FontAwesomeIcon icon={faTrash} style={{color: '#F26B53'}}/>
          </Button>
      }
    </div>
  )
}