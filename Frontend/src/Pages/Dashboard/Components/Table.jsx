import React, { useState } from "react";
import { Checkbox, Table, Tooltip, Pagination } from "flowbite-react";
import { Plus, FilePenLine, Trash2 } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function TransactionTable({
  data,
  totalPages,
  currentPage,
  onPageChange,
}) {
  const { token, currentUser } = useSelector((state) => state.user);

  const handleDelete = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.API_URL}/transaction/delete/${id}`,
        {}, // Empty body since it's a PUT request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className=" mx-auto max-w-screen-2xl">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-800">All Transactions</span>
                </h5>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add new product
                </button>
                <a href="/dashboard/addtransaction">
                  <button
                    type="button"
                    className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <Plus className="w-4 mr-2" /> Add Transaction
                  </button>
                </a>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Amount
                    </th>

                    <th scope="col" className="px-4 py-3">
                      Edit
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="w-4 px-4 py-3">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            onclick="event.stopPropagation()"
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-[400] text-gray-900 whitespace-nowrap dark:text-white">
                        {item.date}
                      </td>
                      <td className="px-4 py-2 font-[400] text-gray-900 whitespace-nowrap dark:text-white">
                        <Tooltip
                          className="z-40 relative"
                          content={item.description}
                          style="light"
                        >
                          <span
                            style={{
                              display: "inline-block",
                              maxWidth: "100%",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            className="truncate"
                          >
                            {item.description.split(" ").slice(0, 5).join(" ")}
                            {item.description.split(" ").length > 5 && "..."}
                          </span>
                        </Tooltip>
                      </td>

                      <td className="px-4 py-2 font-[400] text-gray-900 whitespace-nowrap dark:text-white">
                        {item.category}
                      </td>
                      <td className="px-4 py-2 font-[500] text-gray-900 whitespace-nowrap dark:text-white">
                        <span
                          className={`${
                            item.type === "Debit"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item.type === "Debit" ? `-` : `+`} &#8377;{" "}
                          {item.amount}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-normal text-gray-900 whitespace-nowrap dark:text-white">
                        <a href={`/dashboard/transaction/edit/${item.id}`}>
                          <FilePenLine className="w-4 h-4 text-blue-600" />
                        </a>
                      </td>
                      <td className="px-4 py-2 font-normal text-gray-900 whitespace-nowrap dark:text-white">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(item.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Page
                <span className="ml-3 font-semibold text-gray-900 dark:text-white">
                  {currentPage}-{totalPages}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <div className="flex overflow-x-auto sm:justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    previousLabel=""
                    nextLabel=""
                    showIcons
                  />
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
