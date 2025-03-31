import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logoGif.gif";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const dashboardLink = currentUser?.role === "admin" ? "/admindashboard" : "/userdashboard";

  return (
    <header className="bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-primary hover:text-secondary">
          <img src={logo} alt="Logo" className="h-16 w-16 mr-2 bg-transparent" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 hover:text-primary focus:outline-none transition-colors duration-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors duration-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors duration-300">Contact</Link></li>
            <li className="group relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="hover:text-primary transition-colors duration-300"
              >
                Profile
              </button>
              <ul className={`absolute p-4 left-0 bg-white shadow-md py-2 mt-1 rounded-md w-48 transition-all duration-300 ${servicesDropdownOpen ? "block" : "hidden"}`}>
                <li>
                  <button onClick={handleLogout} className="w-full text-left">Logout</button>
                </li>
              </ul>
            </li>
            {currentUser ? (
              <li>
                <Link to={dashboardLink} className="bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                  Dashboard
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="bg-red-500 hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors duration-300">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      <nav className={`md:hidden bg-gray-50 border-t border-gray-200 transition-all duration-300 ease-in-out ${mobileMenuOpen ? "block" : "hidden"}`}>
        <ul className="px-4 py-2">
          <li><Link to="/" className="block py-2 hover:text-primary">Home</Link></li>
          <li><Link to="/about" className="block py-2 hover:text-primary">About</Link></li>
          <li><Link to="/contact" className="block py-2 hover:text-primary">Contact</Link></li>
          <li>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="block py-2 hover:text-primary w-full text-left"
            >
              Profile
            </button>
            <ul className={`pl-4 ${servicesDropdownOpen ? "block" : "hidden"}`}>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </li>
          {currentUser ? (
            <li>
              <Link to={dashboardLink} className="block py-2 bg-red-500 hover:bg-green-600 text-white rounded-md text-center transition-colors duration-300">
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="block py-2 bg-red-500 hover:bg-secondary text-white rounded-md text-center transition-colors duration-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
