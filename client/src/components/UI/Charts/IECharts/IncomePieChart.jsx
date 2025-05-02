import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`${payload[0].name}: $${payload[0].value} (${payload[0].payload.percentage}%)`}</p>
      </div>
    );
  }
  return null;
};

const IncomePieChart = ({ incomeData, legendHeight, isMobile}) => {
  return (
    <div className={isMobile ? 'mb-3' : ''}>
      <h5 className="text-center mt-2">Income breakdown</h5>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Tooltip content={CustomTooltip} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            height={legendHeight}
          />
          <Pie
            data={incomeData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="totalAmount"
            nameKey="category"
            labelLine={false}
          >
            {incomeData
              .filter(entry => entry.totalAmount > 0)
              .map(entry => (
              <Cell key={`cell-${entry.category}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomePieChart;