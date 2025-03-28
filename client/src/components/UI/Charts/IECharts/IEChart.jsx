import {ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, ComposedChart, Line } from 'recharts';

const IEChart = ({yearlyData, totalIncome, totalExpenses}) => {
  return (
    <div className="mb-3" >
      <h5 className="text-center mb-2">Income and Expenses</h5>
      <p className="text-center mb-2">
        Total income: <span style={{color:"#4d908e"}}>${totalIncome}</span>&nbsp; 
        Total expenses: <span style={{color:"#fe6d73"}}>${totalExpenses}</span>&nbsp;
        Balance: <span style={{color:"#ff7300"}}>${totalIncome - totalExpenses}</span>
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={yearlyData}>
          <XAxis dataKey="month"/>
          <YAxis />
          <Tooltip content={CustomTooltip}/>
          <Legend content={CustomLegend}/>
          <Bar dataKey="income"  fill="#4d908e" maxBarSize={30}/>
          <Bar dataKey="expenses"  fill="#fe6d73" maxBarSize={30}/>
          <Line type="monotone" dataKey="balance" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ padding: '2px 0', color: '#4d908e' }}>
            Income: ${payload[0].value}
          </li>
          <li style={{ padding: '2px 0', color: '#fe6d73' }}>
            Expenses: ${payload[1].value}
          </li>
          <li style={{ padding: '2px 0', color: '#ff7300' }}>
            Balance: ${payload[2].value}
          </li>
        </ul>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  if (payload && payload.length) {
    return (
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'inline-flex', gap: '12px' }}>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 32 32" style={{ marginRight: '4px' }}>
              <path stroke="none" fill="#4d908e" d="M0,4h32v24h-32z" />
            </svg>
            <span style={{ color: '#4d908e' }}>Income</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 32 32" style={{ marginRight: '4px' }}>
              <path stroke="none" fill="#fe6d73" d="M0,4h32v24h-32z" />
            </svg>
            <span style={{ color: '#fe6d73' }}>Expenses</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 32 32" style={{ marginRight: '4px' }}>
              <path
                strokeWidth="4"
                fill="none"
                stroke="#ff7300"
                d="M0,16h10.666666666666666
                  A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
                  H32M21.333333333333332,16
                  A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
              />
            </svg>
            <span style={{ color: '#ff7300' }}>Balance</span>
          </li>
        </ul>
      </div>
    );
  }
  return null;
};

export default IEChart;

