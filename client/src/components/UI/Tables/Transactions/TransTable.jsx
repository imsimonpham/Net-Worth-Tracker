import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import TransRow from './TransRow';
import {deleteTransactionById } from '../../../../functions/data';
import TransFilter from './TransFilter';
import {formatDateForUI, getAccountById} from '../../../../functions/utilities';

export default function TransTable({accounts, getAccounts, transactions, setTransactions, getTransactions, isMobile}){
  //filter data
  const [dateRange, setDateRange] = useState(30); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [account, setAccount] = useState('All accounts');
  const [transactionType, setTransactionType] = useState('All Transaction Types');

  //apply filters
  const filterByDate = (transactions, startDate, endDate) => {  
    const today = new Date();
    let pastDate = new Date();
    
    // Default to 30 days if no custom range is provided
    if (!startDate || !endDate) {
      pastDate.setDate(today.getDate() - 30);
      return transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= pastDate && transactionDate <= today;
      });
    }
    
    // Use custom range if provided
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });
  };

  const filterbyAccount = (transactions, account) => {
    return transactions.filter((transaction) => {
      const fromAcct = getAccountById(accounts, transaction.fromAcctId);
      const toAcct = getAccountById(accounts, transaction.toAcctId);
      return account === 'All accounts' || (fromAcct?.name === account || toAcct?.name === account);
    });
  }
  

  const filterByTransactionType = (transactions, transactionType) => {
    return transactions.filter((transaction) => {
      return transactionType === 'All Transaction Types' || transactionType === transaction.transType;
    })
  }

  let filteredTransactions = filterByDate(transactions, startDate, endDate);
  filteredTransactions = filterByTransactionType(filteredTransactions, transactionType);
  filteredTransactions = filterbyAccount(filteredTransactions, account);

  //delete transaction
  const deleteTransaction = async (id) => {
    const deleteTrans = await deleteTransactionById(id);
    setTransactions(transactions.filter(
      transaction => transaction.id !== id
    ))
    getAccounts();
  }

  //mobile display
  const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
    const date = formatDateForUI(transaction.date);
    if (!acc[date]) {
      acc[date] = []; // Initialize an array if it doesn't exist
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  return(
    <div className="section-primary">
      <TransFilter 
        dateRange={dateRange} setDateRange={setDateRange} 
        startDate={startDate} setStartDate={setStartDate}
        endDate={endDate} setEndDate={setEndDate}
        setAccount={setAccount} accounts={accounts}
        getTransactions={getTransactions}
        transactionType={transactionType} setTransactionType={setTransactionType}
        isMobile={isMobile}/>
      {
        !isMobile ? 
          <Table className="table table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Sending Account</th>
                <th>Receiving Account</th>
                <th>Note</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((transaction) => (
                  <TransRow 
                    isMobile={isMobile} key={transaction.id} 
                    transaction={transaction} deleteTransaction={deleteTransaction}  getTransactions={getTransactions}
                    accounts={accounts} getAccounts={getAccounts}/>
              ))}
            </tbody>
          </Table>
        :
          <div>
            {Object.keys(groupedTransactions)
              .sort((a, b) => new Date(b) - new Date(a)).map((date) => (
              <div 
                key={date} className="mb-3 pt-1" 
                style={{borderTop: "1px solid #474B5A"}}>
                <p className="fw-bold">{date}</p>
                {groupedTransactions[date].map((transaction) => (
                  <TransRow 
                    isMobile={isMobile} 
                    key={transaction.id} 
                    transaction={transaction} 
                    getTransactions={getTransactions}
                    accounts={accounts} getAccounts={getAccounts}
                  />
                ))}
              </div>
            ))}
          </div>
      }      
    </div>
  )
}