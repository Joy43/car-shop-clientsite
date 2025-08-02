import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useDeleteWishlistMutation,
  useGetAllwishlistQuery,
} from "../../../redux/features/wishlist/wishlist.api";
import { useAppSelector } from "../../../redux/hooks";

import { FaBuysellads, FaTrashAlt } from "react-icons/fa";

const UserWishlist = () => {
  const { data, isLoading, isError } = useGetAllwishlistQuery([]);
  const [deleteWishlist] = useDeleteWishlistMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;

  const wishlist =
    data?.data?.filter((item: any) => item?.user?.email === currentUserEmail) ||
    [];

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      await deleteWishlist(wishlistId).unwrap();
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600 font-semibold">
          Please log in to view your wishlist.
        </p>
      </div>
    );
  }
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-600 font-semibold mt-10">
        Error loading wishlist.
      </p>
    );

  return (
    <div className="w-full px-4 md:px-10 py-12 bg-gradient-to-b from-white via-purple-50 to-white min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-purple-300 pb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide">
          My Wishlist
        </h2>
        <span className="text-red-400 font-semibold text-lg mt-3 sm:mt-0">
          Total Favorites: {wishlist.length}
        </span>
      </div>

      {/* Wishlist Items */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {wishlist.length === 0 && (
          <p className="text-center text-gray-500 mt-16 text-lg font-medium">
            No items in your wishlist.
          </p>
        )}

        {wishlist.map((item: any) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="w-full md:w-40 h-40 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={item?.car?.imageUrls?.[0] || "/placeholder.jpg"}
                alt={item?.car?.model}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Info and Actions */}
            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
              {/* Product Info */}
              <div className="text-left flex-1">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {item?.car?.brand} {item?.car?.model}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {item?.car?.category}
                </p>
                <p className="text-xl text-purple-700 font-bold mt-3">
                  ৳ {item?.car?.price.toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                <Link
                  to={`/product/${item?.car?._id}`}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-purple-700 transition"
                  aria-label={`Buy ${item?.car?.model} now`}
                >
                  <FaBuysellads /> Buy Now
                </Link>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-red-600 border border-red-400 rounded-lg hover:bg-red-50 transition"
                  aria-label={`Remove ${item?.car?.model} from wishlist`}
                >
                  <FaTrashAlt /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserWishlist;
