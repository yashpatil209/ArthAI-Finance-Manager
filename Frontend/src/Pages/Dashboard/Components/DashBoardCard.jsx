import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BellIcon,
  CreditCard,
  DollarSign,
  LineChart,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  PieChart,
  Activity,
  IndianRupee,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getData } from "@/api/api";
import ToastInput from "./Buget";

export default function DashBoardCard() {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  const { token, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(
          `/transaction/getalltransactionbyuserid?userId=${currentUser.userId}`,
          token
        );

        setTransactions(result);
        const response = await getData(`/transaction/getbudget/${currentUser.userId}`, token)
        setBudget(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getTotalExpenses = (transactions) => {
    return transactions
      .filter((t) => t.type === "Debit")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getInvestmentsByCategory = (transactions) => {
    const investments = transactions.filter((t) => t.category === "Investment"); // Assuming investments are marked as "Credit"

    return getTotalExpenses(investments);
  };

  const getLastMonthExpenses = (transactions) => {
    const today = new Date();
    const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1; // Handles January case
    const lastMonthYear =
      today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();

    return transactions
      .filter((t) => {
        const date = new Date(t.date);
        return (
          date.getMonth() === lastMonth &&
          date.getFullYear() === lastMonthYear &&
          t.type === "Debit"
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getLastMonthIncome = (transactions) => {
    const today = new Date();
    const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
    const lastMonthYear =
      today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();

    return transactions
      .filter((t) => {
        const date = new Date(t.date);
        return (
          date.getMonth() === lastMonth &&
          date.getFullYear() === lastMonthYear &&
          t.type === "Credit"
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹ {getTotalExpenses(transactions)}
          </div>
          <div className="flex items-center space-x-2 text-xs text-green-500">
            {/* <ArrowUpRight className="h-4 w-4" />
            <span>+20.1% from last month</span> */}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Monthly Expenses
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹ {getLastMonthExpenses(transactions)}
          </div>
          <div className="flex items-center space-x-2 text-xs text-red-500">
            {/* <ArrowDownRight className="h-4 w-4" />
            <span>+4.1% from last month</span> */}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹ {getLastMonthIncome(transactions)}
          </div>
          <div className="flex items-center space-x-2 text-xs text-green-500">
            {/* <ArrowUpRight className="h-4 w-4" />
            <span>+12.5% from last month</span> */}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Your Budget</CardTitle>
          {/* <LineChart className="h-4 w-4 text-muted-foreground" /> */}
          <ToastInput className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹ {budget}
          </div>
          <div className="flex items-center space-x-2 text-xs text-green-500">
            {/* <ArrowUpRight className="h-4 w-4" /> */}
            {/* <span>+8.2% from last month</span> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
