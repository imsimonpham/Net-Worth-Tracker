import {Row, Col} from 'react-bootstrap';
import IEChart from './IECharts/IEChart';
import IncomePieChart from './IECharts/IncomePieChart';
import ExpensePiechart from './IECharts/ExpensePieChart';
import {convertToFloat} from '../../../functions/utilities';
import {useEffect, useState } from "react";
import { getMonthlyIncome, getYearlyIncome, getMonthlyExpenses, getYearlyExpenses, getMonthlyInvestments, getYearlyInvestments, getYearlyData } from '../../../functions/data';
import {Form} from 'react-bootstrap';
import InvestmentPieChart from './IECharts/InvestmentPieChart';

export default function IEChartArea ({transactions, isMobile}){
  const [legendHeight, setLegendHeight] = useState(0);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [investmentData, setInvestmentData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalInvestments, setTotalInvestment] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);

  // HANDLE INCOME DATA
  const getIncomeSourcesForPeriod = async (year, month) => {
    const incomeSources =  month === 0 
      ? await getYearlyIncome(year)
      : await getMonthlyIncome(year, month); 

    const incomeColors = {
      'Government Payment': '#7c9a56',
      'ICD': '#a6b3d8',
      'Investment': '#d8c99b',
      'Miscellaneous': '#d8973c',
      'Salary': '#bd632f',
      'Side gig': '#50808e'
    };
  
    //convert amount to float and add color property
    const income = incomeSources
      .map(income => ({
        ...income, 
        id: month,
        totalAmount: convertToFloat(income.totalAmount),
        color: incomeColors[income.category] || '#000000'
      }))

    //accumulate amount
    const totalIncomeCal = income.reduce(
      (sum, item) => sum + item.totalAmount,
      0,
    );

    //calculate percentage
    const updatedIncome = income.map(income => ({
      ...income,
      percentage: totalIncomeCal > 0 
        ? convertToFloat((income.totalAmount / totalIncomeCal * 100).toFixed(2)) 
        : 0
    }));

    setTotalIncome(totalIncomeCal);
    setIncomeData(updatedIncome);
  } 

  // HANDLE EXPENSE DATA
  const getExpensesForPeriod = async (year, month) => {
    const expenses =  month === 0 
      ? await getYearlyExpenses(year)
      : await getMonthlyExpenses(year, month); 
    const expenseColors = {
      'Car': '#e46a55',
      'Clothing': '#d36a7f',
      'Debt Payment': '#b85f7a',
      'Eat out': '#f4a98c',
      'Education': '#4b7bec',
      'Electricity': '#f0a741',
      'Entertainment': '#f15b4e',
      'Gym': '#f6bd60',
      'Groceries': '#6fa68d',
      'Healthcare': '#55a0a9',
      'Insurance': '#7d8b97',
      'Internet': '#5f88b1',
      'Miscellaneous': '#a99c6a',
      'Mobile': '#63e6be',
      'Pet': '#e08585',
      'Rent': '#8c8c8c',
      'Tech Services': '#b4c5e4',
      'Transportation': '#9c704d', 
      'Vacation': '#f7c8e0'
    }; 

    //convert amount to float and add color property
    const expense = expenses.map(expense => ({
      ...expense, 
      totalAmount: convertToFloat(expense.totalAmount), 
      color: expenseColors[expense.category] || '#000000'
    }))

    //accumulate amount
    const totalExpensesCal = expense.reduce(
      (sum, item) => sum + item.totalAmount,
      0,
    );

    //calculate percentage
    const updatedExpenses = expense.map(expense => ({
      ...expense,
      percentage: totalExpensesCal > 0 
        ? convertToFloat((expense.totalAmount / totalExpensesCal * 100).toFixed(2)) 
        : 0
    }));

    setTotalExpenses(totalExpensesCal);
    setExpenseData(updatedExpenses);
  }

  // HANDLE INVESTMENT DATA
  const getInvestmentsForPeriod = async (year, month) => { 
    const investments = month === 0 
      ? await getYearlyInvestments(year) 
      : await getMonthlyInvestments(year, month); 
  
    const investmentColors = {
      'IBKR': '#b4c5e4',      
      'NDAX': '#c9e4b4',      
      'WS-FHSA': '#f7d9c4',   
      'WS-RRSP': '#eac4d5',   
      'WS-TFSA': '#d5c4e8'    
    }; 
  
    // convert amount to float and add color property
    const investment = investments.map(investment => ({
      ...investment, 
      totalAmount: convertToFloat(investment.totalAmount), 
      color: investmentColors[investment.category] || '#000000'
    }))
  
    // accumulate amount
    const totalInvestmentsCal = investment.reduce(
      (sum, item) => sum + item.totalAmount,
      0,
    );
  
    // calculate percentage
    const updatedInvestments = investment.map(investment => ({
      ...investment,
      percentage: totalInvestmentsCal > 0 
        ? convertToFloat((investment.totalAmount / totalInvestmentsCal * 100).toFixed(2)) 
        : 0
    }));
  
    setTotalInvestment(totalInvestmentsCal);
    setInvestmentData(updatedInvestments);
  }
  
  
  // HANDLE IE DATA
  const updateIEData = async (year, month) => {
    const yearlyData = await getYearlyData(year);
    
    let updatedYearlyData = yearlyData.map(data => ({
      ...data
    }));

    // Filter if a specific month is selected
    if (month) {
      updatedYearlyData = updatedYearlyData.filter(data => Number(data.month) === month);
    }

    // Convert month number to month name
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    updatedYearlyData = updatedYearlyData.map(data => ({
      ...data,
      month: monthNames[Number(data.month) - 1],
      income: Number(data.income),
      expenses: Number(data.expenses),
      investment: Number(data.investment),
      balance: Number(data.balance),
    }));

    setYearlyData(updatedYearlyData);
  };


  // DATE FILTER
  const years = transactions
    .map(transaction => new Date(transaction.date).getFullYear())
    .filter(year => !isNaN(year));
  const minYear = years.length > 0 ? Math.min(...years) : null;
  const maxYear = years.length > 0 ? Math.max(...years) : null;
  const yearOptions = [];
  for (let year = maxYear; year >= minYear; year--){yearOptions.push(year)};
  const monthOptions = [
    { id: 0, name: '----' },
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ];
  
  //get available months based on selected year
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // month index starts at 0
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelctedMonth] = useState(currentMonth + 1);
  const availableMonths = selectedYear == currentYear 
  ? monthOptions.filter(month => month.id <= currentMonth + 1) 
  : monthOptions;


  const handleMonthChange = (e) => {
    const selectedMonthIndex = e.target.selectedIndex;
    setSelctedMonth(selectedMonthIndex);
  }

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelctedMonth(0);
  }

  useEffect(()=> {
    getIncomeSourcesForPeriod(selectedYear, selectedMonth);
    getExpensesForPeriod(selectedYear, selectedMonth);
    getInvestmentsForPeriod(selectedYear, selectedMonth);
    updateIEData(selectedYear, selectedMonth);
  }, [selectedMonth, selectedYear, totalIncome, totalExpenses, totalInvestments])
  
  return (
    <div className="mb-3"> 
      <Row className="section-primary" style={{marginLeft: "0", marginRight: "0"}}>
        <Form.Select 
          aria-label="Transaction Month" 
          style={{maxWidth: "80px"}} className="me-3 mb-3"
          value={selectedYear}
          onChange={handleYearChange}>
          {yearOptions.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </Form.Select>
        <Form.Select 
          aria-label="Transaction Month" 
          className="mb-3"
          style={{ maxWidth: "120px" }}
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {availableMonths.map((month) => (
            <option key={month.id} value={month.id}>
              {month.name}
            </option>
          ))}
        </Form.Select>
        <Col sm={12}>
          <IEChart yearlyData={yearlyData} totalIncome={totalIncome} totalExpenses={totalExpenses} totalInvestments={totalInvestments}/>
        </Col>
        <Col sm={4}>
          <IncomePieChart incomeData={incomeData} legendHeight={legendHeight} isMobile={isMobile}/>
        </Col>
        <Col sm={4}>
          <ExpensePiechart expenseData={expenseData} setLegendHeight={setLegendHeight} />
        </Col>
        <Col sm={4}>
          <InvestmentPieChart investmentData={investmentData} legendHeight={legendHeight}/>
        </Col>
      </Row>
    </div>
  )
}