import {ResponsiveContainer, Tooltip, Legend, Pie, PieChart, Cell } from 'recharts';

const IncomePieChart = ({incomeData}) => {
  return (
    <ResponsiveContainer width="100%" height={300} style={{border: "1px solid red"}}>
      <PieChart>
        <Tooltip content={CustomTooltip}/>
        <Legend/>
        <Pie 
          data={incomeData} cx="50%" cy="50%" outerRadius={80} 
          dataKey="value" nameKey="category"> 
          {incomeData.map((entry) => (
            <Cell key={`cell-${entry.category}`} fill={entry.color}/>
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({active, payload}) => {
  if(active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip px-2 bg-dark border rounded shadow-sm">
        <ul className="recharts-tooltip-item-list p-0 m-0">
          <li className="recharts-tooltip-item d-block py-1" style={{ color: "rgb(0, 0, 0)" }}>
            <span className="recharts-tooltip-label text-dark">{payload[0].name}</span>
            <span className="recharts-tooltip-item-separator text-dark"> : </span>
            <span className="recharts-tooltip-item-value text-dark">${payload[0].value}</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default IncomePieChart;