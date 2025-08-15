import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/User/Signup";
import Register from "./Pages/User/Register";
import Logout from "./Pages/User/Logout";
import Layout from "./Pages/Dashboard/layout";
import AddTransaction from "./Pages/Dashboard/AddTransaction";
import Sidebar from "./components/Sidebar";
import DashNavbar from "./components/DashNavbar";
import AllTransaction from "./Pages/Dashboard/AllTransactions";
import ScanReceipt from "./Pages/Dashboard/ScanReceipt";
import TransactionsPage from "./Pages/Dashboard/TransactionTable";
import Pagination from "./Pages/Dashboard/TransactionTable";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Analysis from "./Pages/Dashboard/Analysis";
import ChatBot from "./Pages/Dashboard/ChatBot";
import NotFound from "./Pages/NotFound";
import EditTransaction from "./Pages/Dashboard/EditTransaction";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <DashNavbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="pt-16 lg:pl-64">
        <div className="flex gap-4 overflow-x-auto pb-4 mx-4">{children}</div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Routes (No Sidebar, No Navbar) */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* Dashboard Routes (With Sidebar & Navbar) */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/addtransaction"
        element={
          <DashboardLayout>
            <AddTransaction />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/scanreceipt"
        element={
          <DashboardLayout>
            <ScanReceipt />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/alltransaction"
        element={
          <DashboardLayout>
            <AllTransaction />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/all"
        element={
          <DashboardLayout>
            <Pagination totalPages={5} />
          </DashboardLayout>
        }
      />

      <Route
        path="/dashboard/analysis"
        element={
          <DashboardLayout>
            <Analysis />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/chatbot"
        element={
          <DashboardLayout>
            <ChatBot />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/transaction/edit/:Id"
        element={
          <DashboardLayout>
            <EditTransaction />
          </DashboardLayout>
        }
      />

      {/* Catch-all route for 404 pages (optional) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
