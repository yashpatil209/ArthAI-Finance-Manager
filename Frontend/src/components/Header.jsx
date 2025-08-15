import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="w-full bg-transparent shadow-sm p-4 z-50 relative">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-500">ArthAi</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          {/* <li>
            <Link
              to="/"
              className="hover:text-blue-500 transition duration-200"
            >
              Home
            </Link>
          </li> */}
          
          {!currentUser ? (
            <>
              <li>
                <Link
                  to="/register"
                  className="hover:text-blue-500 transition duration-200"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                >
                  SignIn
                </Link>
              </li>
            </>
          ) : (
            <Dropdown
              label={
                <div className="w-8 h-8 rounded-full p-1 bg-rose-500">
                  {currentUser.name.substring(0, 1).toUpperCase()}
                </div>
              }
              arrowIcon={null}
              inline
            >
              <Dropdown.Item>
                <Link to={"/dashboard"}>DashBoard</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/logout"}>LogOut</Link>
              </Dropdown.Item>
            </Dropdown>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex gap-3 md:hidden">
          {currentUser && (
            <Dropdown
              label={
                <div className="w-8 h-8 rounded-full p-1 text-white bg-rose-500">
                  {currentUser.name.substring(0, 1).toUpperCase()}
                </div>
              }
              arrowIcon={null}
              inline
            >
              <Dropdown.Item>
                <Link to={"/dashboard"}>DashBoard</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/logout"}>LogOut</Link>
              </Dropdown.Item>
            </Dropdown>
          )}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-center text-gray-700 font-medium ">
          <li>
            <Link
              to="/"
              className="block py-2 hover:text-blue-500 transition duration-200 text-white"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 hover:text-blue-500 transition duration-200 text-white"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="block py-2 hover:text-blue-500 transition duration-200 text-white"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-2 hover:text-blue-500 transition duration-200 text-white"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          {!currentUser && (
            <>
              <li>
                <Link
                  to="/register"
                  className="hover:text-blue-500 transition duration-200 text-white"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-white ">
                  SignIn
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
