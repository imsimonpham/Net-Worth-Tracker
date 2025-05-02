import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import IEPopupForm from '../../Forms/IEPopupForm';

export default function TransEditButton({transaction, getTransactions, isMobile}){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button 
        className={isMobile ? 'btn btn-primary me-1' : 'btn btn-primary me-3'} 
        onClick={handleShow}>
        <FontAwesomeIcon icon={faPencil} style={{color: "#00aff5"}} />
      </Button>

      <Modal className='modal-container' show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h5'>Edit Transaction</Modal.Title>
          <Button className='btn btn-x' onClick={handleClose}>
            <FontAwesomeIcon icon={faX} style={{color: "#99999F"}}/>
          </Button>
        </Modal.Header>
        
        <Modal.Body>
          <IEPopupForm 
            handleClose={handleClose} 
            transaction={transaction}  getTransactions={getTransactions}
          />
        </Modal.Body>
      </Modal>
    </> 
  )
}