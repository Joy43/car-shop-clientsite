import {
  FaHome,
  FaUser,


  FaSearch,
 
} from "react-icons/fa";
import { BsCartCheck } from  "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { MdOutlineVerticalSplit } from "react-icons/md";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  // ---------logout function-----------------
  console.log(currentUser);
    const handleLogout = () => {
      dispatch(logout());
    
    };
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
          className="absolute cursor-pointer top-4 right-4 text-white focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MdOutlineVerticalSplit size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 mt-6">
          <div className="w-7 h-7 bg-red-500 rounded-full"></div>
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
            { to: "/userdashboard/userhome", icon:  FaUser, label: "User Profile" },
   
            { to: "/userdashboard/myorder", icon: BsCartCheck , label: "Order" },
            { to: "/", icon: FaHome , label: "Home" },
            
      
          ].map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 rounded-md cursor-pointer transition-colors duration-300 ${
    isActive ? "bg-red-600" : "hover:bg-gray-700"}
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
              <p className="font-semibold">{currentUser?.name}</p>
              <button  onClick={handleLogout} className="text-sm text-gray-400 cursor-pointer">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/*------------ Main Content --------------*/}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
