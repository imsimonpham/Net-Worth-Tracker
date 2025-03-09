import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].name}: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const IncomePieChart = ({ incomeData }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart margin={{ top: 20, right: 20, bottom: 120, left: 20 }}>
        <Tooltip content={CustomTooltip} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            paddingTop: 20,
            maxHeight: 100,
            overflow: 'auto',
          }}
        />
        <Pie
          data={incomeData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          nameKey="category"
          labelLine={false}
        >
          {incomeData.map((entry) => (
            <Cell key={`cell-${entry.category}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default IncomePieChart;