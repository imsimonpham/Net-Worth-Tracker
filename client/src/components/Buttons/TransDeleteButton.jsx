import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/esm/Button'

export default function DeleteButton({transaction, deleteTransaction}){
  return (
    <Button className='btn btn-danger' onClick={()=> deleteTransaction(transaction.id)}>
      <FontAwesomeIcon icon={faTrash} style={{color: "#F26B53"}}/>
    </Button>
  )
}