import React, { useState, useEffect } from 'react';
import { Pie } from '@nivo/pie'; // Import Pie component
import { getTransactionListByMonth } from '../../API/services';

export const PieChartComponent = ({ date }) => {
  const transactionList = getTransactionListByMonth(date)
  const [incomeAmount, setIncome] = useState(0);
  const [expensesAmount, setExpenses] = useState(0);

  useEffect(() => {
    const inc = transactionList.filter((x) => x.type === 1);
    const exp = transactionList.filter((x) => x.type === -1);
    console.log(inc)

    const incAmount = inc.reduce((acc, curr) => acc + Number(curr.amount), 0);
    setIncome(incAmount);
    console.log(incAmount)

    const expAmount = exp.reduce((acc, curr) => acc + Number(curr.amount), 0);
    setExpenses(expAmount);
    console.log(expAmount)
  }, [date, transactionList]);

  const data = [
    {
      "id": "Income",
      "value": incomeAmount,
      "color": "hsl(195, 70%, 50%)" // Optional custom color
    },
    {
      "id": "Expenses",
      "value": expensesAmount,
      "color": "hsl(0, 70%, 50%)" // Optional custom color
    }
  ];

  return (
    <Pie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      outerRadius={0.8}
      cornerRadius={3} // Add rounded corners to slices
      colors={['#0088FE', '#FF8042']} // Override default colors (optional)
      borderWidth={1} // Add border to slices
      borderColor={'gray'} // Set border color
      arcLabelsPosition="hover" // Display labels on hover
      arcLabelText={(datum) => `${datum.id}: ${datum.value}`} // Format arc label text
      arcLabelTextColor="gray" // Set arc label text color
    />
  );
};
