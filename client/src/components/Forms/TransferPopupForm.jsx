import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { convertToFloat, convertDateToSystemFormat, getAccountById, getAccountBalanceById } from "../../functions/utilities";
import {updateTransactionById, createNewTransaction } from "../../functions/data";

export default function TransferPopupForm({handleClose, transaction, getTransactions, accounts}){
  // variables
  const [date, setDate] = useState(
    transaction ? 
    convertDateToSystemFormat(transaction.date) : '');
  const [amount, setAmount] = useState(
    transaction ? 
    convertToFloat(transaction.amount) : 0);
  const [sendingAccountId, setSendingAccountId] = useState(
    transaction && transaction.fromAcctId || ''
  );
  const [sendingAccountName, setSendingAccountName] = useState(
    sendingAccountId ? getAccountById(accounts, sendingAccountId).name : ''
  );
  const [receivingAccountId, setReceivingAccountId] = useState(
    transaction && transaction.toAcctId || ''
  );
  const [receivingAccountName, setReceivingAccountName] = useState(
    receivingAccountId ? getAccountById(accounts, receivingAccountId).name : ''
  );
  const [sendingAccountBalance, setSendingAccountBalance]  = useState(sendingAccountId ? getAccountBalanceById(accounts, sendingAccountId) : 0);
  const [note, setNote] = useState(transaction?.note || '');

  // handle variable changes
  const handleDateChange = (e) => setDate(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleSendingAccountChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedAccount = getAccountById(accounts, selectedOption.id);
    if(selectedAccount !== undefined){
      setSendingAccountId(selectedOption.id);
      setSendingAccountName(selectedAccount.name);
      setSendingAccountBalance(convertToFloat(selectedAccount.balance));
    } 
  }
  const handleReceivingAccountChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedAccount = getAccountById(accounts, selectedOption.id);
    if(selectedAccount !== undefined){
      setReceivingAccountId(selectedOption.id);
      setReceivingAccountName(selectedAccount.name);
    } 
  }
  const handleNoteChange = (e) => setNote(e.target.value);

  

  // form validation 
  const [errors, setErrors] = useState({}); 
  const isFormDataValid = () => {
    let newErrors = {}; 

    if(!date) newErrors.date = 'Date is required';
    if(!amount || amount <= 0) newErrors.amount = 'Amount must be greater than zero'; 
    if(!sendingAccountId) newErrors.sendingAccountId = 'Sending account is required';
    if(!receivingAccountId) newErrors.receivingAccountId = 'Receiving account is required';
    if(amount > sendingAccountBalance)  newErrors.fund = 'Insufficient fund';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //create new transaction
  const upsertTransaction = async () => {
    const body = {
      date: date, 
      transType: 'Transfer', 
      category: 'Transfer', 
      amount: amount, 
      fromAcctId: sendingAccountId, 
      toAcctId: receivingAccountId, 
      note: note
    }

    const upsertTransaction = transaction ? 
      await updateTransactionById(transaction.id, body) : 
      await createNewTransaction(body);
    
    handleClose();
  }

  const onSubmitForm = async(e) => {
    e.preventDefault(); 
    if(!isFormDataValid()) return;
    await upsertTransaction();
    await getTransactions();
  }

  return (
    <Form className='transaction-form' onSubmit={onSubmitForm}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="transactionDate">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date" value={date} onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}/>
            {errors.date && <div className="text-danger">{errors.date}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group  controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="$0" step="any" value={amount} onChange={handleAmountChange}/>
            {errors.amount && <div className="text-danger">{errors.amount}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="sendingAccount">
            <Form.Label>Sending Account</Form.Label>
            <Form.Select 
              aria-label="Sending Account"
              value={sendingAccountName}
              onChange={handleSendingAccountChange}
            >
              <option value="">Select an account</option>
              {accounts.map((account)=>(
                <option key={account.id} value={account.name} id={account.id}>{account.name}</option>
              ))}
            </Form.Select>
            {errors.sendingAccountId && <div className="text-danger">{errors.sendingAccountId}</div>}
            {errors.fund && <div className="text-danger">{errors.fund}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="receivingAccount">
            <Form.Label>Receiving Account</Form.Label>
            <Form.Select 
              aria-label="Receiving Account"
              value={receivingAccountName}
              onChange={handleReceivingAccountChange}
            >
              <option value="">Select an account</option>
              { accounts
                .filter((account)=> account.id !== Number(sendingAccountId))
                .map((account)=>(
                  <option key={account.id} value={account.name} id={account.id}>{account.name}</option>
                ))}
            </Form.Select>
            {errors.receivingAccountId && <div className="text-danger">{errors.receivingAccountId}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="note">
            <Form.Label>Note</Form.Label>
            <Form.Control type="text" value={note} onChange={handleNoteChange}/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12} style={{textAlign: "right"}}>
          <Button className="me-3" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Col>
      </Row>         
    </Form>
  )
}