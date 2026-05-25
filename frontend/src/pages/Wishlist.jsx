import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  ArrowUpRight,
  Trash2,
  Sparkles,
  Eye,
  Home,
  HeartOff,
} from "lucide-react";
import apis from "../../config/apis.js";
import axios from "axios";
import { successToast, warningToast } from "../messages/toastify.js";
import { useAuth } from "../Context/auth.jsx";
import { Helmet } from "react-helmet-async";

const Wishlist = () => {
  const [wishlistProperties, setWishlistProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (!authData) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${apis[0]}/get-wishlist`, {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      setWishlistProperties(res.data.wishlist);
    } catch (err) {
      console.log(err);
      warningToast("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWishlist = async (propertyId) => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (!authData) return;

    try {
      await axios.post(
        `${apis[0]}/remove`,
        { propertyId },
        { headers: { Authorization: `Bearer ${authData.token}` } },
      );

      setWishlistProperties((prev) =>
        prev.filter((item) => item._id !== propertyId),
      );
      warningToast("Removed from wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>

          <p className="text-black text-lg font-medium">
            Loading Wishlist Properties...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>

        <Helmet>
        <title>My Favourite Properties - Royal Crest Estate</title>
        <meta name="description" content="View and manage your favourite properties. Save your dream homes and compare listings on Royal Crest Estate." />
        <meta property="og:title" content="Saved Properties - Royal Crest Estate" />
        <meta property="og:description" content="Your collection of favourite luxury properties. Never miss your dream home." />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm border border-orange-500/20 rounded-full px-6 py-2 mb-6"
          >
            <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-orange-500 text-sm font-semibold tracking-wide">
              MY WISHLIST
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Favorite Properties
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {wishlistProperties.length}{" "}
            {wishlistProperties.length === 1 ? "property" : "properties"} saved
          </p>
        </motion.div>

        {/* Wishlist Grid */}
        {wishlistProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800"
          >
            <HeartOff className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start adding properties to your wishlist
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              Browse Properties
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProperties.map((property, index) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      property.images?.[0] ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    ${property.price?.toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleRemoveWishlist(property._id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <MapPin className="w-3 h-3 text-orange-500" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3 h-3 text-orange-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {property.bedrooms}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3 h-3 text-orange-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {property.bathrooms}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-3 h-3 text-orange-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {property.sqft} sqft
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      to={`/property/${property._id}`}
                      className="flex-1 mr-2"
                    >
                      <button className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleRemoveWishlist(property._id)}
                      className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Wishlist;
