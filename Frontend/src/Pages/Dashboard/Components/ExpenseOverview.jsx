import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { getData } from "@/api/api";

export default function ExpenseOverview({ currentYear }) {
  const [transactions, setTransactions] = useState([]);
  const { token, currentUser } = useSelector((state) => state.user);

  const fetchData = async () => {
    try {
      const result = await getData(
        `/transaction/year/${currentYear}/user/${currentUser.userId}`,
        token
      );
      setTransactions(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentYear]);

  const data = [];

  // Helper function to parse month name from date string
  function getMonthName(date) {
    const monthIndex = new Date(date).getMonth();
    return new Date(0, monthIndex).toLocaleString("default", {
      month: "short",
    });
  }

  // Aggregating income and expenses by month
  transactions.forEach((transaction) => {
    const month = getMonthName(transaction.date);
    const isIncome = transaction.type === "Credit";

    // Find existing entry for the month
    let entry = data.find((e) => e.name === month);

    if (!entry) {
      entry = { name: month, income: 0, expenses: 0 };
      data.push(entry);
    }

    // Add income or expense
    if (isIncome) {
      entry.income += transaction.amount;
    } else {
      entry.expenses += transaction.amount;
    }
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data.reverse()}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹ ${value}`}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#4ade80"
          strokeWidth={2}
          dot={false}
          name="Income"
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#f43f5e"
          strokeWidth={2}
          dot={false}
          name="Expenses"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
