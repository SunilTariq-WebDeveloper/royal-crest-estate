import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedProperties } from "../Redux/Actions/propertyAction.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Context/auth.jsx";
import { StarOutlined } from "@ant-design/icons";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Search,
  Filter,
  Grid3x3,
  List,
  Sparkles,
  ArrowUpRight,
  Home,
  Building2,
  Warehouse,
  X,
  Eye,
  Star,
  Calendar,
  User,
  TrendingUp,
  Shield,
  Award,
  Clock,
  Mic,
} from "lucide-react";
import apis from "../../config/apis.js";
import axios from "axios";
import { successToast, warningToast } from "../messages/toastify.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const PropertyListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [auth] = useAuth();
  const [listening, setListening] = useState(false); 

  const dispatch = useDispatch();
  const { loading, properties } = useSelector((state) => state.propertySlices);
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const propertyTypes = [
    { id: "villa", label: "Villa", icon: Home },
    { id: "penthouse", label: "Penthouse", icon: Building2 },
    { id: "estate", label: "Estate", icon: Warehouse },
    { id: "loft", label: "Loft", icon: Home },
    { id: "apartment", label: "Apartment", icon: Building2 },
    { id: "house", label: "House", icon: Home },
    { id: "condo", label: "Condo", icon: Building2 },
  ];

  const priceRanges = [
    "All Prices",
    "Under $500k",
    "$500k - $1M",
    "$1M - $2M",
    "$2M - $5M",
    "$5M+",
  ];

  useEffect(() => {
    dispatch(fetchApprovedProperties());
  }, [dispatch]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const authData = JSON.parse(localStorage.getItem("auth"));
      if (!authData) return;

      try {
        const res = await axios.get(`${apis[0]}/get-wishlist`, {
          headers: { Authorization: `Bearer ${authData.token}` },
        });
        setFavorites(res.data.wishlist.map((item) => item._id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchWishlist();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  const handleVoiceSearch = async () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Sorry, your browser doesn't support voice search. Please use Chrome, Edge, or Safari.",
      );
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      setListening(true);

      recognition.onstart = () => {
        console.log("🎤 Voice recognition started...");
      };

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log("✅ Recognized:", spokenText);
        setSearchTerm(spokenText);
        setListening(false);
      };

      recognition.onerror = (event) => {
        console.error("❌ Voice error:", event.error);
        if (event.error === "not-allowed") {
          alert("Please allow microphone access to use voice search.");
        } else if (event.error === "no-speech") {
          alert("No speech detected. Please try again.");
        } else {
          alert(`Voice search failed: ${event.error}. Please try again.`);
        }
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("❌ Mic permission error:", err);
      alert(
        "Microphone access is required for voice search. Please allow microphone permissions.",
      );
      setListening(false);
    }
  };

  // Filter Function
  const filteredProperties =
    properties?.filter((property) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          property.title?.toLowerCase().includes(searchLower) ||
          property.location?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (selectedType && property.type?.toLowerCase() !== selectedType) {
        return false;
      }

      if (priceRange && priceRange !== "All Prices") {
        const price = property.price;
        if (priceRange === "Under $500k" && price >= 500000) return false;
        if (priceRange === "$500k - $1M" && (price < 500000 || price > 1000000))
          return false;
        if (priceRange === "$1M - $2M" && (price < 1000000 || price > 2000000))
          return false;
        if (priceRange === "$2M - $5M" && (price < 2000000 || price > 5000000))
          return false;
        if (priceRange === "$5M+" && price < 5000000) return false;
      }

      if (bedrooms) {
        if (bedrooms === "5+" && property.bedrooms < 5) return false;
        if (bedrooms !== "5+" && property.bedrooms !== parseInt(bedrooms))
          return false;
      }

      if (bathrooms && property.bathrooms !== parseInt(bathrooms)) return false;

      return true;
    }) || [];

  const handleWishlist = async (propertyId) => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const token = authData?.token;
    const user = authData?.user;

    if (!user) {
      localStorage.setItem("wishlistProperty", propertyId);
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${apis[0]}/add`,
        { propertyId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.data.message === "Already added") {
        warningToast("Already added in wishlist");
      } else if (res.data.success === "Added to Wishlist") {
        successToast("Added to wishlist");
        setFavorites((prev) => [...prev, propertyId]);
      }
    } catch (err) {
      console.log(err);
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
      setFavorites((prev) => prev.filter((id) => id !== propertyId));
      warningToast("Removed from wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setPriceRange("");
    setBedrooms("");
    setBathrooms("");
  };

  const displayProperties = isHomePage
    ? filteredProperties?.slice(0, 6)
    : filteredProperties;

  // Debugging
  console.log("Properties:", properties);
  console.log("Display Properties:", displayProperties);

  return (
    <div>
      <div
        id="property-listing"
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black relative overflow-hidden transition-colors duration-300"
      >
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-300/30 dark:bg-orange-600/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(to right, #f97316 1px, transparent 1px),
                linear-gradient(to bottom, #f97316 1px, transparent 1px)
              `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm border border-orange-500/20 rounded-full px-6 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 text-sm font-semibold tracking-wide">
                PREMIUM REAL ESTATE COLLECTION
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Discover Your
              <span className="relative ml-4">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  Dream Home
                </span>
                <motion.span
                  animate={{ width: ["0%", "100%", "100%", "0%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                />
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Experience unparalleled luxury in handpicked properties across
              prime locations.
            </p>
          </motion.div>

          {/* Search Bar with Voice Search */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />

                {/* Voice Search Button */}
                <button
                  onClick={handleVoiceSearch}
                  disabled={listening}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                    listening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-orange-500 hover:text-white"
                  }`}
                  title="Search by voice"
                >
                  {listening ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                      <Mic className="w-5 h-5 relative" />
                    </div>
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>

                {/* Clear button */}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-16 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl min-w-[160px] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>

              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl min-w-[140px] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              >
                <option value="">Bedrooms</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4">4 Beds</option>
                <option value="5+">5+ Beds</option>
              </select>

              <select
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl min-w-[140px] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              >
                <option value="">Bathrooms</option>
                <option value="1">1 Bath</option>
                <option value="2">2 Baths</option>
                <option value="3">3 Baths</option>
                <option value="4">4+ Baths</option>
              </select>
            </div>

            {(searchTerm ||
              selectedType ||
              priceRange ||
              bedrooms ||
              bathrooms) && (
              <div className="flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2 text-sm"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Property Type Buttons */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              const isActive = selectedType === type.id;

              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedType(isActive ? "" : type.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500 hover:text-orange-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{type.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Results Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Available Properties
                </h2>
                <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm font-semibold">
                  {displayProperties?.length || 0} Listings
                </span>
              </div>
            </div>

            <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl p-1 border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-orange-500"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-orange-500 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-orange-500"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-500">Loading properties...</p>
            </div>
          )}

          {/* Property Grid/List */}
          {!loading &&
          (!displayProperties || displayProperties.length === 0) ? (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400">
                No properties match your filters
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-orange-500 hover:text-orange-600"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            !loading && (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }`}
              >
                {displayProperties?.map((property, index) => (
                  <motion.div
                    key={property._id}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {viewMode === "grid" ? (
                      /* Grid View Card */
                      <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden">
                          <motion.div
                            animate={{
                              scale: hoveredId === property._id ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full"
                          >
                            <LazyLoadImage
                              src={
                                property.images?.[0] ||
                                "https://via.placeholder.com/400x300"
                              }
                              alt={property.title}
                              effect="blur"
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                            Rs {property.price?.toLocaleString()}
                          </div>

                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Featured
                            </span>
                          </div>

                          <div className="absolute top-3 right-3 flex gap-2">
                            <button
                              onClick={() =>
                                favorites.includes(property._id)
                                  ? handleRemoveWishlist(property._id)
                                  : handleWishlist(property._id)
                              }
                              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  favorites.includes(property._id)
                                    ? "fill-orange-500 text-orange-500"
                                    : "text-gray-600"
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                              {property.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-3">
                            <MapPin className="w-3 h-3 text-orange-500" />
                            <span className="truncate">
                              {property.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <StarOutlined
                                key={i}
                                className={`text-sm ${
                                  i < Math.round(property.rating || 0)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-gray-500 text-sm">
                              ({property.numReviews || 0} reviews)
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {property.agent?.avatar ? (
                                <img
                                  src={property.agent.avatar}
                                  alt={`${property.agent.first_name} ${property.agent.last_name}`}
                                  className="w-8 h-8 rounded-full object-cover shadow-md"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                                  {property.agent?.first_name?.charAt(0) || "A"}
                                </div>
                              )}
                              <div>
                                <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                                  {property.agent?.first_name}{" "}
                                  {property.agent?.last_name}
                                </p>
                                <p className="text-[10px] text-gray-500">
                                  Listing Agent
                                </p>
                              </div>
                            </div>
                            <Link to={`/property/${property._id}`}>
                              <button className="group relative overflow-hidden bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-md">
                                <span>View Details</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* List View Card */
                      <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col md:flex-row hover:-translate-y-1">
                        <div className="md:w-1/3 relative h-56 md:h-auto overflow-hidden">
                          <motion.img
                            animate={{
                              scale: hoveredId === property._id ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.6 }}
                            src={
                              property.images?.[0] ||
                              "https://via.placeholder.com/400x300"
                            }
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                            Rs {property.price?.toLocaleString()}
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                              Featured
                            </span>
                          </div>
                        </div>

                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                  {property.title}
                                </h3>
                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mt-1">
                                  <MapPin className="w-4 h-4 text-orange-500" />
                                  <span>{property.location}</span>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  favorites.includes(property._id)
                                    ? handleRemoveWishlist(property._id)
                                    : handleWishlist(property._id)
                                }
                                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all flex-shrink-0"
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    favorites.includes(property._id)
                                      ? "fill-orange-500 text-orange-500"
                                      : "text-gray-600 dark:text-gray-300"
                                  }`}
                                />
                              </button>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                  <StarOutlined
                                    key={i}
                                    className={`text-sm ${
                                      i < Math.round(property.rating || 0)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-gray-500 text-sm">
                                  ({property.numReviews || 0} reviews)
                                </span>
                              </div>
                              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {property.yearBuilt}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <Bed className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {property.bedrooms} Beds
                                </span>
                              </div>
                              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <Bath className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {property.bathrooms} Baths
                                </span>
                              </div>
                              <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <Square className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {property.sqft} sqft
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {property.agent?.first_name?.charAt(0) || "A"}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {property.agent?.first_name}{" "}
                                  {property.agent?.last_name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Professional Real Estate Agent
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <Link
                              to={`/property/${property._id}`}
                              className="flex-1"
                            >
                              <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-md group transition active:scale-95">
                                <span>View Details</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )
          )}

          {/* View More Button */}
          {isHomePage && filteredProperties?.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/properties")}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-105"
              >
                Explore All Properties
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PropertyListing;