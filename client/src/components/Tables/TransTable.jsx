import React, {useState, useEffect} from 'react';
import {Table, Spinner} from 'react-bootstrap';
import TransRow from './TransRow';
import { getTransactions, API_BASE_URL } from '../../functions/data';
import TransFilter from './TransFilter';

export default function TransTable(){
  //filter data
  const [dateRange, setDateRange] = useState(30);
  const [account, setAccount] = useState('All accounts');
  const [transactionType, setTransactionType] = useState('All Transaction Types');


  //fetch transactions
  const [transactions, setTransactions] = useState([]);
  const getTrans = async() => {
    const transactions = await getTransactions();
    setTransactions(transactions);
  }

  useEffect(()=>{
    getTrans();
  }, [])

  //apply filters
  const filterByDate = (transactions, dateRange) => {
    const today = new Date();
    let pastDate = new Date();
  
    if (dateRange === 30) {
      pastDate.setDate(today.getDate() - 30); 
    } else if (dateRange === 60) {
      pastDate.setDate(today.getDate() - 60); 
    } else if (dateRange === 90) {
      pastDate.setDate(today.getDate() - 90);
    } else {
      pastDate = null; 
    }
  
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return !pastDate || transactionDate >= pastDate; //decide if each transaction should be included
    });
  };

  const filterbyAccount = (transactions, account) => {
    return transactions.filter((transaction)=> {
      return account === 'All accounts' || (account === transaction.fromAcct ||account === transaction.toAcct)
    })
  }

  const filterByTransactionType = (transactions, transactionType) => {
    return transactions.filter((transaction) => {
      return transactionType === 'All Transaction Types' || transactionType === transaction.transType;
    })
  }

  let filteredTransactions = filterByDate(transactions, dateRange);
  filteredTransactions = filterByTransactionType(filteredTransactions, transactionType);
  filteredTransactions = filterbyAccount(filteredTransactions, account);

  //delete transaction
  const deleteTransaction = async (id) => {
    try{
      const deleteTrans = await fetch(
        `${API_BASE_URL}/transactions/${id}`,{
          method: 'DELETE'
        }
      )
      setTransactions(transactions.filter(
        transaction => transaction.id !== id
      ))
    } catch (err){
      console.error(err.message);
    }
  }

  return(
    <div className="section-primary">
      <TransFilter 
        dateRange={dateRange} setDateRange={setDateRange} 
        account={account} setAccount={setAccount}
        transactionType={transactionType} setTransactionType={setTransactionType}/>
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
            <TransRow key={transaction.id} transaction={transaction} deleteTransaction={deleteTransaction} />
        ))}
        </tbody>
      </Table>
    </div>
  )
}