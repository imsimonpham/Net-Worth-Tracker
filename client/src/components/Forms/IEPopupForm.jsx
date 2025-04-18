import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import categories from '../../data/categories';
import { convertToFloat, convertDateToSystemFormat, getAccountBalanceById } from '../../functions/utilities';
import { updateTransactionById, createNewTransaction, getAllTransactions} from '../../functions/data';
import { getAccountById } from '../../functions/utilities';

export default function IEPopupForm({handleClose, transaction, getTransactions, accounts, getAccounts}){
  // variables
  const [date, setDate] = useState(
    transaction ? 
    convertDateToSystemFormat(transaction.date) : '');
  const [transactionType, setTransactionType] = useState(transaction?.transType ||'Income');
  const [category, setCategory] = useState(transaction?.category ||'');
  const [amount, setAmount] = useState(
    transaction ? 
    convertToFloat(transaction.amount) : 0);
  const [accountId, setAccountId] = useState(
    transaction && (transaction.fromAcctId || transaction.toAcctId) || ''  
  );
  const [accountName, setAccountName] = useState(
    accountId ? getAccountById(accounts, accountId).name : '');
  const [accountBalance, setAccountBalance]  = useState(accountId ? getAccountBalanceById(accounts, accountId) : 0);
  const [note, setNote] = useState(transaction?.note || '');

  // handle variable changes
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTransactionTypeChange = (e) => { 
    setTransactionType(e.target.value); 
    handleCategoryChange(e); 
  };
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleAccountChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedAccount = getAccountById(accounts, selectedOption.id);
    if(selectedAccount !== undefined){
      setAccountId(selectedOption.id);
      setAccountName(selectedAccount.name);
      setAccountBalance(convertToFloat(selectedAccount.balance));    
    } 
  }

  const handleNoteChange = (e) => setNote(e.target.value);

  // form validation
  const [errors, setErrors] = useState({});
  const isFormDataValid = () => {
    let newErrors = {};

    if (!date) newErrors.date = 'Date is required';
    if (!category) newErrors.category = 'Category is required';
    if (!amount || amount <= 0) newErrors.amount = 'Amount must be greater than zero'; 
    if (!accountId) newErrors.accountId = 'Transaction account is required';
    if(transactionType === 'Expense' && amount > accountBalance)  newErrors.fund = 'Insufficient fund';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // create new transaction
  const upsertTransaction = async () => {
    const body = {
      date: date,
      transType: transactionType,
      category: category, 
      amount: amount, 
      fromAcctId: transactionType === 'Expense' ? accountId : null,
      toAcctId: transactionType === 'Income' ? accountId : null,
      note: note
    }

    const upsertTransaction = transaction ? 
      await updateTransactionById(transaction.id, body) : 
      await createNewTransaction(body);

    handleClose();
  }

  // submit form
  const onSubmitForm = async(e) => {
    e.preventDefault();
    if(!isFormDataValid()) return;
    await upsertTransaction();

    //refresh data
    await getTransactions();
    await getAccounts();
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
          <Form.Group controlId="transactionType">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Select 
              aria-label="Transaction Type"
              value={transactionType}
              onChange={handleTransactionTypeChange}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Category" value={category} onChange={handleCategoryChange}>
              {
                transactionType === 'Expense' 
                ? categories.expense.map((expense)=> (
                  <option key={expense.id} value={expense.value}>
                    {expense.name}
                  </option>
                ))
                : categories.income.map((income)=> (
                  <option key={income.id} value={income.value}>
                    {income.name}
                  </option>
                ))
              }
            </Form.Select>
            {errors.category && <div className="text-danger">{errors.category}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group  controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="$0" value={amount} step="any" onChange={handleAmountChange}/>
            {errors.amount && <div className="text-danger">{errors.amount}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="transactionAccount">
            <Form.Label>Transaction Account</Form.Label>
            <Form.Select 
              aria-label="Transaction Account" 
              value={accountName}  
              onChange={handleAccountChange}
            >
              <option value="">Select an account</option>
              {accounts
                .map((account)=>(
                  <option key={account.id} value={account.name} id={account.id}>{account.name}</option>
              ))}
            </Form.Select>
            {errors.accountId && <div className="text-danger">{errors.accountId}</div>}
            {errors.fund && <div className="text-danger">{errors.fund}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="note">
            <Form.Label>Note</Form.Label>
            <Form.Control type="text" value={note}  onChange={handleNoteChange}/>
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