import React, { useState } from "react";
import { Camera, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { postData } from "@/api/api";
import { Card } from "@/components/ui/card";
import ScanReceipt from "./ScanReceipt";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";

function AddTransaction() {
  const [formData, setFormData] = useState({});
  const { token, currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await postData(
        `/transaction/addtransaction/${currentUser.userId}`,
        formData,
        token
      );
      setLoading(false);
      toast.success("Transaction added successfully!");
    } catch (e) {
      setLoading(false);
      toast.error("Transaction failed. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full mt-4 flex justify-center items-center">
        {/* <div className="w-full sm:w-[40rem]  bg-white rounded-2xl  p-6 space-y-6"> */}
        <Card className="w-full sm:w-[36rem]  rounded-2xl  p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Add Transaction
          </h1>

          <ScanReceipt />

          {/* <a href="">
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
              <Camera className="w-5 h-5" />
              <span>Scan Receipt with AI</span>
            </button>
          </a> */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <label className="block text-gray-700">Type</label>
                <select
                  id="type"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                  required
                >
                  <option className="">Select Type</option>
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
                  required
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
                  <option value="investment">Investment </option>
                  <option value="other">Other </option>
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
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700">Date</label>
              <div className="relative">
                <input
                  id="date"
                  type="date"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleChange}
                  required
                />
                {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700">Description</label>
              <input
                id="description"
                type="text"
                placeholder="Enter description"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-blue-800 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    {/* <span className="pl-3">Logging in...</span> */}
                  </>
                ) : (
                  "Add Transaction"
                )}
              </button>
            </div>
          </form>
        </Card>
      </div>
      {/* </div> */}
    </>
  );
}

export default AddTransaction;
