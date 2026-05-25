import React, { useState, useEffect } from "react";
import { Home, Search, Bell, MessageCircle } from "lucide-react";
import { useAdmin } from "../Context/AdminContext.jsx";
import { useAuth } from "../Context/auth.jsx";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const TopBar = () => {
  const [contactCount, setContactCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    searchTerm,
    setSearchTerm,
    setActiveTab,
  } = useAdmin();

  const fetchContactCount = async () => {
    if (!auth?.token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:7500/api/v1/contact/contacts",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (response.data.success) {
        setContactCount(
          response.data.total || response.data.contacts?.length || 0,
        );
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactCount();
    const interval = setInterval(fetchContactCount, 30000);
    return () => clearInterval(interval);
  }, [auth?.token]);

  const handleContactClick = () => {
    setActiveTab("ContactMessages"); 
    navigate("/admin-dashboard", { state: { tab: "ContactMessages" } });
  };

  const getActiveTabName = () => {
    switch (activeTab) {
      case "users":
        return "Users Management";
      case "properties":
        return "Properties Management";
      case "ContactMessages":
        return "Contact Messages";
      case "addProperty":
        return "Add Property";
      case "settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Home className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard - {getActiveTabName()}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {activeTab === "properties" && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-64"
              />
            </div>
          )}

          {activeTab === "users" && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-64"
              />
            </div>
          )}

          <button
            onClick={handleContactClick}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
          >
            <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-orange-500 transition-colors" />
            {contactCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-orange-500 text-white text-xs flex items-center justify-center rounded-full px-1 shadow-lg animate-pulse">
                {contactCount > 99 ? "99+" : contactCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;