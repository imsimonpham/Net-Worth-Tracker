import { useState  } from 'react';
import {Button, Modal, Accordion} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faDollarSign, faUserGear} from '@fortawesome/free-solid-svg-icons';
import IEPopupForm from '../Forms/IEPopupForm';

export default function Popup({getTransactions, isMobile}){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="popup">
      <Button
        style={{ width: '40px', height: '40px', right: isMobile ? '3.3%' : '1.7%'}}
        className='btn btn-transaction btn-fixed mb-3'
        onClick={handleShow}
        >
        <FontAwesomeIcon icon={faDollarSign} />
      </Button>

      <Modal 
        className='modal-container' 
        show={show} onHide={handleClose}
        >
        <Modal.Header>
          <Modal.Title className='h5'>
            New Transaction
          </Modal.Title>
          <Button className='btn btn-x' onClick={handleClose}>
            <FontAwesomeIcon icon={faX} style={{color: "#99999F"}}/>
          </Button>
        </Modal.Header>
        
        <Modal.Body>
          <IEPopupForm handleClose={handleClose} getTransactions={getTransactions} />
        </Modal.Body>
      </Modal>
    </div>
  )
}