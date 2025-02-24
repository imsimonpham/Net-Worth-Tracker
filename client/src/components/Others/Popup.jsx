import { useState } from 'react';
import {Button, Modal, Accordion} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faDollarSign, faRightLeft, faPlus, faGear, faUserGear } from '@fortawesome/free-solid-svg-icons';
import IEPopupForm from '../Modal Forms/IEPopupForm';
import TransferPopupForm from '../Modal Forms/TransferPopupForm';
import AddAccountForm from '../Modal Forms/AddAccountForm'; 
import ManageAccountsForm from '../Modal Forms/ManageAccountsForm';


export default function Popup(){
  const [activeModal, setActiveModal] = useState(null);

  const handleShow = (modalType) => setActiveModal(modalType);
  const handleClose = () => setActiveModal(null);

  return (
    <div className="popup">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FontAwesomeIcon style={{width: '40px'}} icon={faUserGear} />
          </Accordion.Header>
          <Accordion.Body>
            <Button  
              style={{width: '40px', height: '40px'}}
              className='btn btn-transaction mb-3'  
              onClick={()=>handleShow('IE')}>
              <FontAwesomeIcon icon={faDollarSign} />
            </Button>
            <Button 
              style={{width: '40px', height: '40px'}}
              className='btn btn-transaction mb-3' 
              onClick={()=>handleShow('Transfer')}>
              <FontAwesomeIcon icon={faRightLeft} />
            </Button>
            <Button 
              style={{width: '40px', height: '40px'}}
              className='btn btn-transaction mb-3' 
              onClick={()=>handleShow('Add Acount')}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button 
              style={{width: '40px', height: '40px'}}
              className='btn btn-transaction' 
              onClick={()=>handleShow('Manage Accounts')}>
              <FontAwesomeIcon icon={faGear} />
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal className='modal-container' show={activeModal !== null} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='h5'>
            {activeModal === 'IE' && 'Income/Expense Transaction'}
            {activeModal === 'Transfer' && 'Transfer between accounts'}
            {activeModal === 'Add Acount' && 'New account'}
            {activeModal === 'Manage Accounts' && 'Manage accounts'}
          </Modal.Title>
          <Button className='btn btn-x' onClick={handleClose}>
            <FontAwesomeIcon icon={faX} style={{color: "#99999F"}}/>
          </Button>
        </Modal.Header>
        
        <Modal.Body>
          {activeModal === 'IE' && <IEPopupForm handleClose={handleClose}/>}
          {activeModal === 'Transfer' && <TransferPopupForm handleClose={handleClose}/>}
          {activeModal === 'Add Acount' && <AddAccountForm handleClose={handleClose}/>}
          {activeModal === 'Manage Accounts' && <ManageAccountsForm handleClose={handleClose}/>}
        </Modal.Body>
      </Modal>
    </div>
  )
}