import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logoGif.gif";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { FaUserCircle } from "react-icons/fa";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
console.log(currentUser);
  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
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
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-primary transition-colors duration-300">Home</Link>
          <Link to="/about" className="hover:text-primary transition-colors duration-300">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors duration-300">Contact</Link>
          
          {currentUser ? (
            <div className="relative">
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 hover:text-primary transition-colors duration-300"
              >
                <FaUserCircle className="text-2xl" />
              </button>
              {userDropdownOpen && (
                <ul 
                  className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 py-2 transition-opacity duration-300"
                >
                  <li className="px-4">
                    Name: {currentUser.name}
                  </li>
                  <li>
                    <Link to={dashboardLink} className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-50 border-t border-gray-200 py-2">
          <ul className="px-4">
            <li><Link to="/" className="block py-2 hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="block py-2 hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="block py-2 hover:text-primary">Contact</Link></li>
            {currentUser ? (
              <>
                <li>
                  <Link to={dashboardLink} className="block py-2 hover:text-primary">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="w-full text-left py-2 hover:text-primary">Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="block py-2 bg-red-500 hover:bg-secondary text-white rounded-md text-center transition-colors duration-300">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};