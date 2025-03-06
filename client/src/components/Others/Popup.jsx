import { useState } from 'react';
import {Button, Modal, Accordion} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faDollarSign, faRightLeft, faPlus, faGear, faUserGear } from '@fortawesome/free-solid-svg-icons';
import IEPopupForm from '../Forms/IEPopupForm';
import TransferPopupForm from '../Forms/TransferPopupForm';
import AddAccountForm from '../Forms/AddAccountForm'; 
import ManageAccountsForm from '../Forms/ManageAccountsForm';


export default function Popup({accounts}){
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

      <Modal 
        className='modal-container' 
        show={activeModal !== null} 
        onHide={handleClose}
        dialogClassName={activeModal === 'Manage Accounts' ? 'modal-100w' : ''}>
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
          {activeModal === 'IE' && <IEPopupForm handleClose={handleClose} accounts={accounts}/>}
          {activeModal === 'Transfer' && <TransferPopupForm handleClose={handleClose} accounts={accounts}/>}
          {activeModal === 'Add Acount' && <AddAccountForm handleClose={handleClose}/>}
          {activeModal === 'Manage Accounts' && <ManageAccountsForm handleClose={handleClose} accounts={accounts}/>}
        </Modal.Body>
      </Modal>
    </div>
  )
}