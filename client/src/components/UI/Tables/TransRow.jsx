import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {formatDateForUI } from '../../../functions/utilities';
import TransEditButton from '../Buttons/TransEditButton';
import TransDeleteButton from '../Buttons/TransDeleteButton';


export default function TransRow({transaction, deleteTransaction, getTransactions, isMobile}){

  const formatTransTypeString = (transTypeString, showTypeString) => {
    let transType = transTypeString === 'Income' 
    if(transTypeString === 'Income'){
      transType = (
        <>
          {showTypeString ? transTypeString : ''}
          &nbsp;
          <FontAwesomeIcon className="middle-align" icon={faArrowLeft} style={{ color: "#63E6BE" }} />
        </>
      );
    } else if(transTypeString === 'Expense') {
      transType = (
        <>
          {showTypeString ? transTypeString : ''}
          &nbsp;
          <FontAwesomeIcon className='middle-align' icon={faArrowRight} style={{color: "#dc3545",}} />
        </>
      )    
    } else if(transTypeString === 'Investment') {
      transType = (
        <>
          {showTypeString ? transTypeString : ''}
          &nbsp;
          <FontAwesomeIcon className='middle-align' icon={faArrowRight} style={{color: "#F7D774",}} />
        </>
      )
      
    } 
    return transType;
  }

  if(!isMobile){
    return (
      <tr>
        <td>{formatDateForUI(transaction.date)}</td>
        <td>{formatTransTypeString(transaction.transType, true)}</td>
        <td>{transaction.category}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.note}</td>
        <td style={{ maxWidth: "90px", textAlign: "right" }}>
          <TransEditButton 
            transaction={transaction}  
            getTransactions={getTransactions}/>
          <TransDeleteButton 
            transaction={transaction} deleteTransaction={deleteTransaction} 
            getTransactions={getTransactions}/>
        </td>
      </tr>
    )
  } else {
    return (
      <div className="py-0 mb-2 d-flex justify-content-between">
        <p className="d-flex flex-column" style={{width: "50%"}}>
          <span>{transaction.category} {formatTransTypeString(transaction.transType, false)}</span>
        </p>
        <p>{transaction.amount}</p>   
        <div style={{width: "35%", textAlign: "right"}}>
          <TransEditButton transaction={transaction}  getTransactions={getTransactions} isMobile={isMobile}/>
          <TransDeleteButton 
            transaction={transaction} deleteTransaction={deleteTransaction} 
            getTransactions={getTransactions}/>
        </div>
      </div>
    )
  }
}