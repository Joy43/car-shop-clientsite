"use client";
import Loading from "../../../Components/Loading";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useDeleteWishlistMutation,
  useGetAllwishlistQuery,
} from "../../../redux/features/wishlist/wishlist.api";
import { useAppSelector } from "../../../redux/hooks";

const UserWishlist = () => {
  const { data, isLoading, isError } = useGetAllwishlistQuery([]);
  const [deleteWishlist] = useDeleteWishlistMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentUserEmail = currentUser?.email;

  const wishlist = data?.data?.filter(
    (item: any) => item?.user?.email === currentUserEmail
  ) || [];

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      await deleteWishlist(wishlistId).unwrap();
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  if (isLoading)
    return <Loading/>;
  if (isError)
    return (
      <p className="text-center text-red-500">Error loading wishlist</p>
    );

  return (
    <div className="py-6 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Your Wishlist</h2>
        <span className="text-red-500 text-lg font-semibold">
          Total Favorite: {wishlist.length}
        </span>
      </div>

      {/* Wishlist Items */}
      <div className="grid gap-6">
        {wishlist.map((item: any) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-white shadow-md rounded-lg border"
          >
            {/* Product Image */}
            <div className="w-full md:w-40 h-40">
              <img
                src={item?.car?.imageUrls?.[0] || "/placeholder.jpg"}
                alt={item?.car?.model}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item?.car?.brand} {item?.car?.model}
                </h3>
                <p className="text-gray-600 text-sm">
                  Category: {item?.car?.category}
                </p>
                <p className="text-gray-600">৳ {item?.car?.price}</p>
              </div>

              {/* Price & Remove Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {wishlist.length === 0 && (
          <p className="text-center text-gray-500">No items in wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default UserWishlist;
