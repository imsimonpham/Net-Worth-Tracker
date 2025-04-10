import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import DividendForm from '../../Forms/DividendForm';

export default function DividendEditButton({dividend, holdings, getDividends}){
  const [activeModal, setActiveModal] = useState(null);
  
  const handleShow = (modalType) => setActiveModal(modalType);
  const handleClose = () => setActiveModal(null);

  return (
    <>
      <Button className='btn btn-primary me-3' onClick={()=>handleShow('Add Dividend')}>
        <FontAwesomeIcon icon={faPencil} style={{color: "#00aff5"}} />
      </Button>

      <Modal className='modal-container' show={activeModal !== null} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h5'>Edit dividend</Modal.Title>
          <Button className='btn btn-x' onClick={handleClose}>
            <FontAwesomeIcon icon={faX} style={{color: "#99999F"}}/>
          </Button>
        </Modal.Header>  
        <Modal.Body>
          <DividendForm handleClose={handleClose} dividend={dividend} holdings={holdings} getDividends={getDividends}/>
        </Modal.Body>
      </Modal>
    </> 
  )
}