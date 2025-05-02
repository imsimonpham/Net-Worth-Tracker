import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/esm/Button'

export default function TransDeleteButton({transaction, getTransactions, deleteTransaction}){
  const handleDeleteTransaction = () => {
    const confirmed = window.confirm("Are you sure you want to delete this transaction?");
    if (confirmed) {
      deleteTransaction(transaction.id);
  
      // Refresh data
      getTransactions();
    }
  };
  
  return (
    <Button className='btn btn-danger' onClick={handleDeleteTransaction}>
      <FontAwesomeIcon icon={faTrash} style={{ color: "#F26B53" }} />
    </Button>
  );
}