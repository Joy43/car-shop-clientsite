import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaFolder,
  FaCalendarAlt,
  FaUser,
  FaBars,
  FaCarSide
} from "react-icons/fa";
import { MdOutlineVerticalSplit } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  // ---------logout function-----------------
  console.log(currentUser);
    const handleLogout = () => {
      dispatch(logout());
    
    };
  return (
    <div className="flex  bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
    isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 h-screen text-white  p-2 transition-all duration-300 flex flex-col relative`}
      >
        {/* Toggle Button */}
        <button
          className="absolute top-4 right-4 text-white focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MdOutlineVerticalSplit size={30} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 mt-10">
          <div className="w-10 h-10 bg-[#1C398E] rounded-full"></div>
          {isSidebarOpen && <h1 className="text-lg font-semibold">Admin: {currentUser?.name}</h1>}
        </div>


        {/*---------------  Menu Items ----------------- */}
        <ul className="space-y-2 flex-1">
          {[
       
            { to: "/admindashboard/adminprofile", icon: FaChartBar, label: "admin Analytics" },
            { to: "/admindashboard/managecar", icon: FaCarSide, label: "Car-Management" },
            { to: "/admindashboard/addcarproduct", icon:  IoBagAdd, label: "Add Cars" },
            { to: "/admindashboard/usermanage", icon: FaUser, label: "User-Manage" },
            { to: "/", icon: FaHome, label: " Home" },
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 rounded-md cursor-pointer transition-colors duration-300 ${
    isActive ? "bg-[#1C398E]" : "hover:bg-gray-700"}
                `}
              >
                <item.icon size={22} />
                {isSidebarOpen && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <div className="mt-auto flex items-center gap-2 p-2  rounded-md">
          <FaUser size={24} />
          {isSidebarOpen && (
            <div className="bg-gray-900">
              <p className="font-semibold">{currentUser?.name}</p>
              <button onClick={handleLogout} className="text-sm text-gray-400">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/*------------ Main Content ------------------ */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
