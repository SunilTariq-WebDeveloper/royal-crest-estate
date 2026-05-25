import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  PlusCircle,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Building2,
  MessageCircleQuestionMark,
} from "lucide-react";
import LogoutButton from "../components/Logout";
import { useAgent } from "../Context/AgentContext";
import { useAuth } from "../Context/auth";

const Sidebar = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab,
    filteredProperties,
    agentData,
  } = useAgent();
  const [auth] = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const getUserAvatar = useCallback(() => {
    return (
      auth?.user?.avatar ||
      auth?.user?.profileImage ||
      auth?.user?.Avatar ||
      null
    );
  }, [auth?.user]);
  const getUserInitials = useCallback(() => {
    if (auth?.user?.first_name && auth?.user?.last_name) {
      return `${auth.user.first_name[0]}${auth.user.last_name[0]}`.toUpperCase();
    } else if (auth?.user?.first_name) {
      return auth.user.first_name[0].toUpperCase();
    } else if (auth?.user?.email) {
      return auth.user.email[0].toUpperCase();
    }
    return "A";
  }, [auth?.user]);

  const getUserFullName = useCallback(() => {
    if (auth?.user?.first_name && auth?.user?.last_name) {
      return `${auth.user.first_name} ${auth.user.last_name}`;
    } else if (auth?.user?.first_name) {
      return auth.user.first_name;
    } else if (auth?.user?.name) {
      return auth.user.name;
    }
    return "Agent User";
  }, [auth?.user]);

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  React.useEffect(() => {
    setAvatarError(false);
  }, [auth?.user?.avatar, auth?.user?.profileImage]);

  const navItems = useMemo(
    () => [
      {
        id: "properties",
        icon: Home,
        label: "My Properties",
        count: filteredProperties?.length || 0,
      },
      {
        id: "profile",
        icon: User,
        label: "My Profile",
      },
      {
        id: "addProperty",
        icon: PlusCircle,
        label: "Add Property",
      },
      {
        id: "Inquiry",
        icon: MessageCircleQuestionMark,
        label: "Inquiries Messages",
      },
    ],
    [filteredProperties?.length],
  );

  const SidebarContent = (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="px-6 py-2 mt-24 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold"
            >
              <span className="text-gray-900 dark:text-white">Royal</span>
              <span className="text-orange-500"> Crest</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Toggle Sidebar"
        >
          <ChevronRight
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
              sidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Agent Profile with Dynamic Image */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          {/* Profile Image or Initials */}
          <div className="w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600">
            {getUserAvatar() && !avatarError ? (
              <img
                src={getUserAvatar()}
                alt={getUserFullName()}
                className="w-full h-full object-cover"
                onError={handleAvatarError}
                loading="lazy"
              />
            ) : (
              <span className="text-white font-bold text-lg">
                {getUserInitials()}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {getUserFullName()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Real Estate Agent
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Stats */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-2 overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                Total Properties
              </span>
              <span className="font-semibold text-orange-500">
                {agentData.totalProperties || 0}
              </span>
            </div>
            {agentData.memberSince && (
              <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">
                  Member since
                </span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {agentData.memberSince}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
              activeTab === item.id
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 text-left text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {sidebarOpen && item.count !== undefined && (
              <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 dark:text-gray-400 rounded-xl transition-all duration-200 group hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500">
          <LogOut className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                <LogoutButton />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: sidebarOpen ? 280 : 80 }}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden lg:block h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed left-0 top-0 shadow-xl z-30"
      >
        {SidebarContent}
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <React.Fragment key="mobile-sidebar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 z-50 w-72 h-full bg-white dark:bg-gray-900 shadow-xl lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg z-10"
                aria-label="Close Menu"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {SidebarContent}
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-40 p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          aria-label="Open Menu"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default Sidebar;