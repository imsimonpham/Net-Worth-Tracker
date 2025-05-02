import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import categories from '../../data/categories';
import { convertToFloat } from '../../functions/utilities';
import { updateTransactionById, createNewTransaction} from '../../functions/data';

export default function IEPopupForm({handleClose, transaction, getTransactions}){
  // variables
  const [date, setDate] = useState(
    transaction ? (transaction.date).slice(0, 10) : '');
  const [transactionType, setTransactionType] = useState(transaction?.transType ||'Income');
  const [category, setCategory] = useState(transaction?.category ||'');
  const [amount, setAmount] = useState(
    transaction ? 
    convertToFloat(transaction.amount) : 0);
  const [note, setNote] = useState(transaction?.note || '');

  const today = new Date().toLocaleDateString('en-CA');

  // handle variable changes
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTransactionTypeChange = (e) => { 
    setTransactionType(e.target.value); 
    handleCategoryChange(e); 
  };
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleNoteChange = (e) => setNote(e.target.value);

  // form validation
  const [errors, setErrors] = useState({});
  const isFormDataValid = () => {
    let newErrors = {};

    if (!date) newErrors.date = 'Date is required';
    if (!category) newErrors.category = 'Category is required';
    if (!amount || amount <= 0) newErrors.amount = 'Amount must be greater than zero'; 
  
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
  }

  return (
    <Form className='transaction-form' onSubmit={onSubmitForm}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="transactionDate">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date" value={date} onChange={handleDateChange}
              max={today}/>
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
              <option value="Investment">Investment</option>
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
                ? categories.expense.map((expense) => (
                    <option key={expense.id} value={expense.value}>
                      {expense.name}
                    </option>
                  ))
                : transactionType === 'Income'
                ? categories.income.map((income) => (
                    <option key={income.id} value={income.value}>
                      {income.name}
                    </option>
                  ))
                : categories.investment.map((investment) => (
                    <option key={investment.id} value={investment.value}>
                      {investment.name}
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