import {Row, Col} from 'react-bootstrap';
import IEChart from './IECharts/IEChart';
import IncomePieChart from './IECharts/IncomePieChart';
import ExpensePiechart from './IECharts/ExpensePieChart';

export default function IEChartArea (){
  const transData = [
    { name: 'January', income: 4000, expenses: 2400, netSavings: 1600 },
    { name: 'February', income: 3000, expenses: 1398, netSavings: 1602 },
    { name: 'March', income: 2000, expenses: 9800, netSavings: -7800 },
    { name: 'April', income: 2780, expenses: 3908, netSavings: -1128 },
    { name: 'May', income: 1890, expenses: 4800, netSavings: -2910 },
    { name: 'June', income: 2390, expenses: 3800, netSavings: -1410 },
    { name: 'July', income: 3490, expenses: 4300, netSavings: -810 },
    { name: 'August', income: 4200, expenses: 2900, netSavings: 1300 },
    { name: 'September', income: 3100, expenses: 2700, netSavings: 400 },
    { name: 'October', income: 4500, expenses: 3200, netSavings: 1300 },
    { name: 'November', income: 3800, expenses: 2500, netSavings: 1300 },
    { name: 'December', income: 5000, expenses: 4100, netSavings: 900 },
  ];

  const incomeData = [
    { category: 'Investment Gain', value: 1500, color: '#d8c99b' },
    { category: 'Miscellaneous', value: 500, color: '#d8973c' },
    { category: 'Salary', value: 3000, color: '#bd632f' },
    { category: 'Side Gigs', value: 1200, color: '#50808e' }
  ];

  const expenseData = [
    { category: 'Car', value: 200, color: '#e46a55' },
    { category: 'Clothing', value: 150, color: '#d36a7f' },
    { category: 'Debt Payments', value: 500, color: '#b85f7a' },
    { category: 'Eat out', value: 250, color: '#e87c47' },
    { category: 'Education', value: 400, color: '#e4a349' },
    { category: 'Electricity', value: 120, color: '#f0a741' },
    { category: 'Entertainment', value: 300, color: '#f15b4e' },
    { category: 'Groceries', value: 600, color: '#6fa68d' },
    { category: 'Healthcare', value: 350, color: '#55a0a9' },
    { category: 'Insurance', value: 450, color: '#7d8b97' },
    { category: 'Internet', value: 60, color: '#5f88b1' },
    { category: 'Investment Loss', value: 200, color: '#8c5a6c' },
    { category: 'Miscellaneous', value: 180, color: '#a99c6a' },
    { category: 'Pet Supplies', value: 100, color: '#e08585' },
    { category: 'Rent', value: 1200, color: '#8c8c8c' },
    { category: 'Transportation', value: 250, color: '#9c704d' }
];



  
  return (
    <div className="section-primary mb-3">
      <IEChart transData={transData}/>
      <Row className="d-flex justify-content-between">
        <Col sm={4}>
          <IncomePieChart incomeData={incomeData}/>
        </Col>
        <Col sm={4}>
          <ExpensePiechart expenseData={expenseData}/>
        </Col>
        <Col sm={4}>
          
        </Col>
      </Row>
    </div>
  )
}