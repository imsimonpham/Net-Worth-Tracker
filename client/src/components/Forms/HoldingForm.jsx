import React, { useState } from 'react'; 
import { Form, Row, Col, Button } from 'react-bootstrap';
import {createNewAccount } from '../../functions/data';

export default function HoldingForm ({handleClose, accounts}) {
  // variables
  const [tickerSymbol, setTickerSymbol] = useState('');
  const [holdingType, setHoldingType] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [shares, setShares] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);

  // handle variable changes
  const handleTickerSymbolChange = (e) => setTickerSymbol(e.target.value.toUpperCase());
  const handleHoldingTypeChange = (e) =>  setHoldingType(e.target.value);
  const handleAccountChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedAccount = getAccountById(accounts, selectedOption.id);
    setAccountId(selectedOption.id);
    setAccountName(selectedAccount.name);
  }
  const handleSharesChange = (e) => setShares(e.target.value);
  const handleAvgPriceChange = (e) => setAvgPrice(e.target.value);

  //form validation
  const [errors, setErrors] = useState({});
  const isFormDataValid = () => {
    let newErrors = {};

    if(!tickerSymbol) newErrors.tickerSymbol = 'Ticker symbol is required';
    if(!holdingType) newErrors.holdingType = 'Holding type is required';
    if(!accountId) newErrors.accountId = 'Investment account is required';
    if(!shares && shares <= 0) newErrors.shares = 'Number of shares must be greater zero';
    if(!avgPrice && avgPrice <= 0) newErrors.avgPrice = 'Average price must be greater zero';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //create new account
  // const createAccount = async () => {
  //   const body = {
  //     name: accountName, 
  //     cashBalance: cashBalance, 
  //     investmentBalance: 0,
  //     type: accountType,
  //     isActive: true
  //   };
  //   const newAccount = await createNewAccount(body);
  // }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(!isFormDataValid()) return;
    createAccount();

    window.location = '/';
    handleClose();
  }

  return (
    <Form className='transaction-form' onSubmit={onSubmitForm}>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="tickerSymbol">
            <Form.Label>Ticker Symbol</Form.Label>
            <Form.Control type="text" 
              value={tickerSymbol} 
              onChange={handleTickerSymbolChange}/>
              {errors.tickerSymbol && 
                <div className="text-danger">{errors.tickerSymbol}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="holdingType">
            <Form.Label>Type</Form.Label>
            <Form.Select 
              aria-label="Holding Type"
              value={holdingType}
              onChange={handleHoldingTypeChange}
            >
              <option value="">Select an option</option>
              <option value="Crypto">Crypto</option>
              <option value="ETF">ETF</option>
              <option value="Stock">Stock</option>
            </Form.Select>
            {errors.holdingType && <div className="text-danger">{errors.holdingType}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="investmentAccount">
            <Form.Label>Investment Account</Form.Label>
            <Form.Select 
              aria-label="Investment Account"
              value={accountName}
              onChange={handleAccountChange}
            >
              <option value="">Select an account</option>
              {accounts
                .filter(account => account.type === 'Investment')
                .map((account)=> (
                  <option key={account.id} value={account.name} id={account.id}>
                    {account.name}
                  </option>
                ))}
            </Form.Select>
            {errors.accountId && <div className="text-danger">{errors.accountId}</div>}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="tickerSymbol">
            <Form.Label>Shares</Form.Label>
            <Form.Control type="number"
              value={shares} 
              onChange={handleSharesChange}/>
              {errors.shares && 
                <div className="text-danger">{errors.shares}</div>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="tickerSymbol">
            <Form.Label>Average Price</Form.Label>
            <Form.Control type="number" 
              value={avgPrice} 
              onChange={handleAvgPriceChange}/>
              {errors.avgPrice && 
                <div className="text-danger">{errors.avgPrice}</div>}
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