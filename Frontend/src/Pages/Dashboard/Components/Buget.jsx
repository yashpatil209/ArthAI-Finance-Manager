import { postData } from "@/api/api";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const ToastInput = () => {
  const [inputValue, setInputValue] = useState(""); // Start with an empty string
  const { token, currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e, closeToast) => {
    e.preventDefault();

    try {
      await postData(
        `/transaction/user/${currentUser.userId}/budget/${inputValue}`,
        null,
        token
      );
      setInputValue("");
      closeToast();
      toast.success("Budget updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error updating budget:", error);
      setInputValue("");
      closeToast();
      toast.error("Failed to update budget!", { position: "top-right" });
    }
  };

  const showToast = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Enter a new Budget:</p>
          <form onSubmit={(e) => handleSubmit(e, closeToast)}>
            <input
              type="number"
              onChange={handleChange}
              className="border p-1 rounded w-full"
              required
            />
            <button
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="p-0">
      <a
        className="hover:bg-gray-200 p-0 rounded-full cursor-pointer"
        onClick={showToast}
      >
        <SquarePen className="w-4 h-4" />
      </a>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ToastInput;
