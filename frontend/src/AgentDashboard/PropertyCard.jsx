import React from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Eye,
  MapPin,
  Bed,
  Bath,
  Square,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAgent } from "../Context/AgentContext";
import { useDispatch } from "react-redux";
import { deleteProperty } from "../Redux/Actions/propertyAction";
import { successToast } from "../messages/toastify";

const PropertyCard = ({ property, fadeInUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setShowEditProperty, setShowDeleteConfirm,setActiveTab } = useAgent();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "approved":
        return "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "sold":
      case "rejected":
        return "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;
    dispatch(deleteProperty(id));
    successToast("Property has been deleted");
  };
  // Line 1
  const handleEdit = (id) => {
    setActiveTab(`editProperty-${id}`);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg hover:shadow-xl transition-all"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images?.[0] || "https://via.placeholder.com/400x300"}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            property.status,
          )}`}
        >
          {property.status?.charAt(0).toUpperCase() +
            property.status?.slice(1) || "Unknown"}
        </span>
        {property.isFeatured && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
            {property.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span className="line-clamp-1">
            {property.location || property.address}
          </span>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {property.bedrooms}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {property.bathrooms}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {property.sqft} sqft
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-bold text-orange-500">
            Rs: {property.price?.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-400">
            Added: {property.createdAt?.split("T")[0] || "—"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(property._id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Edit Property"
            >
              <Edit className="w-4 h-4 text-gray-500" />
            </button>
            <button
              onClick={() => navigate(`/property/${property._id}`)}
              title="View Property"
            >
              <Eye className="w-4 h-4 text-blue-500" />
            </button>
            <button
              onClick={() => handleDelete(property._id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Delete Property"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};;

export default PropertyCard;