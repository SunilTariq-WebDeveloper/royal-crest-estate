import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import {
  User,
  Star,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Context/auth";

const ReviewList = ({ propertyId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:7500/api/v1/review/${propertyId}`,
      );

      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setReviews(res.data);
      } else if (Array.isArray(res.data.reviews)) {
        setReviews(res.data.reviews);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error(err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

 

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
const hasReviewed = reviews.some((r) => r.user?._id === auth?.user?._id);
  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reviews & Ratings
          </h3>
          {reviews.length > 0 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </span>
          )}
        </div>
      </div>

      {/* Review List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Be the first to share your experience
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                {review.user?.avatar ? (
                  <img
                    src={review.user.avatar}
                    alt={`${review.user.first_name} ${review.user.last_name}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {getInitials(review.user?.first_name)}
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {review.user?.first_name} {review.user?.last_name || ""}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {review.rating}.0
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(review.createdAt || review.date)}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Review Form Section */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-orange-500" />
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Write a Review
          </h4>
        </div>
        {hasReviewed ? (
          <p className="mb-4 text-xl dark:text-white">
            You already submitted a review
          </p>
        ) : (
          <ReviewForm propertyId={propertyId} onReviewAdded={fetchReviews} />
        )}
      </div>
    </div>
  );
};

export default ReviewList;