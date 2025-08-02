import { IoChevronDownCircleSharp } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdWifiCalling1 } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetAllwishlistQuery } from "../../redux/features/wishlist/wishlist.api";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const Nabvbartop = () => {
  const { data } = useGetAllwishlistQuery([]);
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;

  const wishlist =
    data?.data?.filter((item: any) => item?.user?.email === currentUserEmail) ||
    [];

  return (
    <div className=" text-gray-800 px-4 py-2 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
      {/* Left - Delivery Info */}
      <div className="hidden md:flex items-center gap-2">
        <CiDeliveryTruck className="text-red-500 text-xl" />
        <span className="text-[13px]">
          40+ outlets nationwide with international delivery
        </span>
      </div>

      {/* Center - Links */}
      <ul className="flex items-center gap-6">
        <li className="hover:text-red-500 transition-colors duration-200">
          <Link to="/aboutcomany">About Us</Link>
        </li>
        <li className="hover:text-purple-600 transition-colors duration-200 relative">
          <Link
            to="/userdashboard/userWishlist"
            className="relative flex items-center"
          >
            <AiOutlineHeart className="text-xl text-red-500" />

            {/* Badge */}
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 text-[10px] text-white bg-red-600 w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
        </li>
      </ul>

      {/* Right - Language & Currency */}
      <div className="hidden md:flex items-center gap-6 text-gray-600">
        <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors duration-200">
          <MdWifiCalling1 />
          <span>01701677162</span>
        </div>
        <div className="flex items-center gap-1 hover:text-purple-500 cursor-pointer transition-colors duration-200">
          <span>English</span>
          <IoChevronDownCircleSharp />
        </div>
        <div className="flex items-center gap-1 hover:text-orange-500 cursor-pointer transition-colors duration-200">
          <span>Taka</span>
          <TbCoinTaka />
        </div>
      </div>
    </div>
  );
};

export default Nabvbartop;
