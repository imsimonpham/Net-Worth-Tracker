import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-bootstrap';

export default function AccountEditButton({handleEditClick}){
  return (
    <Button className="btn btn-pencil me-3" onClick={handleEditClick}>
      <FontAwesomeIcon icon={faPencil} style={{color: '#00aff5'}} />
    </Button>
  )
}