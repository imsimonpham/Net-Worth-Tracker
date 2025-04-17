import React, { useState } from 'react'; 
import { Form, Row, Col, Button } from 'react-bootstrap';
import {createNewDividend, updateDividend } from '../../functions/data';
import { getHoldingById, convertToFloat, convertDateToSystemFormat } from '../../functions/utilities';

export default function DividendForm ({handleClose, accounts, holdings, dividend, getDividends}) {
  // variables
  const [date, setDate] = useState(dividend ? convertDateToSystemFormat(dividend.date) : '');
  const [acctId, setAcctId] = useState(dividend ? dividend.acctId : '');
  const [holdingId, setHoldingID] = useState(dividend ? dividend.holdingId : '');
  const [holdingTicker, setHoldingTicker] = useState(
    holdingId ? getHoldingById(holdings, holdingId).ticker : '');
  const [currency, setCurrency] = useState(holdingId ? getHoldingById(holdings, holdingId).currency : '');
  const [amount, setAmount] = useState(dividend ? convertToFloat(dividend.amount) : 0);

  // handle variable changes
  const handleDateChange = (e) => setDate(e.target.value);
  const handleHoldingChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedHolding = getHoldingById(holdings, selectedOption.id);
    if(selectedHolding !== undefined){
      setHoldingID(selectedOption.id);
      setHoldingTicker(selectedHolding.ticker);
      setAcctId(selectedHolding.acctId);
      setCurrency(selectedHolding.currency);
    }
  };
  const handleAmountChange = (e) => setAmount(e.target.value);

  //form validation
  const [errors, setErrors] = useState({});
  const isFormDataValid = () => {
    let newErrors = {};
    if(!date) newErrors.date = 'Date is required';
    if(!holdingId) newErrors.holdingId = 'Holding is required';
    if(!amount) newErrors.amount = 'Dividend is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //create new dividend
  const upsertDividend = async () => {
    const body = {
      date: date, 
      holdingId: holdingId,
      acctId: acctId, 
      amount: amount, 
      currency: currency
    }

    const createDividend = dividend 
    ? await updateDividend(dividend.id, body) 
    : await createNewDividend(body)

    handleClose();
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(!isFormDataValid()) return;
    await upsertDividend();
    await getDividends();
  }

  return (
    <Form className='transaction-form' onSubmit={onSubmitForm}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="dividendDate">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date" value={date} onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}/>
            {errors.date && <div className="text-danger">{errors.date}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="transactionAccount">
            <Form.Label>Transaction Account</Form.Label>
            <Form.Select 
              aria-label="Holding"
              value={holdingTicker}
              onChange={handleHoldingChange}
            >
              <option value="">Select a holding</option>
              {holdings
                .map((holding)=> (
                  <option key={holding.id} value={holding.ticker} id={holding.id}>
                    {holding.ticker}
                  </option>
                ))}
            </Form.Select>
            {errors.holdingId && <div className="text-danger">{errors.holdingId}</div>}
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="dividend">
            <Form.Label>
              Dividend
              <span>&nbsp;{currency ? `(${currency})` : ''}</span>
            </Form.Label>
            <Form.Control type="number"
              value={amount} 
              onChange={handleAmountChange}/>    
          </Form.Group>
          {errors.amount && <div className="text-danger">{errors.amount}</div>}
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