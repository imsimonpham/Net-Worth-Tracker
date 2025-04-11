import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import HoldingForm from '../../Forms/HoldingForm';

export default function HoldingEditButton({holding, holdings, getHoldings, accounts, getAccounts, marketData}){
  const [activeModal, setActiveModal] = useState(null);
  
  const handleShow = (modalType) => setActiveModal(modalType);
  const handleClose = () => setActiveModal(null);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isEditing, setIsEditing] = useState(true);

  return (
    <>
      <Button className='btn btn-primary me-3' onClick={()=>handleShow('Holdings')}>
        <FontAwesomeIcon icon={faPencil} style={{color: "#00aff5"}} />
      </Button>

      <Modal className='modal-container' show={activeModal !== null} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h5'>Edit Holding</Modal.Title>
          <Button className='btn btn-x' onClick={handleClose}>
            <FontAwesomeIcon icon={faX} style={{color: "#99999F"}}/>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <HoldingForm 
            handleClose={handleClose} holding={holding} 
            getHoldings={getHoldings} holdings={holdings}
            marketData={marketData} getAccounts={getAccounts}
            accounts={accounts} isReadOnly={isReadOnly} isEditing={isEditing}/>
        </Modal.Body>
      </Modal>
    </> 
  )
}