import { IoChevronDownCircleSharp } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdWifiCalling1 } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

const Nabvbartop = () => {
  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-salt-400 text-black px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center text-sm font-medium">
          <CiDeliveryTruck className="text-red-400 text-xl mr-2" />
          <span>40+ outlets nationwide with international delivery</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-1 hover:text-orange-300 cursor-pointer">
            <MdWifiCalling1 />
            <span className="text-sm">01701677162</span>
          </div>
          <div className="flex items-center gap-1 hover:text-orange-300 cursor-pointer">
            <span className="text-sm">English</span>
            <IoChevronDownCircleSharp />
          </div>
          <div className="flex items-center gap-1 hover:text-orange-300 cursor-pointer">
            <span className="text-sm">Taka</span>
            <TbCoinTaka />
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-3 border-b border-gray-200">
        <p className="text-sm font-semibold text-gray-800">Car Shop</p>
        <ul className="flex gap-6 text-sm text-gray-700">
          <li className="hover:text-red-500 transition-colors duration-200">
            <Link to="/contact">About Us</Link>
          </li>
          <li className="hover:text-purple-600 transition-colors duration-200">
            <Link to="/compare">Compare (0)</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nabvbartop;
