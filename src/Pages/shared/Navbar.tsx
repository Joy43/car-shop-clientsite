import { useState } from "react";
import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { BsBuildings } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../../assets/logo/carlogo.gif";
import NavbarTop from "./Nabvbartop"; 
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";

export const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState<{ name: string; path: string }[]>([]);

  const allRoutes = [
    { name: "Contract", path: "/contract" },
    { name: "Blogs", path: "/carblog" },
    { name: "Products", path: "/product" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setAccountMenuOpen(false);
  };

  const dashboardLink =
    currentUser?.role === "admin" ? "/admindashboard/adminprofile" : "/userdashboard/userhome";

  return (
    <header className="bg-stone-50 text-lg shadow-lg sticky top-0 z-50">
      <NavbarTop />

      <nav className="px-4 py-3 flex justify-between items-center w-full relative">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-[45px] md:w-[55px]" />
        </Link>

        {/* Search Bar (Desktop only) */}
        <div className="relative md:flex hidden w-[250px]">
          <input
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setSearchQuery(value);
              setFilteredRoutes(
                value
                  ? allRoutes.filter((route) =>
                      route.name.toLowerCase().includes(value)
                    )
                  : allRoutes
              );
            }}
            className="w-full py-1.5 pr-4 border border-gray-400 pl-10 rounded-full outline-none focus:border-[#f83b6a]"
            placeholder="Search..."
          />
          <IoIosSearch className="absolute top-[9px] left-3 text-gray-600 text-lg" />
          {searchQuery && (
            <div className="absolute top-[110%] left-0 bg-white border border-gray-300 rounded-md shadow-md w-full z-50">
             {filteredRoutes.length > 0 ? (
  filteredRoutes.map((route) => (
    <Link
      key={route.path}
      to={route.path}
      onClick={() => {
        setSearchQuery(""); // ✅ Clear input after click
        setFilteredRoutes([]); // ✅ Clear dropdown
      }}
      className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
    >
      {route.name}
    </Link>
  ))
) : (
  <p className="px-4 py-2 text-sm text-gray-500">No results found</p>
)}

            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-5 text-gray-600 items-center relative">
          <li>
            <Link to="/contract" className="hover:text-[#f83b6a]">Contract</Link>
          </li>
          <li>
            <Link to="/carblog" className="hover:text-[#f83b6a]">Blogs</Link>
          </li>
          <li
            className="relative group"
            onMouseEnter={() => setIsProductHover(true)}
            onMouseLeave={() => setIsProductHover(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <FaCar className="text-red-500 text-base" />
             <Link to="/product" >
              Products
             </Link>
              <IoIosArrowUp
                className={`transition-transform duration-300 ${
                  isProductHover ? "rotate-0" : "rotate-180"
                }`}
              />
            </div>

            {/* ------------Dropdown------------------------- */}
            <div
              className={`absolute left-0 top-[100%] mt-2 bg-white rounded-md p-5 w-max shadow-lg z-30 transition-all duration-300 ${
                isProductHover
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-500 mb-2 font-medium">More Products</h3>
                  <Link to="/product" className="flex items-start gap-2 group">
                    <img
                      src="https://i.ibb.co/LQBDJGD/icon-logo-container.png"
                      className="w-7 h-7"
                      alt="icon"
                    />
                    <div>
                      <p className="font-medium group-hover:text-[#f83b6a]">Luxury Car</p>
                      <p className="text-sm text-gray-400">Most popular car</p>
                    </div>
                  </Link>
                </div>

                <div>
                  <h3 className="text-gray-500 mb-2 font-medium">Car Category</h3>
                  <Link to="/product" className="flex items-center gap-2">
                    <BsBuildings className="text-lg text-gray-600" />
                    <span>More than 10 car</span>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>

        {/* User Menu & Mobile Menu Icon */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <img
                  src={
                    currentUser?.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden sm:block text-sm text-gray-600">
                  {currentUser.name}
                </span>
                <IoIosArrowUp
                  className={`transition-transform duration-300 hidden sm:block ${
                    accountMenuOpen ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>

              {/* Dropdown */}
              {accountMenuOpen && (
                <div className="absolute right-0 top-12 bg-white p-3 rounded-md shadow-md transition-all duration-300 text-sm w-56">
                  <p className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                    <FiUser />
                    {currentUser.email}
                  </p>
                  <Link
                    to={dashboardLink}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  >
                    <IoSettingsOutline />
                    Dashboard
                  </Link>
                  <p className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                    <FiUser />
                    View Profile
                  </p>
                  <div className="border-t mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 hover:bg-red-50 p-2 rounded w-full"
                    >
                      <TbLogout2 />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3 py-2 bg-red-400 hover:bg-secondary text-white rounded-md text-sm"
            >
              Login Now
            </Link>
          )}

          <CiMenuFries
            className="text-2xl text-gray-700 cursor-pointer md:hidden"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileSidebarOpen && (
        <div className="md:hidden px-4 py-3 bg-white space-y-2 text-sm">
          <Link to="/contract" className="block hover:text-[#f83b6a]">Contract</Link>
          <Link to="/carblog" className="block hover:text-[#f83b6a]">Blogs</Link>
          <Link to="/product" className="block hover:text-[#f83b6a]">Products</Link>
          {currentUser && (
            <>
              <Link to={dashboardLink} className="block hover:text-[#f83b6a]">Dashboard</Link>
              <button onClick={handleLogout} className="block text-red-500 hover:underline">Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
