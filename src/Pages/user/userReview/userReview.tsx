import { useGetAllReviewQuery } from "../../../redux/features/review/Review.api";

const UserReview = () => {
  const { data, isLoading, isError } = useGetAllReviewQuery([]);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading reviews</p>;

const reviews = data?.data?.result || [];

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">All User Reviews</h2>
      <table className="min-w-full table-auto border border-gray-200 shadow-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">Car Image</th>
            <th className="p-2 border">Car Info</th>
            <th className="p-2 border">Review</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">User</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              <tr key={review._id} className="border-b hover:bg-gray-50">
                <td className="p-2 border">
                  <img
                    src={review.car?.imageUrls?.[0] || "/placeholder-car.jpg"}
                    alt="Car"
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-2 border">
                  <div className="font-semibold">{review.car?.brand || "N/A"}</div>
                  <div className="text-sm text-gray-500">{review.car?.model || ""}</div>
                </td>
                <td className="p-2 border">{review.review || "No review"}</td>
                <td className="p-2 border">{review.rating ?? "N/A"} ⭐</td>
                <td className="p-2 border">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        review.user?.image && review.user?.image !== "N/A"
                          ? review.user.image
                          : "/default-user.png"
                      }
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{review.user?.name || "Anonymous"}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserReview;
