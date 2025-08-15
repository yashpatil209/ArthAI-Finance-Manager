import React, { useState } from "react";
import { BarChart3, Menu, Bell, Search, Plus, CirclePlus } from "lucide-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { current } from "tailwindcss/colors";
import { useSelector } from "react-redux";

export default function DashNavbar({ onMenuClick }) {
  const [openModal, setOpenModal] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-500 hidden sm:block" />
            <span className="font-semibold text-lg">ArthAi</span>
          </div>
        </div>

        {/* <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl mx-8">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div> */}

        <div className="flex items-center gap-3">
          <a href="/dashboard/addtransaction" className="mr-0 md:mr-5">
            <button
              type="button"
              className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <Plus className="w-4 mr-2 hidden sm:block" /> Add Transaction
            </button>
          </a>
          {/* <button
            onClick={() => setOpenModal(true)}
            className="p-2 rounded-lg hover:bg-gray-100 relative"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}
          <div className="w-8 h-8 rounded-full text-center pt-1 bg-rose-500 hidden text-white font-semibold sm:block">{currentUser.name.substring(0, 1).toUpperCase()}</div>
        </div>
      </div>
    </nav>
  );
}
