import {Row, Col} from 'react-bootstrap';
import IEChart from './IECharts/IEChart';
import IncomePieChart from './IECharts/IncomePieChart';
import ExpensePiechart from './IECharts/ExpensePieChart';
import { getColorFromId, convertToFloat} from '../../../functions/utilities';
import {useEffect, useState } from "react";
import { getMonthlyIncome, getYearlyIncome, getMonthlyExpenses, getYearlyExpenses } from '../../../functions/data';
import {Button, ButtonGroup, Form} from 'react-bootstrap';

export default function IEChartArea ({accounts, transactions}){
  const transData = [
    { name: 'Jan', income: 4000, expenses: 2400, netSavings: 1600 },
    { name: 'Feb', income: 3000, expenses: 1398, netSavings: 1602 },
    { name: 'Mar', income: 2000, expenses: 9800, netSavings: -7800 },
    { name: 'Apr', income: 2780, expenses: 3908, netSavings: -1128 },
    { name: 'May', income: 1890, expenses: 4800, netSavings: -2910 },
    { name: 'Jun', income: 2390, expenses: 3800, netSavings: -1410 },
    { name: 'Jul', income: 3490, expenses: 4300, netSavings: -810 },
    { name: 'Aug', income: 4200, expenses: 2900, netSavings: 1300 },
    { name: 'Sep', income: 3100, expenses: 2700, netSavings: 400 },
    { name: 'Oct', income: 4500, expenses: 3200, netSavings: 1300 },
    { name: 'Nov', income: 3800, expenses: 2500, netSavings: 1300 },
    { name: 'Dec', income: 5000, expenses: 4100, netSavings: 900 },
  ];

  const [legendHeight, setLegendHeight] = useState(0);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const getIncomeSourcesForPeriod = async (year, month) => {
    const incomeSources =  await getMonthlyIncome(year, month); 
    const incomeColors = {
      'Investment Gain': '#d8c99b',
      'Miscellaneous': '#d8973c',
      'Salary': '#bd632f',
      'Side gigs': '#50808e'
    };
  
    const income = incomeSources
      .map(income => ({
        ...income, 
        totalAmount: convertToFloat(income.totalAmount),
        color: incomeColors[income.category] || '#000000'
      }))

    const totalIncomeCal = income.reduce(
      (sum, item) => sum + item.totalAmount,
      0,
    );

    setTotalIncome(totalIncomeCal);
    setIncomeData(income);
  } 

  const getExpensesForPeriod = async (year, month) => {
    const expenses = await getMonthlyExpenses(year, month); 
    const expenseColors = {
      'Car': '#e46a55',
      'Clothing': '#d36a7f',
      'Debt Payments': '#b85f7a',
      'Eat out': '#e87c47',
      'Education': '#e4a349',
      'Electricity': '#f0a741',
      'Entertainment': '#f15b4e',
      'Groceries': '#6fa68d',
      'Healthcare': '#55a0a9',
      'Insurance': '#7d8b97',
      'Internet': '#5f88b1',
      'Investment Loss': '#8c5a6c',
      'Miscellaneous': '#a99c6a',
      'Pet Supplies': '#e08585',
      'Rent': '#8c8c8c',
      'Transportation': '#9c704d'
    }; 

    const expense = expenses.map(expense => ({
      ...expense, 
      totalAmount: convertToFloat(expense.totalAmount), 
      color: expenseColors[expense.category] || '#000000'
    }))

    const totalExpensesCal = expense.reduce(
      (sum, item) => sum + item.totalAmount,
      0,
    );

    setTotalExpenses(totalExpensesCal);
    setExpenseData(expense);
  }

  useEffect(()=> {
    getIncomeSourcesForPeriod('2025', '3'); 
    getExpensesForPeriod('2025', '3');
  }, [])

  // const expenseData = [
  //   { category: 'Car', totalAmount: 1200, color: '#e46a55' },
  //   { category: 'Clothing', totalAmount: 500, color: '#d36a7f' },
  //   { category: 'Debt Payments', totalAmount: 1500, color: '#b85f7a' },
  //   { category: 'Eat out', totalAmount: 700, color: '#e87c47' },
  //   { category: 'Education', totalAmount: 1000, color: '#e4a349' },
  //   { category: 'Electricity', totalAmount: 250, color: '#f0a741' },
  //   { category: 'Entertainment', totalAmount: 600, color: '#f15b4e' },
  //   { category: 'Groceries', totalAmount: 900, color: '#6fa68d' },
  //   { category: 'Healthcare', totalAmount: 800, color: '#55a0a9' },
  //   { category: 'Insurance', totalAmount: 400, color: '#7d8b97' },
  //   { category: 'Internet', totalAmount: 100, color: '#5f88b1' },
  //   { category: 'Investment Loss', totalAmount: 300, color: '#8c5a6c' },
  //   { category: 'Miscellaneous', totalAmount: 250, color: '#a99c6a' },
  //   { category: 'Pet Supplies', totalAmount: 150, color: '#e08585' },
  //   { category: 'Rent', totalAmount: 2000, color: '#8c8c8c' },
  //   { category: 'Transportation', totalAmount: 400, color: '#9c704d' }
  // ];

  const years = transactions
    .map(transaction => new Date(transaction.date).getFullYear())
    .filter(year => !isNaN(year));
  const minYear = years.length > 0 ? Math.min(...years) : null;
  const maxYear = years.length > 0 ? Math.max(...years) : null;
  const yearOptions = [];
  for (let year = maxYear; year >= minYear; year--){yearOptions.push(year)};
  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // month index starts at 0
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelctedMonth] = useState(currentMonth);
  const availableMonths = selectedYear == currentYear ? monthOptions.slice(0, currentMonth + 1): monthOptions;
  
  console.log(selectedMonth)
  // const cashAccountData = accounts.map(account => ({
  //   ...account,
  //   cashBalance: convertToFloat(account.cashBalance),
  //   color: getColorFromId(account.id)
  // }));

  return (
    <div className="mb-3"> 
      <Row className="section-primary" style={{margin: "0"}}>
        <Form.Select 
          aria-label="Transaction Month" 
          style={{maxWidth: "80px"}} className="me-3"
          value={selectedYear}
          onChange={e => setSelectedYear(parseInt(e.target.value))}>
          {yearOptions.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </Form.Select>
        <Form.Select 
          aria-label="Transaction Month" 
          style={{maxWidth: "120px"}}
          value={monthOptions[selectedMonth]}
          onChange={e => setSelctedMonth(monthOptions[parseInt(e.target.value)])}>
          <option value="">Month</option>
          {availableMonths.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </Form.Select>
        <Col sm={12}>
          <IEChart transData={transData}/>
        </Col>
        <Col sm={6}>
          <IncomePieChart incomeData={incomeData} legendHeight={legendHeight}/>
        </Col>
        <Col sm={6}>
          <ExpensePiechart expenseData={expenseData} setLegendHeight={setLegendHeight}/>
        </Col>
      </Row>
    </div>
  )
}