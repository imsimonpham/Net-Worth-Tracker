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
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="drag-handle">
          <FontAwesomeIcon style={{ width: '40px' }} icon={faUserGear} />
        </Accordion.Header>
        <Accordion.Body>
          <Button
            style={{ width: '40px', height: '40px' }}
            className='btn btn-transaction mb-3'
            onClick={handleShow}>
            <FontAwesomeIcon icon={faDollarSign} />
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

      <Modal 
        className='modal-container' 
        show={show} onHide={handleClose}
        // style={isMobile ? { width: '100%' } : { width: '65%', left: '50%', transform: 'translateX(-50%)'}}
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