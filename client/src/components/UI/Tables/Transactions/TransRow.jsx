import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import {formatDateForUI, getAccountById } from '../../../../functions/utilities';
import TransEditButton from '../../Buttons/TransEditButton';
import TransDeleteButton from '../../Buttons/TransDeleteButton';

export default function TransRow({transaction, deleteTransaction, accounts, isMobile}){
  if (accounts.length === 0) {
    return null; 
  }

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
    } else if (transTypeString === 'Transfer'){
      transType = (
        <>
          {showTypeString ? transTypeString : ''}
          &nbsp;
          <FontAwesomeIcon className='middle-align' icon={faRightLeft} style={{color: "#0d6efd",}} />
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
        <td>
          {transaction.fromAcctId 
          ? getAccountById(accounts, transaction.fromAcctId).name
          : ''}
        </td>
        <td>
          {transaction.toAcctId 
          ? getAccountById(accounts, transaction.toAcctId).name
          : ''}
        </td>
        <td>{transaction.note}</td>
        <td style={{ maxWidth: "90px", textAlign: "right" }}>
          <TransEditButton transaction={transaction} accounts={accounts} />
          <TransDeleteButton transaction={transaction} deleteTransaction={deleteTransaction} />
        </td>
      </tr>
    )
  } else {
    return (
      <div>
        <div className="py-0 mb-2 d-flex justify-content-between">
          <p className="d-flex flex-column">
            <span>{transaction.category} {formatTransTypeString(transaction.transType, false)}</span>
            <small>
              {transaction.fromAcctId 
              ? getAccountById(accounts, transaction.fromAcctId).name
              : ''}
              {transaction.fromAcctId && transaction.toAcctId ? ' \u2192 ' : ''}
              {transaction.toAcctId 
              ? getAccountById(accounts, transaction.toAcctId).name
              : ''}
            </small>
          </p>
          <p>{transaction.amount}</p>
        </div>
      </div>
    )
  }
}