import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import IEPopupForm from '../../Forms/IEPopupForm';
import TransferPopupForm from '../../Forms/TransferPopupForm';

export default function TransEditButton({transaction, getTransactions, accounts, getAccounts, isMobile}){
  const [activeModal, setActiveModal] = useState(null);
  
  const handleShow = (modalType) => setActiveModal(modalType);
  const handleClose = () => setActiveModal(null);

  return (
    <>
      <Button 
        className={isMobile ? 'btn btn-primary me-1' : 'btn btn-primary me-3'} 
        onClick={()=>handleShow(transaction.transType)}>
        <FontAwesomeIcon icon={faPencil} style={{color: "#00aff5"}} />
      </Button>

      <Modal className='modal-container' show={activeModal !== null} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h5'>Edit transaction</Modal.Title>
          <Button className='btn btn-x' onClick={handleClose}>
            <FontAwesomeIcon icon={faX} style={{color: "#99999F"}}/>
          </Button>
        </Modal.Header>
        
        <Modal.Body>
          {
            (activeModal === 'Income' || activeModal === 'Expense' || activeModal === 'Investment') && 
            <IEPopupForm 
              handleClose={handleClose} 
              transaction={transaction}  getTransactions={getTransactions}
              accounts={accounts} getAccounts={getAccounts}
            />
          }
          {
            activeModal === 'Transfer' && 
            <TransferPopupForm 
              handleClose={handleClose} 
              transaction={transaction} getTransactions={getTransactions}
              accounts={accounts} getAccounts={getAccounts}
            />
          }
        </Modal.Body>
      </Modal>
    </> 
  )
}