import React, { useState, useEffect } from "react";
import ExpensePieChart from "./Components/ExpensePieChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PaddingAnglePieChart from "./Components/PaddingAnglePieChart";
import { getData } from "@/api/api";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExpenseOverview from "./Components/ExpenseOverview";

const Analysis = () => {
  const [data, setData] = useState([]);
  const { token, currentUser } = useSelector((state) => state.user);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(1);
  const monthName = new Date(2025, selectedMonth - 1).toLocaleString(
    "default",
    { month: "long" }
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based

  const [Year, setYear] = useState(2025);

  const handleChange = (value) => {
    setYear(value);
  };
  console.log(selectedMonth);
  // Generate months based on the selected year
  const months = Array.from(
    { length: selectedYear === currentYear ? currentMonth : 12 },
    (_, i) => i + 1
  );

  const fetchData = async () => {
    try {
      const result = await getData(
        `/transaction/month/${selectedMonth}/user/${currentUser.userId}`,
        token
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedMonth !== null && currentUser?.userId) {
      // Ensure month and userId are available
      fetchData();
    }
  }, [selectedMonth, currentUser?.userId, token]);

  return (
    <div className="pt-5 w-full">
      <div className="flex justify-between">
        <div className="bg-white p-5 flex-1">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Expense By Category</h1>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {selectedMonth ? `${monthName}` : "Select a Month"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {new Date(2025, month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex justify-center items-center">
            <ExpensePieChart transactions={data} />
          </div>
        </div>
        {/* <PaddingAnglePieChart/> */}
      </div>
      <div className="w-full">
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
                <Select value={Year} onValueChange={handleChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>
                      {Year ? Year : "Select a Year"}
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
              <ExpenseOverview currentYear={Year} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
