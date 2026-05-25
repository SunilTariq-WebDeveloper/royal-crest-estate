import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaHeart,
  FaKey,
  FaShieldAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { MdDashboard, MdAdminPanelSettings } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Logo from "../img/Logo.png";
import ThemeToggle from "./ThemeToggle";
import LogoutButton from "./Logout";
import { useAuth } from "../Context/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [avatarError, setAvatarError] = useState(false);

  const role = auth?.user?.role;
  const isLoggedIn = !!auth?.token;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/#", label: "Home", type: "scroll" },
    { path: "/#property-listing", label: "Properties", type: "scroll" },
    { path: "/#about", label: "About Us", type: "scroll" },
    { path: "/#services", label: "Services", type: "scroll" },
    { path: "/#faq", label: "FAQ", type: "scroll" },
    { path: "/#contact", label: "Contact", type: "scroll" },
  ];
  const getUserInitials = () => {
    if (auth?.user?.first_name && auth?.user?.last_name) {
      return `${auth.user.first_name[0]}${auth.user.last_name[0]}`.toUpperCase();
    } else if (auth?.user?.first_name) {
      return auth.user.first_name[0].toUpperCase();
    } else if (auth?.user?.email) {
      return auth.user.email[0].toUpperCase();
    }
    return "U";
  };
  const getUserName = () => {
    if (auth?.user?.first_name && auth?.user?.last_name) {
      return `${auth.user.first_name} ${auth.user.last_name}`;
    } else if (auth?.user?.first_name) {
      return auth.user.first_name;
    } else if (auth?.user?.name) {
      return auth.user.name;
    } else if (auth?.user?.email) {
      return auth.user.email.split("@")[0];
    }
    return "User";
  };
  const getUserAvatar = () => {
    return (
      auth?.user?.avatar ||
      auth?.user?.profileImage ||
      auth?.user?.Avatar ||
      null
    );
  };
  const handleAvatarError = () => {
    setAvatarError(true);
  };
   useEffect(() => {
    setAvatarError(false);
  }, [auth?.user?.avatar, auth?.user?.profileImage]);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full dark:bg-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex-shrink-0"
            onClick={handleMobileLinkClick}
          >
            <img
              src={Logo}
              alt="Royal Crest Estate"
              className="w-[120px] sm:w-[140px]"
            />
          </Link>
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-10 mt-4">
              {navItems.map((item) =>
                item.type === "scroll" ? (
                  <a
                    key={item.label}
                    href={item.path}
                    className="relative group font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative group font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-orange-600"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-600"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-orange-600 transition-all duration-300 ${
                        isActive(item.path)
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 mt-4">
            <Link
              to="/properties"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative group"
              title="Search Properties"
            >
              <IoSearchOutline className="text-xl text-gray-600 dark:text-gray-400 group-hover:text-orange-600 transition-colors" />
            </Link>

            <ThemeToggle />

            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-lg text-sm font-medium transition-colors relative group"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors relative group"
                >
                  Sign Up
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md overflow-hidden">
                    {getUserAvatar() && !avatarError ? (
                      <img
                        src={getUserAvatar()}
                        alt={getUserName()}
                        className="w-full h-full object-cover"
                        onError={handleAvatarError}
                      />
                    ) : (
                      <span>{getUserInitials()}</span>
                    )}
                  </div>
                  <BsThreeDotsVertical className="text-gray-500 dark:text-gray-400" />
                </button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                  >
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm border-2 border-white/30 overflow-hidden">
                            {getUserAvatar() && !avatarError ? (
                              <img
                                src={getUserAvatar()}
                                alt={getUserName()}
                                className="w-full h-full object-cover"
                                onError={handleAvatarError}
                              />
                            ) : (
                              <span>{getUserInitials()}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{getUserName()}</h3>
                            <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                              <FaEnvelope className="text-xs" />
                              {auth?.user?.email || "user@example.com"}
                            </p>
                            {auth?.user?.phone && (
                              <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                                <FaPhone className="text-xs" />
                                {auth.user.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* User Role Badge */}
                      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            role === "admin"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400"
                              : role === "agent"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                          }`}
                        >
                          {role === "admin" && (
                            <MdAdminPanelSettings className="text-sm" />
                          )}
                          {role === "agent" && <FaKey className="text-sm" />}
                          {role === "user" && <FaUser className="text-sm" />}
                          {role === "admin"
                            ? "Administrator"
                            : role === "agent"
                              ? "Real Estate Agent"
                              : "User"}
                        </span>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        {/* Dashboard Link */}
                        {(role === "agent" || role === "admin") && (
                          <Link
                            to={
                              role === "admin"
                                ? "/admin-dashboard"
                                : "/agent-dashboard"
                            }
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors relative group"
                          >
                            <MdDashboard className="text-lg" />
                            <span className="text-sm font-medium">
                              Dashboard
                            </span>
                          </Link>
                        )}

                        {/* Profile Link */}
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors relative group"
                        >
                          <FaUserCircle className="text-lg" />
                          <span className="text-sm font-medium">
                            My Profile
                          </span>
                        </Link>

                        <Link
                          to="/wishlist"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors relative group"
                        >
                          <FaHeart className="text-lg" />
                          <span className="text-sm font-medium">
                            Saved Properties
                          </span>
                        </Link>

                        {role === "agent" && (
                          <Link
                            to="/agent-dashboard?tab=properties"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors relative group"
                          >
                            <FaHome className="text-lg" />
                            <span className="text-sm font-medium">
                              My Properties
                            </span>
                          </Link>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                        {/* Logout Button */}
                        <div className="px-2">
                          <LogoutButton />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-500 z-50 relative"
          >
            {isMobileMenuOpen ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-white dark:bg-black z-40 overflow-y-auto"
              style={{ height: "calc(100vh - 73px)" }}
            >
              <div className="p-4 pb-20">
                {isLoggedIn && (
                  <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
                        {getUserAvatar() && !avatarError ? (
                          <img
                            src={getUserAvatar()}
                            alt={getUserName()}
                            className="w-full h-full object-cover"
                            onError={handleAvatarError}
                          />
                        ) : (
                          <span>{getUserInitials()}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {getUserName()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {auth?.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={handleMobileLinkClick}
                      className={`block py-2.5 px-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                  {isLoggedIn && (role === "agent" || role === "admin") && (
                    <Link
                      to={
                        role === "admin"
                          ? "/admin-dashboard"
                          : "/agent-dashboard"
                      }
                      onClick={handleMobileLinkClick}
                      className="block py-2.5 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Dashboard
                    </Link>
                  )}
                  {isLoggedIn && (
                    <Link
                      to="/profile"
                      onClick={handleMobileLinkClick}
                      className="block py-2.5 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      My Profile
                    </Link>
                  )}

                  {isLoggedIn && (
                    <Link
                      to="/wishlist"
                      onClick={handleMobileLinkClick}
                      className="block py-2.5 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Saved Properties
                    </Link>
                  )}
                </div>

                <Link
                  to="/properties"
                  onClick={handleMobileLinkClick}
                  className="flex items-center gap-2 py-2.5 px-3 mt-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <IoSearchOutline className="text-lg" />
                  <span>Search Properties</span>
                </Link>
                <div className="mt-3 px-3">
                  <ThemeToggle />
                </div>
                {!isLoggedIn ? (
                  <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Link
                      to="/login"
                      onClick={handleMobileLinkClick}
                      className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium text-center transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={handleMobileLinkClick}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium text-center transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <LogoutButton />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;