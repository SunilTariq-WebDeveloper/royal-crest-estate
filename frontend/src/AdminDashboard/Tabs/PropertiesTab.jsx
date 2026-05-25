import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProperty } from "../../Redux/Actions/propertyAction";
import {
  Filter,
  MapPin,
  Bed,
  Bath,
  Eye,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Home,
  ChevronLeft,
  ChevronRight,
  Search,
  MoreVertical,
} from "lucide-react";
import apis from "../../../config/apis.js";
import axios from "axios";
import { successToast, errorToast } from "../../messages/toastify.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth.jsx";
import { useAdmin } from "../../Context/AdminContext.jsx";

const PropertiesTab = () => {
  const {
    filteredProperties,
    propertyFilter,
    setPropertyFilter,
    activeTab,
    setActiveTab,
  } = useAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [avatarErrors, setAvatarErrors] = useState({});
  const itemsPerPage = 5;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth] = useAuth();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "approved":
        return "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
      case "sold":
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getAgentAvatar = (agent) => {
    return agent?.avatar || agent?.profileImage || agent?.Avatar || null;
  };

  const getAgentInitials = (agent) => {
    if (agent?.first_name && agent?.last_name) {
      return `${agent.first_name[0]}${agent.last_name[0]}`.toUpperCase();
    } else if (agent?.first_name) {
      return agent.first_name[0].toUpperCase();
    }
    return "A";
  };

  const handleAvatarError = (agentId) => {
    setAvatarErrors((prev) => ({ ...prev, [agentId]: true }));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteProperty(id));
      successToast("Property deleted successfully");
    } catch (error) {
      errorToast("Failed to delete property ");
    }
  };

  const handleReject = async (id) => {
    try {
      if (!auth?.token) {
        console.log("Admin not logged in");
        return;
      }

      await axios.put(
        `${apis[1]}/reject-property/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );
      successToast("Property rejected");
      setOpenMenuId(null);
    } catch (error) {
      console.log(error);
      errorToast("Failed to reject property");
    }
  };

  const handleApprove = async (id) => {
    try {
      if (!auth?.token) {
        console.log("Admin not logged in");
        return;
      }

      await axios.put(
        `${apis[1]}/approve-property/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );
      successToast("Property approved");
      setOpenMenuId(null);
    } catch (error) {
      console.log(error);
      errorToast("Failed to approve property");
    }
  };

  const handleEdit = (id) => {
    setActiveTab(`editProperty-${id}`);
    setOpenMenuId(null);
  };

  const formatCurrency = (price) => {
    if (!price) return "Price on Request";
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Filter properties based on search
  const filteredAndSearched = filteredProperties.filter(
    (property) =>
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.agent?.first_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      property.agent?.last_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredAndSearched.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredAndSearched.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with filters and search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {["all", "active", "pending", "sold"].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setPropertyFilter(filter);
                setCurrentPage(1);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition-all flex-shrink-0 ${
                propertyFilter === filter
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-48 md:w-64"
            />
          </div>

          <button className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 flex-shrink-0">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Properties List - Mobile/Tablet View */}
      <div className="block sm:hidden space-y-3">
        {paginatedProperties.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center gap-2">
              <Home className="w-10 h-10 text-gray-400" />
              <p className="text-gray-500 text-sm">No properties found</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-orange-500 text-xs hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        ) : (
          paginatedProperties.map((property) => {
            const agentId = property.agent?._id || property._id;
            const avatarUrl = getAgentAvatar(property.agent);
            const initials = getAgentInitials(property.agent);
            const hasError = avatarErrors[agentId];

            return (
              <div
                key={property._id || property.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
              >
                {/* Image and Status */}
                <div className="relative h-32">
                  <img
                    src={
                      property.images?.[0] ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      property.status,
                    )}`}
                  >
                    {property.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Title and Location */}
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                    <MapPin className="w-3 h-3 text-orange-500 flex-shrink-0" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>

                  {/* Details and Price */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {property.bedrooms}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {property.bathrooms}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {property.views || 0}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-orange-500">
                      {formatCurrency(property.price)}
                    </p>
                  </div>

                  {/* Agent and Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      {/* Agent Avatar - FIXED */}
                      {avatarUrl && !hasError ? (
                        <img
                          src={avatarUrl}
                          alt={property.agent?.first_name}
                          className="w-6 h-6 rounded-full object-cover"
                          onError={() => handleAvatarError(agentId)}
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {initials}
                        </div>
                      )}
                      <span className="text-xs text-gray-700 dark:text-gray-300 line-clamp-1">
                        {property.agent?.first_name} {property.agent?.last_name}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {property.status?.toLowerCase() === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(property._id)}
                            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                            title="Approve"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleReject(property._id)}
                            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                            title="Reject"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => navigate(`/property/${property._id}`)}
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleEdit(property._id)}
                        className="p-1.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Properties Table - Desktop View */}
      <div className="hidden sm:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {paginatedProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex flex-col items-center gap-3">
              <Home className="w-12 h-12 text-gray-400" />
              <p className="text-gray-500">No properties found</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-orange-500 text-sm hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {paginatedProperties.map((property) => {
                const agentId = property.agent?._id || property._id;
                const avatarUrl = getAgentAvatar(property.agent);
                const initials = getAgentInitials(property.agent);
                const hasError = avatarErrors[agentId];

                return (
                  <tr
                    key={property._id || property.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                          <img
                            src={
                              property.images?.[0] ||
                              "https://via.placeholder.com/400x300"
                            }
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {property.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {property.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {property.bedrooms} <Bed className="w-3 h-3 inline" />
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {property.bathrooms}{" "}
                          <Bath className="w-3 h-3 inline" />
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-orange-500">
                        {formatCurrency(property.price)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* Agent Avatar - FIXED */}
                        {avatarUrl && !hasError ? (
                          <img
                            src={avatarUrl}
                            alt={property.agent?.first_name}
                            className="w-6 h-6 rounded-full object-cover"
                            onError={() => handleAvatarError(agentId)}
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {initials}
                          </div>
                        )}
                        <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                          {property.agent?.first_name}{" "}
                          {property.agent?.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {property.status?.toLowerCase() === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(property._id)}
                              className="p-1.5 hover:bg-green-50 rounded-lg text-green-600 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(property._id)}
                              className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => navigate(`/property/${property._id}`)}
                          className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(property._id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filteredAndSearched.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
          <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredAndSearched.length)} of{" "}
            {filteredAndSearched.length} properties
          </p>
          <div className="flex items-center justify-center sm:justify-end gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-2 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-xs sm:text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesTab;