import React, {useState, useEffect} from 'react';
import { Form } from 'react-bootstrap';
import { getAccounts, API_BASE_URL } from '../../functions/data';

export default function TransFilter({dateRange, setDateRange, account, setAccount, transactionType, setTransactionType }){
  //fetch accounts
    const [accounts, setAccounts] = useState([]);
    const loadAccounts = async () => {
      const accounts = await getAccounts();
      setAccounts(accounts);
    };
      
    useEffect(()=> {
      loadAccounts();
    }, []);


  
  return (
    <div className='mb-3 d-flex'>
      <Form.Select
        className='dropdown-filter me-3'
        value={dateRange}
        onChange={(e) => setDateRange(Number(e.target.value))}
      >
        <option value="30">Last 30 days</option>
        <option value="60">Last 60 days</option>
        <option value="90">Last 90 days</option>
        <option value="">Custom range</option>
      </Form.Select>
      <Form.Select
        className='dropdown-filter me-3'
      >
        <option value="All accounts">All accounts</option>
        {
          accounts.map((account)=> (
            <option key={account.id} value={account.name}>{account.name}</option>
          ))   
        }
      </Form.Select>
      <Form.Select
        className='dropdown-filter'
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
      >
        <option value="All Transaction Types">All transaction types</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
        <option value="Transfer">Transfer</option>
      </Form.Select>
    </div>
  )
}