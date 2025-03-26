import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logoGif.gif";
import { FaRegUserCircle } from "react-icons/fa";
export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-primary hover:text-secondary">
          <img src={logo} alt="Logo" className="h-14 w-14 mr-2 bg-transparent" />
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
            <li className="group relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="hover:text-primary transition-colors duration-300"
              >
                Services
              </button>
              {/* -------------- Dropdown Menu ---------------------*/}
              <ul className={`absolute left-0 bg-white shadow-md py-2 mt-1 rounded-md w-48 transition-all duration-300 ${servicesDropdownOpen ? "block" : "hidden"}`}>
                <li><Link to="/service-1" className="block px-4 py-2 hover:bg-gray-100">Service 1</Link></li>
                <li><Link to="/service-2" className="block px-4 py-2 hover:bg-gray-100">Service 2</Link></li>
                <li><Link to="/service-3" className="block px-4 py-2 hover:bg-gray-100">Service 3</Link></li>
              </ul>
            </li>
            <li><Link to="/contact" className="hover:text-primary transition-colors duration-300">Contact</Link></li>
            <li>
              <Link to="/get-started" className="bg-black hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors duration-300">
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/*-------------  Mobile Menu  ---------------*/}
      <nav className={`md:hidden bg-gray-50 border-t border-gray-200 transition-all duration-300 ease-in-out ${mobileMenuOpen ? "block" : "hidden"}`}>
        <ul className="px-4 py-2">
          <li><Link to="/" className="block py-2 hover:text-primary">Home</Link></li>
          <li><Link to="/about" className="block py-2 hover:text-primary">About</Link></li>
          <li>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="block py-2 hover:text-primary w-full text-left"
            >
              Services
            </button>
            {/* Mobile Dropdown */}
            <ul className={`pl-4 ${servicesDropdownOpen ? "block" : "hidden"}`}>
              <li><Link to="/service-1" className="block py-2 hover:text-primary">Service 1</Link></li>
              <li><Link to="/service-2" className="block py-2 hover:text-primary">Service 2</Link></li>
              <li><Link to="/service-3" className="block py-2 hover:text-primary">Service 3</Link></li>
            </ul>
          </li>
          <li><Link to="/contact" className="block py-2 hover:text-primary">Contact</Link></li>
          <li>
            <Link to="/get-started" className="block py-2 bg-primary hover:bg-secondary text-white rounded-md text-center transition-colors duration-300">
            <FaRegUserCircle />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};