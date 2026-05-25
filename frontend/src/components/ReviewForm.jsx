import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/auth.jsx";
import { errorToast, successToast } from "../messages/toastify.js";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, User, MessageSquare, AlertCircle } from "lucide-react";

const ReviewForm = ({ propertyId, onReviewAdded }) => {
  const [auth] = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const submitReview = async () => {
    if (!auth?.token) {
      errorToast("Please login first to submit a review");
      return;
    }

    if (rating === 0) {
      errorToast("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      errorToast("Please write a review comment");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:7500/api/v1/review/create",
        { propertyId, rating, comment },
        { headers: { Authorization: `Bearer ${auth.token}` } },
      );

      setRating(0);
      setComment("");
      if (onReviewAdded) onReviewAdded();
      successToast(
        "Review submitted successfully! Thank you for your feedback.",
      );
    } catch (err) {
      console.log(err.response?.data || err.message);
      errorToast(
        err.response?.data?.message || "Error adding review. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const ratingMessages = {
    1: "Poor - Could be much better",
    2: "Fair - Needs improvement",
    3: "Good - Satisfactory",
    4: "Very Good - Impressive",
    5: "Excellent - Outstanding!",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">Write a Review</h3>
        </div>
        <p className="text-orange-100 text-sm mt-1">
          Share your experience with this property
        </p>
      </div>

      <div className="p-6">
        {/* Rating Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-all"
                >
                  <Star
                    className={`w-8 h-8 transition-all ${
                      (hoverRating || rating) >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                    } ${rating === star ? "scale-110" : ""}`}
                  />
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {rating > 0 && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-3 text-sm font-medium text-orange-600 dark:text-orange-400"
                >
                  {ratingMessages[rating]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Click on stars to rate your experience
          </p>
        </div>

        {/* Review Text Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Review <span className="text-red-500">*</span>
          </label>
          <div
            className={`relative transition-all duration-200 ${
              focused ? "ring-2 ring-orange-500/20" : ""
            }`}
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Write your review here..."
              rows="4"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all resize-none"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {comment.length} characters
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <User className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {auth?.user?.first_name || "Guest"} • Will be displayed publicly
              </span>
            </div>
            {comment.length < 10 && comment.length > 0 && (
              <span className="text-xs text-orange-500">
                Minimum 10 characters recommended
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={submitReview}
          disabled={loading || rating === 0 || !comment.trim()}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Review</span>
            </>
          )}
        </motion.button>
        {!auth?.token && (
          <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <p className="text-xs text-orange-600 dark:text-orange-400">
              Please{" "}
              <a href="/login" className="font-semibold underline">
                login
              </a>{" "}
              to submit a review
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewForm;