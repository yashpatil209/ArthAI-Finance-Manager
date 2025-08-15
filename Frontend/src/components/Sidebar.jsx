import React, { useState } from "react";
import {
  BarChart3,
  Users,
  Activity,
  Eye,
  ChevronRight,
  Plus,
  Minus,
  Settings,
  Calendar,
  Image,
  Mail,
  FileText,
  Layout,
  Package,
  LayoutGrid,
  IndianRupee,
  CirclePlus,
  Menu,
  X,
  Bell,
  Search,
  Focus,
  ChartColumnBig,
  Home,
  Bot,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", link: "/" },
  { icon: LayoutGrid, label: "Overview", link: "/dashboard" },
  {
    icon: IndianRupee,
    label: "All Transactions",
    link: "/dashboard/alltransaction",
  },
  { icon: ChartColumnBig, label: "Analysis", link: "/dashboard/analysis" },
  {
    icon: CirclePlus,
    label: "Add Transaction",
    link: "/dashboard/addtransaction",
  },
  {
    icon: Bot,
    label: "ChatBot",
    link: "/dashboard/chatbot",
  },
];

function Sidebar({ isOpen, onClose }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = useLocation().pathname;

  const handleCollapse = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      onClose();
    }
  };

  return (
    <div className="bg-gray-300">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] w-60 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 
        ${sidebarOpen ? "w-16" : ""}
        ${!isOpen ? "-translate-x-full lg:translate-x-0" : ""}`}
      >
        <div className="p-6 space-y-2 h-full overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className={`flex items-center gap-3 px-4 py-2 text-md font-semibold rounded-lg ${
                item.link == path
                  ? "text-white bg-blue-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5 font-semibold" />
              {item.label}
            </a>
          ))}
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
    // </div>
  );
}

export default Sidebar;
