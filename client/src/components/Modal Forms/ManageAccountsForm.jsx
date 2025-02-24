import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import AccountRow from '.././Tables/AccountRow';
import { getAccounts, API_BASE_URL } from '../../functions/data';


export default function ManageAccountsForm () {
  //fetch accounts
  const [accounts, setAccounts] = useState([]);
  const loadAccounts = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts);
  };
    
  useEffect(()=> {
    loadAccounts();
  }, []);

  //delete accounts
  const deleteAccount = async(id)=> {
    try {
      const deleteAcct = await fetch(
        `${API_BASE_URL}/accounts/${id}`, {
          method: 'DELETE', 
        }
      )

      setAccounts(accounts.filter(
        account => account.id !== id
      ));
    } catch (err){
      console.error(err.message);
    }
  }
  
  return (
    <div className="section-primary">
      <Table className="table" borderless>
        <thead>
          <tr>
            <th className="fw-bold" style={{width: "35%"}}>Account Name</th>
            <th className="fw-bold" style={{width: "30%"}}>Account Type</th>
            <th className="fw-bold" style={{width: "30%"}}>Balance</th>
            <th className="fw-bold" style={{width: "5%"}}></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account)=> (
            <AccountRow 
              key={account.id} 
              account={account} 
              deleteAccount={deleteAccount} 
              getAccounts={getAccounts}/>
            ))}
        </tbody>
      </Table>
    </div>
  )
}