import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import axios from "axios";

function EditTransaction() {
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { Id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/transaction/gettransaction/${Id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${process.env.API_URL}/transaction/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Transaction updated successfully!");
      navigate("/dashboard/alltransaction"); // Redirect after update
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("Failed to update transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-4 flex justify-center items-center">
      <Card className="w-full sm:w-[36rem] rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Edit Transaction
        </h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-2 flex-1">
              <label className="block text-gray-700">Type</label>
              <select
                id="type"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.type}
              >
                <option value="">Select Type</option>
                <option value="Debit">Debit</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
            <div className="space-y-2 flex-1">
              <label className="block text-gray-700">Category</label>
              <select
                id="category"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
                value={formData.category}
              >
                <option value="">Select category</option>
                <option value="food">Food & Dining</option>
                <option value="shopping">Shopping</option>
                <option value="transport">Transportation</option>
                <option value="bills">Bills & Utilities</option>
                <option value="healthcare">Healthcare</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="loan">Loan Payments</option>
                <option value="insurance">Insurance</option>
                <option value="investment">Investment</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <label className="block text-gray-700">Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="0.00"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleChange}
              value={formData.amount}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Date</label>
            <input
              id="date"
              type="date"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleChange}
              value={formData.date}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Enter description"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleChange}
              value={formData.description}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/alltransaction")}
              className="flex-1 py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Update Transaction"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EditTransaction;
