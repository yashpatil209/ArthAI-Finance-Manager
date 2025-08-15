import React, { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { getData } from "@/api/api";

export function RecentTransactions() {
  const [data, setData] = useState([]);
  const { token, currentUser } = useSelector((state) => state.user);

  const fetchData = async () => {
    try {
      const result = await getData(
        `/transaction/gettransactions/${
          currentUser.userId
        }?page=${0}&size=5&sortBy=date&sortOrder=DESC`,
        token
      );

      setData(result.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-4">
        {data.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <div
                  className={`w-full h-full flex items-center justify-center ${
                    transaction.type != "Debit" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {transaction.type != "Debit" ? "+" : "-"}
                </div>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {transaction.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.date}
                </p>
              </div>
            </div>
            <div
              className={`text-sm font-medium ${
                transaction.type != "Debit" ? "text-green-500" : "text-red-500"
              }`}
            >
              ₹ {Math.abs(transaction.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
