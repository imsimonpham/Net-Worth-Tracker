import React, {useState} from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';
import { formatDateForUI, exportToExcel, convertToFloat } from '../../../functions/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileExcel} from '@fortawesome/free-solid-svg-icons';
import categories from '../../../data/categories';

export default function TransFilter({ 
  startDate, setStartDate,
  endDate, setEndDate, 
  transactionType, setTransactionType, 
  category, setCategory,
  filteredTransactions,
  isMobile}){

  // filter category
  const getCategoryOptions = () => {
    if (transactionType === 'Income') return categories.income;
    if (transactionType === 'Expense') return categories.expense;
    if (transactionType === 'Investment') return categories.investment;
    return [];
  };

  const getFirstOption = () => {
    if (transactionType === 'Income') return 'All Income';
    if (transactionType === 'Expense') return 'All Expenses';
    if (transactionType === 'Investment') return 'All Investments';
    return '';
  };

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

  const handleExport = () => {
    const exportData = filteredTransactions.map(txn => ({
      Date: txn.date,
      'Transaction Type': txn.transType,
      Category: txn.category,
      Amount: convertToFloat(txn.amount),
      Note: txn.note
    }));
  
    exportToExcel(exportData);
  };
  

  return (
    <div className='mb-2 d-flex flex-wrap'>
      <Dropdown className="me-2">
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
        className='dropdown-filter me-2'
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
      >
        <option value="All Transactions">All Transactions</option>
        <option value="Income">Income</option>
        <option value="Investment">Investment</option>
        <option value="Expense">Expense</option>
      </Form.Select>

      {transactionType !== 'All Transactions' && (
        <Form.Select
          className={isMobile ? 'dropdown-filter mt-2 me-2' : 'dropdown-filter me-2'}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">{getFirstOption()}</option>
          {getCategoryOptions()
            .filter(option => option.id !== 0) // skip "Select an option"
            .map(option => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
          ))}
        </Form.Select>
      )}
      <Button 
        className={isMobile && transactionType !== 'All Transactions' ? 'mt-2' : ''} 
        onClick={() => handleExport()}>
        <FontAwesomeIcon icon={faFileExcel} />
      </Button>
    </div>
  )
}