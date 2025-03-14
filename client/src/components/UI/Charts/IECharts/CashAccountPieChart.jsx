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

const CashAccountPieChart = ({ cashAccountData }) => {
  return (
    <div className="section-primary mb-3" >
      <h5 className="text-center mt-2">Cash Account Breakdown</h5>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Tooltip content={CustomTooltip} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
          <Pie
            data={cashAccountData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="cashBalance"
            nameKey="name"
            labelLine={false}
          >
            {cashAccountData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashAccountPieChart;