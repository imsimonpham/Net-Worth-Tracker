import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import TransRow from './TransRow';
import { getTransactions } from '../../functions/data';

export default function TransTable(){
  //fetch transactions
  const [transactions, setTransactions] = useState([]);
  const getTrans = async() => {
    const transactions = await getTransactions();
    setTransactions(transactions);
  }

  useEffect(()=>{
    getTrans();
  }, [])

  //delete transaction
  const deleteTransaction = async (id) => {
    try{
      const deleteTrans = await fetch(
        `http://localhost:5000/transactions/${id}`,{
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
          {transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((transaction)=>(
            <TransRow key={transaction.id} transaction={transaction} deleteTransaction={deleteTransaction}/>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}