import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import {formatDateForUI, getAccountById } from '../../../../functions/utilities';
import TransEditButton from '../../Buttons/TransEditButton';
import TransDeleteButton from '../../Buttons/TransDeleteButton';
import { useMediaQuery } from "react-responsive";

export default function TransRow({transaction, deleteTransaction, accounts}){
  if (accounts.length === 0) {
    return null; 
  }
  const transactionAcctId = 
    transaction.fromAcctId ? transaction.fromAcctId : transaction.toAcctId;
  const transactionAcct = getAccountById(accounts, transactionAcctId);

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

  //mobile display
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return (
      <div>
        <p className="d-flex justify-content-between py-0">
          <span>{formatDateForUI(transaction.date)}</span>
          <span>{transactionAcct.name}</span>
        </p>
        <p className="d-flex justify-content-between py-0 mb-3">
          <span>{transaction.category}</span>
          <span>{transaction.amount}</span>
        </p>
      </div>
    );
  }

  return (
    <tr>
      <td>{formatDateForUI(transaction.date)}</td>
      <td>{formatTransTypeString(transaction.transType)}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.fromAcctId ? transactionAcct.name : ''}</td>
      <td>{transaction.toAcctId ? transactionAcct.name : ''}</td>
      <td>{transaction.note}</td>
      <td style={{ maxWidth: "90px", textAlign: "right" }}>
        <TransEditButton transaction={transaction} accounts={accounts} />
        <TransDeleteButton transaction={transaction} deleteTransaction={deleteTransaction} />
      </td>
    </tr>
  );
}