import React, { useState } from 'react'; 
import { Form, Row, Col, Button } from 'react-bootstrap';
import {createNewAccount } from '../../functions/data';

export default function AddAccountForm ({handleClose, getAccounts}) {
  // variables
  const [accountName, setAccountName] = useState('');
  const [balance, setBalance] = useState('');

  // handle variable changes
  const handleAccountNameChange = (e) =>  setAccountName(e.target.value);
  const handleBalanceChange = (e) => setBalance(e.target.value);

  //form validation
  const [errors, setErrors] = useState({});
  const isFormDataValid = () => {
    let newErrors = {};

    if(!accountName) newErrors.accountName = 'Account Name is required';
    if(!balance) newErrors.balance = 'Initial Balance is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //create new account
  const createAccount = async () => {
    const body = {
      name: accountName, 
      balance: balance, 
      isActive: true
    };
    const newAccount = await createNewAccount(body);

    handleClose();
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(!isFormDataValid()) return;
    await createAccount();

    //refresh data
    await getAccounts();
  }

  return (
    <Form className='transaction-form' onSubmit={onSubmitForm}>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="account">
            <Form.Label>Account Name</Form.Label>
            <Form.Control type="text" 
              value={accountName} 
              onChange={handleAccountNameChange}/>
              {
                errors.accountName && 
                <div className="text-danger">{errors.accountName}</div>
              }
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group  controlId="initalBalance">
            <Form.Label>Initial Balance</Form.Label>
            <Form.Control type="number" placeholder="$" value={balance} step="any" onChange={handleBalanceChange}/>
            {errors.balance && <div className="text-danger">{errors.balance}</div>}
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