import React, {useState, useEffect} from 'react';
import { Form, Dropdown } from 'react-bootstrap';
import { formatDateForUI } from '../../../../functions/utilities';

export default function TransFilter({ 
  accounts,
  startDate, setStartDate,
  endDate, setEndDate, 
  setAccount, 
  transactionType, setTransactionType, isMobile}){

  //date range
  const [dateString, setDateString] = useState('');
  const handleClick = (e) => {
    e.stopPropagation(); // Prevents dropdown from closing
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (newStartDate && endDate) {
      setDateString(`${formatDateForUI(newStartDate)} - ${formatDateForUI(endDate)}`);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && newEndDate) {
      setDateString(`${formatDateForUI(startDate)} - ${formatDateForUI(newEndDate)}`);
    }  
  };

  return (
    <div className='mb-3 d-flex flex-wrap'>
      <Dropdown className="me-3">
        <Dropdown.Toggle>
          {dateString || 'Last 30 days'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item 
            as="button" onClick={(e) => handleClick(e)}>
            <p className="mb-2">Start Date:</p>
            <Form.Control 
              type="date" 
              value={startDate}
              onChange={(e) => handleStartDateChange(e)}
            />
            </Dropdown.Item>
          <Dropdown.Item 
            as="button" 
            onClick={(e) => handleClick(e)}>
            <p className="mb-2">End Date:</p>
            <Form.Control 
              type="date" 
              value={endDate}
              min={startDate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleEndDateChange(e)}
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Form.Select
        className='dropdown-filter me-3'
        onChange={(e) => setAccount(e.target.value)}
      >
        <option value="All accounts">All accounts</option>
        {
          accounts.map((account)=> (
            <option key={account.id} value={account.name}>{account.name}</option>
          ))   
        }
      </Form.Select>
      <Form.Select
        className={isMobile ? 'dropdown-filter mt-2' : 'dropdown-filter'}
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
      >
        <option value="All Transaction Types">All transaction types</option>
        <option value="Income">Income</option>
        <option value="Investment">Investment</option>
        <option value="Expense">Expense</option>
        <option value="Transfer">Transfer</option>
      </Form.Select>
    </div>
  )
}