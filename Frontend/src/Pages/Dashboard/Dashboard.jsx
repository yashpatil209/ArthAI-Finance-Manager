import React, { useState } from "react";
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
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DashBoardCard from "./Components/DashBoardCard";
import ExpenseOverview from "./Components/ExpenseOverview";
import { RecentTransactions } from "./Components/RecentTransaction";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ExpensePieChart from "./Components/ExpensePieChart";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(2025);

  const handleChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <div className="w-full pt-6">
      <DashBoardCard />
      <div className="flex gap-5 mt-5 flex-col lg:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Cash Flow</CardTitle>
                <CardDescription>
                  Your income and expenses over time
                </CardDescription>
              </div>
              <Select value={selectedYear} onValueChange={handleChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    {selectedYear ? selectedYear : "Select a Year"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ExpenseOverview currentYear={selectedYear} />
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-5 mt-5 flex-col lg:flex-row">
        {/* <Card className="">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
              </div>
              <Link to={"/dashboard/alltransaction"}>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ExpensePieChart />
          </CardContent>
        </Card> */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
              </div>
              <Link to={"/dashboard/alltransaction"}>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
