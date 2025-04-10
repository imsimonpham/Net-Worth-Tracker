import React, { useState } from 'react'; 
import { Form, Row, Col, Button } from 'react-bootstrap';
import {createNewHolding, updateHolding } from '../../functions/data';
import { getAccountById, convertToFloat, isTickerIncluded } from '../../functions/utilities';

export default function HoldingForm ({handleClose, accounts, holding, holdings, getHoldings, marketData, isReadOnly, isEditing}) {
  if(!isReadOnly) isReadOnly = false;
  if(!isEditing) isEditing = false;
  // variables
  const [tickerSymbol, setTickerSymbol] = useState(holding ? holding.ticker : '');
  const [holdingType, setHoldingType] = useState(holding ? holding.type : '');
  const [accountId, setAccountId] = useState(holding ? holding.acctId : '');
  const [accountName, setAccountName] = useState(
    accountId ? getAccountById(accounts, accountId).name : '');
  const [cashBalance, setCashBalance] = useState(accountId ? convertToFloat(getAccountById(accounts, accountId).cashBalance) : 0);
  const [shares, setShares] = useState(holding ? holding.shares : 0);
  const [avgPrice, setAvgPrice] = useState(holding ? convertToFloat(holding.avgPrice) : 0);
  const [currency, setCurrency] = useState(holding ? holding.currency : '');
  const [totalDividend, setTotalDividend] = useState(holding ? convertToFloat(holding.totalDividend) : 0);

  // handle variable changes
  const handleTickerSymbolChange = (e) => {
    const selectedTicker = e.target.value;
    const selectedTickerData = marketData.price.find((data) => data.ticker === selectedTicker);
    if (selectedTickerData) {
      setTickerSymbol(selectedTicker); 
      setCurrency(selectedTickerData.currency);
      setHoldingType(selectedTickerData.type);
    }
  };
  // const handleHoldingTypeChange = (e) =>  setHoldingType(e.target.value);
  const handleAccountChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedAccount = getAccountById(accounts, selectedOption.id);
    const cashBalance = selectedAccount.cashBalance; 
    if(selectedAccount !== undefined){
      setAccountId(selectedOption.id);
      setAccountName(selectedAccount.name);
      setCashBalance(convertToFloat(cashBalance));
    } 
  }
  const handleSharesChange = (e) => setShares(e.target.value);
  const handleAvgPriceChange = (e) => setAvgPrice(e.target.value);
  const handleCashBalanceChange = (e) => setCashBalance(e.target.value);
  // const handleCurrencyChange = (e) => setCurrency(e.target.value);
  // const handleTotalDividendChange = (e) => setTotalDividend(e.target.value);

  //form validation
  const [errors, setErrors] = useState({});
  const isFormDataValid = () => {
    let newErrors = {};

    if (!tickerSymbol) newErrors.tickerSymbol = 'Ticker symbol is required';
    if(!holdingType) newErrors.holdingType = 'Holding type is required';
    if(!accountId) newErrors.accountId = 'Investment account is required';
    if(!currency) newErrors.currency = 'Currency is required';
    if(!shares && shares <= 0) newErrors.shares = 'Number of shares must be greater zero';
    if(!avgPrice && avgPrice <= 0) newErrors.avgPrice = 'Average price must be greater zero';
    // if(!totalDividend) newErrors.totalDividend = 'Total dividend is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //create a new holding
  const upsertHolding = async () => {
    const body = {
      ticker: tickerSymbol, 
      type: holdingType, 
      acctId: accountId,
      shares: shares,
      avgPrice: avgPrice,
      currency: currency,
      totalDivide: totalDividend
    };
    const upsertHolding = holding ? 
      await updateHolding(holding.id, body) : 
      await createNewHolding(body)

    handleClose();
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(!isFormDataValid()) return;
    await upsertHolding();
    await getHoldings();
  }

  return (
    <Form className='transaction-form' onSubmit={onSubmitForm}>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="tickerSymbol">
            <Form.Label>Ticker Symbol</Form.Label>
            {/* <Form.Control type="text" 
              value={tickerSymbol} 
              onChange={handleTickerSymbolChange} 
              disabled={isReadOnly} 
              style={isReadOnly ? {opacity: "50%"} : {opacity: "100%"}}/> */}
              <Form.Select aria-label="Category" 
                value={tickerSymbol} onChange={handleTickerSymbolChange}
                disabled={isReadOnly} 
                style={isReadOnly ? {opacity: "50%"} : {opacity: "100%"}}>
              <option value="">Select a ticker</option>
              {
                marketData && marketData.price && marketData.price.length > 0 ? (
                  marketData.price
                    .filter((data) => {
                      if (!isEditing) {
                        // only filter out tickers that already exist in holdings when creating a new holding
                        return !holdings.some((holding) => holding.ticker === data.ticker);
                      }
                      return true; // If we're editing, don't filter anything
                    })
                    .map((data) => (
                      <option key={data.id} value={data.ticker}>
                        {data.ticker}
                      </option>
                    ))
                ) : (
                  <option disabled>Loading...</option>
                )
              }
              </Form.Select>  
              {errors.tickerSymbol && (
                <div className="text-danger">{errors.tickerSymbol}</div>
              )}
          </Form.Group>
        </Col>
        {/* <Col md={4}>
          <Form.Group controlId="currency">
            <Form.Label>Currency</Form.Label>
            <Form.Select 
              aria-label="Currency"
              value={currency}
              disabled={isReadOnly}
              style={isReadOnly ? {opacity: "50%"} : {opacity: "100%"}}
              onChange={handleCurrencyChange}
            >
              <option value="">----</option>
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
            </Form.Select>
            {errors.currency && <div className="text-danger">{errors.currency}</div>}
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="holdingType">
            <Form.Label>Type</Form.Label>
            <Form.Select 
              aria-label="Holding Type"
              value={holdingType}
              disabled={isReadOnly}
              style={isReadOnly ? {opacity: "50%"} : {opacity: "100%"}}
              onChange={handleHoldingTypeChange}
            >
              <option value="">----</option>
              <option value="Crypto">Crypto</option>
              <option value="ETF">ETF</option>
              <option value="Stock">Stock</option>
            </Form.Select>
            {errors.holdingType && <div className="text-danger">{errors.holdingType}</div>}
          </Form.Group>
        </Col> */}
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="investmentAccount">
            <Form.Label>Investment Account</Form.Label>
            <Form.Select 
              aria-label="Investment Account"
              value={accountName}
              disabled={isReadOnly}
              style={isReadOnly ? {opacity: "50%"} : {opacity: "100%"}}
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
        <Col md={6}>
          <Form.Group controlId="cashBalance">
            <Form.Label>Cash Balance</Form.Label>
            <Form.Control type="number"
              value={cashBalance} 
              onChange={handleCashBalanceChange}/>
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