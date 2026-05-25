import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/auth";

const AgentInquiries = () => {
  const [auth] = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (auth?.token) {
      fetchInquiries();
    } else {
      setLoading(false);
      setError("Please login to view inquiries");
    }
  }, [auth?.token]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:7500/api/v1/inquiry/get-inquiry",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (response.data.success) {
        setInquiries(response.data.inquiries);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch inquiries");
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filter === "all") return true;
    if (filter === "today") {
      const today = new Date().toDateString();
      const inquiryDate = new Date(inquiry.createdAt).toDateString();
      return today === inquiryDate;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 dark:text-gray-400">
          Loading inquiries...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Property Inquiries
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Total {inquiries.length} inquiries received
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "all"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("today")}
            className={`px-4 py-2 rounded-lg transition ${
              filter === "today"
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Today
          </button>
        </div>
      </div>

      {/* Inquiries Grid */}
      {filteredInquiries.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">No inquiries found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition"
            >
              <div className="p-6">
                {/* Property Info */}
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {inquiry.propertyId?.title || "Property Inquiry"}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      📍{" "}
                      {inquiry.propertyId?.location || "Location not specified"}
                    </span>
                    <span>
                      💰 {inquiry.propertyId?.price || "Price not specified"}
                    </span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Client Name
                    </label>
                    <p className="text-gray-900 dark:text-white font-medium mt-1">
                      {inquiry.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Email
                    </label>
                    <p className="text-gray-900 dark:text-white mt-1 break-all">
                      {inquiry.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Phone
                    </label>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {inquiry.phone}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Message
                  </label>
                  <p className="text-gray-700 dark:text-gray-300 mt-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    {inquiry.message}
                  </p>
                </div>

                {/* Timestamp & Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Received: {new Date(inquiry.createdAt).toLocaleString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `mailto:${inquiry.email}`)
                      }
                      className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    >
                      Reply via Email
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `tel:${inquiry.phone}`)
                      }
                      className="px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                    >
                      Call Client
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentInquiries;