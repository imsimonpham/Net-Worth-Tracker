import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { convertToFloat, convertDateToSystemFormat } from "../../functions/utilities";
import { getAccounts } from "../../functions/data";

export default function TransferPopupForm({handleClose, transaction}){
  // variables
  const [date, setDate] = useState(
    transaction !== undefined ? 
    convertDateToSystemFormat(transaction.date) : '');
  const [amount, setAmount] = useState(
    transaction !== undefined ? 
    convertToFloat(transaction.amount) : 0);
  const [sendingAccount, setSendingAccount] = useState(
    transaction && transaction.fromAcct || ''
  );
  const [receivingAccount, setReceivingAccount] = useState(
    transaction && transaction.toAcct || ''
  );
  const [note, setNote] = useState(transaction?.note || '');

  // handle variable changes
  const handleDateChange = (e) => setDate(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleAccountSelection = (e) => setSendingAccount(e.target.value);
  const handleReceivingAccountChange = (e) => setReceivingAccount(e.target.value);
  const handleNoteChange = (e) => setNote(e.target.value);

   // fetch accounts
   const [accounts, setAccounts] = useState([]);
   const loadAccounts = async () => {
    const accounts = await getAccounts();
    setAccounts(accounts);
   }
 
   useEffect(()=> {
     loadAccounts();
   }, []);

  // form validation 
  const [errors, setErrors] = useState({}); 
  const isFormDataValid = () => {
    let newErrors = {}; 

    if(!date) newErrors.date = 'Date is required';
    if(!amount || amount <= 0) newErrors.amount = 'Amount must be greater than zero'; 
    if(!sendingAccount) newErrors.sendingAccount = 'Sending account is required';
    if(!receivingAccount) newErrors.receivingAccount = 'Receiving account is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //create new transaction
  const onSubmitForm = async(e) => {
    e.preventDefault(); 
    if(!isFormDataValid()) return;

    try{
      const body = {
        date: date, 
        transType: 'Transfer', 
        category: 'Transfer', 
        amount: amount, 
        fromAcct: sendingAccount, 
        toAcct: receivingAccount, 
        note: note
      }

      const url = transaction 
      ? `http://localhost:5000/transactions/${transaction.id}`
      : `http://localhost:5000/transactions/`;

      const method = transaction ? 'PUT': 'POST'
      const res = await fetch(url, {
        method: method, 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })

      window.location = '/';
    } catch(err) {
      console.error(err.message);
    }
  }

  return (
    <Form className='transaction-form' onSubmit={onSubmitForm}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="transactionDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={date} onChange={handleDateChange}/>
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
              value={sendingAccount}
              onChange={handleAccountSelection}
            >
              <option value="">Select an account</option>
              {accounts.map((account)=>(
                <option key={account.id} value={account.value}>{account.name}</option>
              ))}
            </Form.Select>
            {errors.sendingAccount && <div className="text-danger">{errors.sendingAccount}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="receivingAccount">
            <Form.Label>Receiving Account</Form.Label>
            <Form.Select 
              aria-label="Receiving Account"
              value={receivingAccount}
              onChange={handleReceivingAccountChange}
            >
              <option value="">Select an account</option>
              { 
                accounts
                .filter((account)=> account.name !== sendingAccount)
                .map((account)=>(
                  <option key={account.id} value={account.value}>{account.name}</option>
                ))
              }
            </Form.Select>
            {errors.receivingAccount && <div className="text-danger">{errors.receivingAccount}</div>}
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