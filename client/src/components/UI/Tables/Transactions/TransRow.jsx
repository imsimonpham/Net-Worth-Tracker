import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import {formatDateForUI } from '../../../../functions/utilities';
import TransEditButton from '../../Buttons/TransEditButton';
import TransDeleteButton from '../../Buttons/TransDeleteButton';

export default function TransRow({transaction, deleteTransaction}){
  const formatTransTypeString = (transTypeString) => {
    let transType = transTypeString === 'Income' 
    if(transTypeString === 'Income'){
      transType = (
        <>
          {transTypeString}
          &nbsp;
          <FontAwesomeIcon className="middle-align" icon={faArrowLeft} style={{ color: "#63E6BE" }} />
        </>
      );
    } else if(transTypeString === 'Expense') {
      transType = (
        <>
          {transTypeString}
          &nbsp;
          <FontAwesomeIcon className='middle-align' icon={faArrowRight} style={{color: "#dc3545",}} />
        </>
      )
    } else if (transTypeString === 'Transfer'){
      transType = (
        <>
          {transTypeString}
          &nbsp;
          <FontAwesomeIcon className='middle-align' icon={faRightLeft} style={{color: "#0d6efd",}} />
        </>
      )
    }
    return transType;
  }

  return (
    <tr>
      <td>{formatDateForUI(transaction.date)}</td>
      <td >
        {formatTransTypeString(transaction.transType)} 
      </td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.fromAcct}</td>
      <td>{transaction.toAcct}</td>
      <td>{transaction.note}</td>
      <td style={{maxWidth: "90px", textAlign: "right"}}>
        <TransEditButton transaction={transaction} />
        <TransDeleteButton transaction={transaction} deleteTransaction={deleteTransaction}/>
      </td>
    </tr>
  )
}