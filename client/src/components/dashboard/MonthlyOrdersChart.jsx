import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', orders: 30 },
  { name: 'Feb', orders: 20 },
  { name: 'Mar', orders: 50 },
  { name: 'Apr', orders: 40 },
  { name: 'May', orders: 70 },
  { name: 'Jun', orders: 60 },
  { name: 'Jul', orders: 80 },
  { name: 'Aug', orders: 90 },
  { name: 'Sep', orders: 100 },
  { name: 'Oct', orders: 110 },
  { name: 'Nov', orders: 120 },
  { name: 'Dec', orders: 130 },
];

const MonthlyOrdersChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyOrdersChart;
