import { useState } from "react";
import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
import logo from "../../assets/logo/carlogo.gif"
import { TbLogout2 } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import {  MdOutlineArrowRightAlt } from "react-icons/md";
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
    <header className="bg-white px-4 shadow-lg py-4 sticky top-0 z-50 text-xl">
      <Nabvbartop />
      <nav className="flex items-center justify-between w-full relative">
        {/* logo */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="w-[55px]"
        /></Link>
 <div className="relative md:flex hidden">
                    <input
                        className="py-1.5 pr-4 border border-[#424242] pl-10 rounded-full outline-none focus:border-[#f83b6a]"
                        placeholder="Search..."/>
                    <IoIosSearch
                        className="absolute top-[9px] left-3 text-[#424242] text-[1.3rem]"/>
                </div>
        {/* nav links */}
        <ul className="items-center relative gap-[20px] text-[1rem] text-[#424242] md:flex hidden">

          <li>
            <Link to="/contract">
            Contract
            </Link>
          </li>
          {/*-------------- Product megamenu -------------*/}
          <li
            className={`${
              isProductHover ? "text-[#f83b6a]" : "text-gray-600"
            } flex items-center gap-[5px] cursor-pointer`}
            onMouseEnter={() => setIsProductHover(true)}
            onMouseLeave={() => setIsProductHover(false)}
          >
            <FaCar className="text-[1.1rem] text-red-500" />
            Products
            <IoIosArrowUp
              className={`${
                isProductHover ? "rotate-0" : "rotate-[-180deg]"
              } transition-all duration-300`}
            />

            {/* Mega menu car */}
            <div
              className={`${
                isProductHover
                  ? "translate-y-0 opacity-100 z-30"
                  : "translate-y-[20px] opacity-0 z-[-1]"
              } bg-white rounded-md w-full absolute top-[40px] left-0 p-[30px] transition-all duration-300 boxShadow flex flex-wrap gap-[30px]`}
            >
              <div className="grid grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[1.2rem] text-gray-500 font-[500]">More Products</h3>

                  {/* Product cards */}
                  {[
                    {
                      icon: "https://i.ibb.co/LQBDJGD/icon-logo-container.png",
                      title: "Demo App",
                      desc: "Lorem ipsum ",
                      color: "#FF5E5E",
                    },
                  
                  ].map((item, i) => (
                    <div key={i} className="flex float-start gap-[10px] group">
                      <img src={item.icon} alt="icon" className="w-[30px] h-[30px]" />
                      <div>
                        <h1 className="text-[1rem] text-gray-600 font-[500]">{item.title}</h1>
                        <p className="text-[0.9rem] text-gray-400 font-[300]">{item.desc}</p>
                        <button
                          className={`text-[${item.color}] mt-2 flex items-center gap-[4px] text-[0.9rem]`}
                        >
                          Call to action
                          <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                  <h3 className="text-[1.2rem] text-gray-500 font-[500]">Ecosystem</h3>

                  {[
                    {
                      icon: <BsBuildings className="text-[1.4rem] text-gray-600" />,
                      title: "Directory",
                    },
                    
                  ].map((item, i) => (
                    <div key={i} className="flex float-start gap-[10px]">
                      {item.icon}
                      <div>
                        <h1 className="text-[1rem] text-gray-600 font-[500]">{item.title}</h1>
                        <p className="text-[0.9rem] text-gray-400 font-[300]">
                           adipiscing elit
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured call-to-action area */}
              {/* <div className="flex flex-col gap-[20px] bg-gray-50 rounded-md p-[20px] w-full">
                {[
                  {
                    img: "https://i.ibb.co/VTqw5rY/img-container.png",
                    title: "Check the new app",
                    badge: "Featured",
                  },
                
                ].map((item, i) => (
                  <div key={i} className="flex float-start gap-[10px] group">
                    <img src={item.img} alt="cta" className="w-[100px]" />
                    <div>
                      <div className="mb-2 flex items-center gap-[5px]">
                        <h1 className="text-[1rem] text-gray-600 font-[500]">{item.title}</h1>
                        <p className="py-[3px] px-[8px] text-[0.6rem] text-gray-500 border border-gray-300 rounded-full text-center">
                          {item.badge}
                        </p>
                      </div>
                      <p className="text-[0.9rem] text-gray-400 font-[300]">
                        Lorem ipsum dolor sit amet, consect adipiscing elit
                      </p>
                      <button className="text-[#FF5E5E] mt-2 flex items-center gap-[4px] text-[0.9rem]">
                        Call to action
                        <MdOutlineArrowRightAlt className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </li>

        
           {/* user account */}
            <div className="flex items-center gap-[15px]">
{
  currentUser ? (
    <div className="flex items-center gap-[10px] cursor-pointer relative"
      onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
      <div className="relative">
        <img
          src={currentUser.image ? currentUser.image : 'https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1724605498~exp=1724609098~hmac=7f6fc106bae2c17b0c93af1b2e5483d9d8368f3e51284aaec7c7d50590d2bae5&w=740'}
          alt="avatar" className="w-[35px] h-[35px] rounded-full object-cover" />
        <div
          className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
      </div>

      <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden"> Name: {currentUser.name}</h1>

      <div
        className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}>
        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
          <FiUser />
          {currentUser.email}
        </p>
        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
          <IoSettingsOutline />
          <Link to={dashboardLink}>Dashboard</Link>
        </p>
        <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
          <FiUser />
          View Profile
        </p>

        <div className="mt-3 border-t border-gray-200 pt-[5px]">
          <p onClick={handleLogout} className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
            <TbLogout2 />
            Logout
          </p>
        </div>

      </div>

      <IoIosArrowUp
        className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 text-gray-600 sm:block hidden`} />

    </div>
  ) : (
    <button>
      <Link to="/login" className="block px-2 py-1 bg-red-500 hover:bg-secondary text-white rounded-md text-center transition-colors duration-300">
        Login
      </Link>
    </button>
  )
}

                <CiMenuFries onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                             className="text-[1.8rem] text-[#424242]c cursor-pointer md:hidden flex"/>
            </div>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <CiMenuFries
            className="text-2xl text-gray-700 cursor-pointer"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>
      </nav>
    </header>
  );
};
