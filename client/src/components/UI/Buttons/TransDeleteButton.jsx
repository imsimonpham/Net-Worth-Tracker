import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/esm/Button'

export default function TransDeleteButton({transaction, getTransactions, deleteTransaction, getAccounts}){
  const handleDeleteTransaction = () => {
    deleteTransaction(transaction.id);

    //refresh data
    getTransactions();
    getAccounts();
  }
  return (
    <Button className='btn btn-danger' onClick={()=> handleDeleteTransaction()}>
      <FontAwesomeIcon icon={faTrash} style={{color: "#F26B53"}}/>
    </Button>
  )
}