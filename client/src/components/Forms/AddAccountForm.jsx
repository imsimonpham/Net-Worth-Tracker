import React, { useState } from 'react'; 
import { Form, Row, Col, Button } from 'react-bootstrap';
import {createNewAccount } from '../../functions/data';

export default function AddAccountForm ({handleClose}) {
  // variables
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('Cash');

  // handle variable changes
  const handleAccountNameChange = (e) =>  setAccountName(e.target.value);
  const handleAccountType = (e) =>  setAccountType(e.target.value);

  //form validation
  const [errors, setErrors] = useState({});
  const isFormDataValid = () => {
    let newErrors = {};

    if(!accountName) newErrors.accountName = 'Account Name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //create new account
  const createAccount = async () => {
    const body = {
      name: accountName, 
      cashBalance: 0, 
      investmentBalance: 0,
      type: accountType,
      isActive: true
    };
    const newAccount = await createNewAccount(body);
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if(!isFormDataValid()) return;
    createAccount();
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
          <Form.Group controlId="accountType">
            <Form.Label>Account Type</Form.Label>
            <Form.Select 
              aria-label="Account Type"
              value={accountType}
              onChange={handleAccountType}
            >
              <option value="Cash">Cash</option>
              <option value="Investment">Investment</option>
            </Form.Select>
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