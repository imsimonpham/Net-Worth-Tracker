import React, {useEffect, useState} from "react";
import CashAccountRow from "./CashAccountRow";
import Accordion from 'react-bootstrap/Accordion';
import { getAccounts } from "../../functions/data";

export default function AccountList(){
  const [accounts, setAccounts] = useState([]);

  const loadAccounts = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts);
  };
  
  useEffect(()=> {
    loadAccounts();
  }, []);

  return (
    <div className="account-list section-primary mb-3">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Cash Accounts</Accordion.Header>
          <Accordion.Body>
            {accounts
              .filter(account => account.type === 'Cash')
              .map((account)=> (
              <CashAccountRow key={account.id} account={account}/>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}