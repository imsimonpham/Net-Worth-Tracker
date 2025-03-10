import React, { useRef, useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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

const ExpensePieChart = ({ expenseData, setLegendHeight }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const getLegendHeight = () => {
      if (containerRef.current) {
        const legend = containerRef.current.querySelector(".recharts-legend-wrapper");
        if (legend) {
          if (legend.offsetHeight > 40) 
            setLegendHeight(legend.offsetHeight);
           else {
            legend.style.minHeight = "40px";
            setLegendHeight(legend.offsetHeight);
           }
        }
      }
    };
    const timeout = setTimeout(getLegendHeight, 100);

    return () => clearTimeout(timeout);
  }, [expenseData]);

  return (
    <div className="section-primary" ref={containerRef}>
      <h5 className="text-center mt-2">This month's expenses</h5>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
          <Pie
            data={expenseData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="category"
            labelLine={false}
          >
            {expenseData.map((entry) => (
              <Cell key={`cell-${entry.category}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
