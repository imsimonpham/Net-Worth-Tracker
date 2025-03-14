import React from "react";
import CashAccountRow from "./CashAccountRow";
import {Accordion} from 'react-bootstrap';

export default function CashAccountList({accounts}){

  return (
    <div className="account-list section-primary mb-3 px-3">
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