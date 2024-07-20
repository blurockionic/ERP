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

const MonthlyOrdersChart = ({orders}) => {
 // Get the current year
const currentYear = new Date().getFullYear();

// Filter orders by the current year
const ordersThisYear = orders.filter((customer) => {
  const eventDate = new Date(customer.createdAt);
  return eventDate.getFullYear() === currentYear;
});

// Map month names to indices
// const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Initialize an array to count orders for each month
const ordersCount = Array(12).fill(0);

// Count orders for each month
ordersThisYear.forEach((customer) => {
  const eventDate = new Date(customer.createdAt);
  const month = eventDate.getMonth(); // 0 = January, 1 = February, etc.
  ordersCount[month]++;
});

// Update the data array with the counted orders
const updatedData = data.map((item, index) => ({
  name: item.name,
  orders: ordersCount[index]
}));


  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={updatedData}>
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
