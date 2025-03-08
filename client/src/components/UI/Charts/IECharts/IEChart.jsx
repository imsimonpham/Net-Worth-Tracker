import {ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, ComposedChart, Line } from 'recharts';

const IEChart = ({transData}) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={250} className="mb-5">
        <ComposedChart data={transData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={CustomTooltip}/>
          <Legend content={CustomLegend}/>
          <Bar dataKey="income"  fill="#4d908e"/>
          <Bar dataKey="expenses"  fill="#fe6d73"/>
          <Line type="monotone" dataKey="netSavings" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  )
}

const CustomTooltip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip p-2 bg-dark border rounded shadow-sm">
        <p className="recharts-tooltip-label m-0">{label}</p>
        <ul className="recharts-tooltip-item-list list-unstyled m-0 p-0">
          <li className="recharts-tooltip-item py-1" style={{ color: "rgb(77, 144, 142)" }}>
            <span className="recharts-tooltip-item-name">Income</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">${payload[0].value}</span>
          </li>
          <li className="recharts-tooltip-item py-1" style={{ color: "rgb(254, 109, 115)" }}>
            <span className="recharts-tooltip-item-name">Expenses</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">${payload[1].value}</span>
          </li>
          <li className="recharts-tooltip-item py-1" style={{ color: "rgb(255, 115, 0)" }}>
            <span className="recharts-tooltip-item-name">Net Savings</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">${payload[2].value}</span>
          </li>
        </ul>
      </div>
    )
  }
}

const CustomLegend = ({payload}) => {
  if(payload && payload.length) {
    return (
      <div className="recharts-legend-wrapper">
        <ul className="recharts-default-legend p-0 m-0 text-center list-unstyled">
          <li className="recharts-legend-item legend-item-0 d-inline-block me-2">
            <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" style={{ verticalAlign: "middle", marginRight: "4px" }}>
              <path stroke="none" fill="#4d908e" d="M0,4h32v24h-32z" className="recharts-legend-icon"></path>
            </svg>
            <span className="recharts-legend-item-text" style={{ color: "rgb(77, 144, 142)" }}>Income</span>
          </li>
          <li className="recharts-legend-item legend-item-1 d-inline-block me-2">
            <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" style={{ verticalAlign: "middle", marginRight: "4px" }}>
              <path stroke="none" fill="#fe6d73" d="M0,4h32v24h-32z" className="recharts-legend-icon"></path>
            </svg>
            <span className="recharts-legend-item-text" style={{ color: "rgb(254, 109, 115)" }}>Expenses</span>
          </li>
          <li className="recharts-legend-item legend-item-2 d-inline-block me-2">
            <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" style={{ verticalAlign: "middle", marginRight: "4px" }}>
              <path strokeWidth="4" fill="none" stroke="#ff7300" d="M0,16h10.666666666666666
                  A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
                  H32M21.333333333333332,16
                  A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16" className="recharts-legend-icon"></path>
            </svg>
            <span className="recharts-legend-item-text" style={{ color: "rgb(255, 115, 0)" }}>NetSavings</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default IEChart;

