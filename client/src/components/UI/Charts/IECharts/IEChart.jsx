import {ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, ComposedChart, Line } from 'recharts';

const IEChart = ({yearlyData, totalIncome, totalExpenses, totalInvestments}) => {
  return (
    <div className="mb-3" >
      <h5 className="text-center mb-2">Income, Expenses and Investments</h5>
      <p className="text-center">
        Total income: <span style={{color:"#4d908e"}}>${totalIncome.toFixed(2)}</span>
      </p>
      <p className="text-center">
        Total expenses: <span style={{color:"#fe6d73"}}>${totalExpenses.toFixed(2)}</span></p>
      <p className="text-center">
        Total investments: <span style={{color:"#f6bd60"}}>${totalInvestments.toFixed(2)}</span>&nbsp;
      </p>
      <p className="text-center">
        Balance before investments: <span style={{color:"#ff7300"}}>${(totalIncome - totalExpenses).toFixed(2)}</span>
      </p>
      <p className="text-center mb-2">
        Balance after investments: <span style={{color:"#ff7300"}}>${(totalIncome - totalExpenses - totalInvestments).toFixed(2)}</span>
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={yearlyData}>
          <XAxis dataKey="month" barGap={2}/>
          <YAxis />
          <Tooltip content={CustomTooltip}/>
          <Legend content={CustomLegend}/>
          <Bar dataKey="income"  fill="#4d908e" maxBarSize={30}/>
          <Bar dataKey="expenses"  fill="#fe6d73" maxBarSize={30}/>
          <Bar dataKey="investments"  fill="#f6bd60" maxBarSize={30}/>
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
          <li style={{ padding: '2px 0', color: '#f6bd60' }}>
            Investments: ${payload[1].value}
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 32 32" style={{ marginRight: '4px' }}>
              <path stroke="none" fill="#4d908e" d="M0,4h32v24h-32z" />
            </svg>
            <span style={{ color: '#4d908e' }}>Income</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 32 32" style={{ marginRight: '4px' }}>
              <path stroke="none" fill="#fe6d73" d="M0,4h32v24h-32z" />
            </svg>
            <span style={{ color: '#fe6d73' }}>Expenses</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 32 32" style={{ marginRight: '4px' }}>
              <path stroke="none" fill="#f6bd60" d="M0,4h32v24h-32z" />
            </svg>
            <span style={{ color: '#f6bd60' }}>Investments</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default IEChart;

