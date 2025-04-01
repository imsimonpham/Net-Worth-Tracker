import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-bootstrap';
import { useState } from 'react';


export default function HoldingDeleteButton({holding, deleteHolding}){
  const [show, setShow] = useState(false);
  const handleDeleteHolding = () => {
    deleteHolding(holding.id);
  }
  return (
    <div className="d-inline">   
      { 
        show
        ?
          <div className='d-inline'>
            <Button 
              className='btn btn-success me-2' 
              onClick={handleDeleteHolding}>
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
            onClick={() => setShow(true)}>
            <FontAwesomeIcon icon={faTrash} style={{color: '#F26B53'}}/>
          </Button>
      }
    </div>
  )
}