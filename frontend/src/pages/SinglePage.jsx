import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperty } from "../Redux/Actions/propertyAction.js";
import { motion, AnimatePresence } from "framer-motion";
import dp from "../img/Profile.jpg";
import {
  EnvironmentOutlined,
  HeartOutlined,
  ShareAltOutlined,
  LeftOutlined,
  RightOutlined,
  StarOutlined,
  PhoneOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WhatsAppOutlined,
  FacebookOutlined,
  TwitterOutlined,
  ArrowLeftOutlined,
  FileTextOutlined,
  TagOutlined,
  ClockCircleOutlined,
  CalculatorOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import axios from "axios";
import apis from "../../config/apis.js";
import { errorToast, successToast } from "../messages/toastify.js";
import ReviewList from "../components/ReviewList.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../Context/auth.jsx";

const SingleProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { property, loading } = useSelector((state) => state.propertySlices);

  const [currentImage, setCurrentImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [auth] = useAuth();
  const [imgError, setImgError] = useState(false); 

  useEffect(() => {
    dispatch(fetchProperty(id));
  }, [dispatch, id]);

  const agent = property?.agent;

  const avatarUrl =
    agent?.avatar || agent?.profileImage || agent?.Avatar || null;
  const initials =
    agent?.first_name && agent?.last_name
      ? `${agent.first_name[0]}${agent.last_name[0]}`.toUpperCase()
      : agent?.first_name?.[0]?.toUpperCase() || "A";
      
      const formatPrice = (price) => {
        if (!price) return "Price on Request";
        return new Intl.NumberFormat("en-PK", {
          style: "currency",
          currency: "PKR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price);
      };
      
        const whatsappMessage = `Hello ${agent?.first_name}, I am interested in your property "${property?.title}" located at ${property?.location}. Price: ${formatPrice(property?.price)}. Please share more details.`;
        const whatsappLink = `https://wa.me/${agent?.phone?.replace(/^0/, "92")}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleInquiry = async () => {
    const data = { propertyId: property._id, name, email, phone, message };

    try {
      await axios.post("http://localhost:7500/api/v1/inquiry/inquiry", data);
      successToast("Inquiry Sent Successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      errorToast(error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading property details...
          </p>
        </div>
      </div>
    );

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <CloseCircleOutlined className="text-5xl text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/properties")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span
              className="hover:text-orange-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span>/</span>
            <span
              className="hover:text-orange-500 cursor-pointer"
              onClick={() => navigate("/properties")}
            >
              Properties
            </span>
            <span>/</span>
            <span className="text-orange-500">{property.type}</span>
          </div>

          {/* Title and Price Row */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 dark:text-white">
                {property.title}
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <EnvironmentOutlined />
                <span>{property.location}</span>
              </div>
            </div>

            {/* PRICE SECTION */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 shadow-lg">
              <div className="text-white/80 text-sm mb-1">Property Price</div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                {formatPrice(property.price)}
              </div>
              <div className="text-white/70 text-xs mt-1">Sale Price</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Images & Badges */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="relative h-[500px]">
                  <img
                    src={property.images[currentImage]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImage(
                            (prev) =>
                              (prev - 1 + property.images.length) %
                              property.images.length,
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-orange-500 transition-all hover:scale-110"
                      >
                        <LeftOutlined />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImage(
                            (prev) => (prev + 1) % property.images.length,
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-orange-500 transition-all hover:scale-110"
                      >
                        <RightOutlined />
                      </button>
                    </>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-lg text-sm font-semibold shadow-lg bg-green-500 text-white">
                      For Sale
                    </span>
                    {property.isFeatured && (
                      <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-yellow-500 text-white shadow-lg">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {currentImage + 1} / {property.images.length}
                  </div>
                </div>
              </div>

              {/* Property Info & Features */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
                    <TagOutlined className="text-orange-500" />
                    Key Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {property.bedrooms}
                      </div>
                      <div className="text-sm text-gray-500">Bedrooms</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {property.bathrooms}
                      </div>
                      <div className="text-sm text-gray-500">Bathrooms</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {property.sqft}
                      </div>
                      <div className="text-sm text-gray-500">Sq Ft</div>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {property.type}
                      </div>
                      <div className="text-sm text-gray-500">Property Type</div>
                    </div>
                  </div>
                </div>

                {/* Price Details Section */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-sm border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center">
                      <DollarOutlined className="text-orange-500 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Price Details
                      </p>
                      <p className="font-semibold text-2xl text-gray-900 dark:text-white">
                        {formatPrice(property.price)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 dark:text-white">
                    <FileTextOutlined className="text-orange-500" />
                    Description
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
                    <CheckCircleOutlined className="text-orange-500" />
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(property.amenities || []).map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <CheckCircleOutlined className="text-green-500 text-sm" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <ReviewList propertyId={property._id} />
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                  <h2 className="text-white font-semibold text-lg">
                    Contact Agent
                  </h2>
                  <p className="text-orange-100 text-sm">
                    Get in touch for more details
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    {avatarUrl && !imgError ? (
                      <img
                        src={avatarUrl}
                        alt="Agent"
                        className="w-16 h-16 rounded-full border-3 border-orange-500 shadow-md object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                        {initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {agent?.first_name} {agent?.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Professional Real Estate Agent
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <a
                      href={`tel:${agent?.phone}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition group"
                    >
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition">
                        <PhoneOutlined className="text-orange-500 group-hover:text-white text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {agent?.phone}
                        </p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${agent?.email}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition group"
                    >
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition">
                        <MailOutlined className="text-orange-500 group-hover:text-white text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[180px]">
                          {agent?.email}
                        </p>
                      </div>
                    </a>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 mb-6 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition shadow-md hover:shadow-lg"
                  >
                    <WhatsAppOutlined className="text-lg" /> Chat on WhatsApp
                  </a>

                  {/* Inquiry Form */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                      Quick Inquiry
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white dark:bg-gray-700"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white dark:bg-gray-700"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white dark:bg-gray-700"
                      />
                      <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 bg-white dark:bg-gray-700"
                        rows={3}
                      ></textarea>
                      <button
                        onClick={handleInquiry}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition"
                      >
                        Send Inquiry
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProperty;