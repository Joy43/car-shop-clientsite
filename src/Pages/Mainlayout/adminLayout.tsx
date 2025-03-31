import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaFolder,
  FaCalendarAlt,
  FaFileAlt,
  FaSearch,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
    isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white h-full p-4 transition-all duration-300 flex flex-col relative`}
      >
        {/* Toggle Button */}
        <button
          className="absolute top-4 right-4 text-white focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 mt-6">
          <div className="w-10 h-10 bg-green-500 rounded-full"></div>
          {isSidebarOpen && <h1 className="text-lg font-semibold">User Pro</h1>}
        </div>

        {/* Search Bar */}
        {isSidebarOpen && (
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white w-full p-2 pl-10 rounded-md focus:outline-none"
            />
          </div>
        )}

        {/* Menu Items */}
        <ul className="space-y-2 flex-1">
          {[
            { to: "/admindashboard/adminhome", icon: FaHome, label: "User Home" },
            { to: "#", icon: FaChartBar, label: "Analytics" },
            { to: "#", icon: FaUsers, label: "Team" },
            { to: "#", icon: FaFolder, label: "Projects" },
            { to: "#", icon: FaCalendarAlt, label: "Calendar" },
            { to: "/", icon: FaFileAlt, label: "Home" },
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 rounded-md cursor-pointer transition-colors duration-300 ${
    isActive ? "bg-green-600" : "hover:bg-gray-700"}
                `}
              >
                <item.icon size={22} />
                {isSidebarOpen && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <div className="mt-auto flex items-center gap-2 p-2 bg-gray-800 rounded-md">
          <FaUser size={24} />
          {isSidebarOpen && (
            <div>
              <p className="font-semibold">Tom Cook</p>
              <p className="text-sm text-gray-400">View profile</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
