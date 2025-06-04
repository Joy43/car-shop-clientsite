import { useState } from "react";
import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
import logo from "../../assets/logo/carlogo.gif"
import { TbLogout2 } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { BsBuildings} from "react-icons/bs";
import { Link } from "react-router-dom";
import Nabvbartop from "./Nabvbartop";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";

export const Navbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setAccountMenuOpen(false);
  };

  const dashboardLink =
    currentUser?.role === "admin" ? "/admindashboard/addcarproduct" : "/userdashboard";

  return (
   <header className="bg-stone-50 text-lg shadow-lg sticky top-0 z-50">
  <Nabvbartop />
  <nav className="px-4 py-3 flex justify-between items-center w-full">
    {/* Logo */}
    <Link to="/">
      <img src={logo} alt="logo" className="w-[45px] md:w-[55px]" />
    </Link>

    {/* Search bar - only on md+ */}
    <div className="relative md:flex hidden w-[250px]">
      <input
        className="w-full py-1.5 pr-4 border border-gray-400 pl-10 rounded-full outline-none focus:border-[#f83b6a]"
        placeholder="Search..."
      />
      <IoIosSearch className="absolute top-[9px] left-3 text-gray-600 text-lg" />
    </div>

    {/* Desktop Menu */}
    <ul className="hidden md:flex gap-5 text-gray-600 items-center  relative">
      <li>
        <Link to="/contract">Contract</Link>
      </li>
<Link to="/carblog" className="block hover:text-[#f83b6a]">Blogs</Link>
      {/* Product Dropdown */}
      <li
        className="relative group"
        onMouseEnter={() => setIsProductHover(true)}
        onMouseLeave={() => setIsProductHover(false)}
      >
        <div className="flex items-center gap-1 cursor-pointer">
          <FaCar className="text-red-500 text-base" />
          Products
          <IoIosArrowUp
            className={`transition-transform duration-300 ${isProductHover ? "rotate-0" : "rotate-180"}`}
          />
        </div>

        {/* Dropdown */}
        <div
          className={`absolute left-0 top-[100%] mt-2 bg-white rounded-md p-5 w-max shadow-lg z-30 transition-all duration-300 ${
            isProductHover ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Section 1 */}
            <div>
              <h3 className="text-gray-500 mb-2 font-medium">More Products</h3>
              <div className="space-y-2">
                <Link to="/product" className="flex items-start gap-2 group">
                  <img src="https://i.ibb.co/LQBDJGD/icon-logo-container.png" className="w-7 h-7" />
                  <div>
                    <p className="font-medium group-hover:text-[#f83b6a]">Luxury Car</p>
                    <p className="text-sm text-gray-400">Most popular car</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Section 2 */}
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

    {/* Right User Menu */}
    <div className="flex items-center gap-4">
      {/* Account Section */}
      {currentUser ? (
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          >
            <img
              src={currentUser?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden sm:block text-sm text-gray-600">Name: {currentUser.name}</span>
            <IoIosArrowUp
              className={`transition-transform duration-300 hidden sm:block ${
                accountMenuOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </div>

          {/* Account Menu */}
          <div
            className={`absolute right-0 top-12 bg-white p-3 rounded-md shadow-md transition-all duration-300 text-sm ${
              accountMenuOpen ? "block" : "hidden"
            }`}
          >
            <p className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <FiUser />
              {currentUser.email}
            </p>
            <Link to={dashboardLink} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
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
        </div>
      ) : (
        <Link
          to="/login"
          className="px-3 py-2 bg-red-500 hover:bg-secondary text-white rounded-md text-sm"
        >
          Login Now
        </Link>
      )}

      {/* Mobile Menu Button */}
      <CiMenuFries
        className="text-2xl text-gray-700 cursor-pointer md:hidden"
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />
    </div>
  </nav>

  {/* Mobile Menu Dropdown */}
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
