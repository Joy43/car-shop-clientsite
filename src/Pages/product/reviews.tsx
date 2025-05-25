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
    <div className="mt-10 border-t pt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Customer Reviews ({reviews.length})
        </h3>
        {currentUser && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-red-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full border border-gray-300 p-2 rounded mb-3 resize-none"
          />
          <div className="flex items-center mb-3">
            <span className="mr-2 font-semibold text-gray-700">Rating:</span>
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                onClick={() => setRating(i + 1)}
                className="text-2xl"
              >
                {i < rating ? (
                  <AiFillStar className="text-yellow-400" />
                ) : (
                  <AiOutlineStar className="text-gray-400" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
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
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500">Be the first to review this vehicle</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r: any) => (
            <div
              key={r._id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">
                  {r.user?.name || "Anonymous"}
                </h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) =>
                    i < r.rating ? (
                      <AiFillStar
                        key={i}
                        className="text-yellow-400 text-lg"
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="text-gray-400 text-lg"
                      />
                    )
                  )}
                </div>
              </div>
              <p className="text-gray-700">{r.review}</p>
              <p className="text-sm text-gray-400 mt-2">
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
