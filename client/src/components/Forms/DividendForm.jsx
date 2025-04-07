import React, { useState } from 'react'; 
import { Form, Row, Col, Button } from 'react-bootstrap';
import {addDividendById } from '../../functions/data';
import { getHoldingById, convertToFloat } from '../../functions/utilities';

export default function DividendForm ({handleClose, accounts, isReadOnly, holdings}) {
  if(!isReadOnly){
    isReadOnly = false;
  }
  // variables
  const [holdingId, setHoldingID] = useState('');
  const [holdingTicker, setHoldingTicker] = useState(
    holdingId ? getHoldingById(holdings, holdingId).ticker : '');
  const [dividend, setDividend] = useState(0);

  // handle variable changes
  const handleHoldingChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedHolding = getHoldingById(holdings, selectedOption.id);
    if(selectedHolding !== undefined){
      setHoldingID(selectedOption.id);
      setHoldingTicker(selectedHolding.ticker);
    }
  };
  const handleDividendChange = (e) => setDividend(e.target.value);

  //form validation
  const [errors, setErrors] = useState({});
  const isFormDataValid = () => {
    let newErrors = {};

    if(!holdingId) newErrors.holdingId = 'Holding is required';
    if(!dividend) newErrors.dividend = 'Dividend is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //create a new holding
  const addDividend = async () => {
    const body = {
      dividend: dividend
    };

    const addDividend = await addDividendById(holdingId, body) 

    // window.location = '/';
    handleClose();
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(!isFormDataValid()) return;
    addDividend();
  }

  return (
    <Form className='transaction-form' onSubmit={onSubmitForm}>
      <Row className="mb-3">
        <Col md={12}>
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
            <Form.Label>Dividend</Form.Label>
            <Form.Control type="number"
              value={dividend} 
              onChange={handleDividendChange}/>    
          </Form.Group>
          {errors.dividend && 
                <div className="text-danger">{errors.dividend}</div>}
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