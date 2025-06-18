import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  useAddReviewMutation,
  useGetAllReviewQuery,
} from "../../redux/features/review/Review.api";
import { toast } from "sonner";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ReviewProps {
  productId: string;
}

const Reviews = ({ productId }: ReviewProps) => {
  const currentUser = useAppSelector(selectCurrentUser);

  const { data, isLoading, isError } = useGetAllReviewQuery([
    { name: "car", value: productId },
  ]);

  const [addReview] = useAddReviewMutation();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [showForm, setShowForm] = useState(false);

  const reviews = data?.data?.result || [];

  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      toast.error("Please write a review before submitting");
      return;
    }

    try {
      await addReview({
        user: currentUser?.userId,
        car: productId,
        review: reviewText,
        rating,
      }).unwrap();
      toast.success("Review submitted successfully!");
      setReviewText("");
      setRating(5);
      setShowForm(false);
    } catch (err: any) {
      const message =
        err?.data?.message || "Failed to submit review. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Customer Reviews ({reviews.length})
        </h3>
        {currentUser && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-red-600 hover:bg-blue-700 transition text-white font-medium px-5 py-2 rounded-lg shadow"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-8">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full h-28 resize-none border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-700 font-medium">Rating:</span>
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                className="text-2xl transition"
              >
                {i < rating ? (
                  <AiFillStar className="text-yellow-400" />
                ) : (
                  <AiOutlineStar className="text-gray-300" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-green-700 transition text-white font-semibold px-5 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </div>
      )}

      {isLoading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load reviews. Please try again.</p>
      ) : reviews.length === 0 ? (
        <div className="bg-white border border-gray-200 p-6 rounded-lg text-center text-gray-500">
          Be the first to review this vehicle.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r: any) => (
            <div
              key={r._id}
              className="bg-white shadow-md border border-gray-100 p-5 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900">
                  {r.user?.name || "Anonymous"}
                </h4>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) =>
                    i < r.rating ? (
                      <AiFillStar key={i} className="text-yellow-400 text-lg" />
                    ) : (
                      <AiOutlineStar key={i} className="text-gray-300 text-lg" />
                    )
                  )}
                </div>
              </div>
              <p className="text-gray-700">{r.review}</p>
              <p className="text-sm text-gray-400 mt-3">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
