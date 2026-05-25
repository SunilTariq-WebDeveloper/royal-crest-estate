import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { setAuth } from "../redux/slices/authSlice";
import { successToast, errorToast } from "../messages/toastify";
import apis from "../../config/apis";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bio: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const API_URL = apis[0];
  useEffect(() => {
    if (user) {
      console.log("User data from Redux:", user);
      console.log("User avatar URL:", user.avatar);
      const displayName =
        user.name || `${user.first_name || ""} ${user.last_name || ""}`;

      setForm({
        name: displayName.trim(),
        phone: user.phone || "",
        bio: user.bio || "",
      });

      if (user.avatar) {
        setAvatarPreview(user.avatar);
      } else {
        setAvatarPreview("");
      }

      setImageError(false);
    }
  }, [user]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        errorToast("File size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        errorToast("Only image files are allowed");
        return;
      }

      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      setImageError(false);
    }
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      errorToast("You need to be logged in to update your profile");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("bio", form.bio);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await axios.put(`${API_URL}/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update response:", response.data);

      if (response.data.success) {
        const updatedUser = response.data.user;

        console.log("Updated user from backend:", updatedUser);
        console.log("Updated avatar URL:", updatedUser.avatar);

        // Update form state
        setForm({
          name: updatedUser.name || "",
          phone: updatedUser.phone || "",
          bio: updatedUser.bio || "",
        });

        // Set avatar preview from backend response
        if (updatedUser.avatar) {
          // Add timestamp to force reload and bypass cache
          setAvatarPreview(`${updatedUser.avatar}?t=${Date.now()}`);
        } else {
          setAvatarPreview("");
        }

        setAvatarFile(null);
        setImageError(false);

        // Update Redux store
        const updatedAuth = {
          user: updatedUser,
          token: token,
          refreshToken: null,
        };

        dispatch(setAuth(updatedAuth));
        localStorage.setItem("auth", JSON.stringify(updatedAuth));

        successToast("Profile updated successfully!");
        setIsEditing(false);
      } else {
        errorToast(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      console.error("Error response:", error.response);

      if (error.response?.status === 401) {
        errorToast("Session expired. Please login again.");
      } else {
        errorToast(
          error.response?.data?.message ||
            "An error occurred while updating profile",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      const displayName =
        user.name || `${user.first_name || ""} ${user.last_name || ""}`;
      setForm({
        name: displayName.trim(),
        phone: user.phone || "",
        bio: user.bio || "",
      });

      if (user.avatar) {
        setAvatarPreview(user.avatar);
      } else {
        setAvatarPreview("");
      }

      setAvatarFile(null);
      setImageError(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Not available";
    }
  };

  const getDisplayName = () => {
    return (
      form.name ||
      user?.name ||
      `${user?.first_name || ""} ${user?.last_name || ""}` ||
      "User Name"
    );
  };

  const getInitials = () => {
    const name = getDisplayName();
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // Handle image load error
  const handleImageError = () => {
    console.error("Failed to load image:", avatarPreview);
    setImageError(true);
  };

  // No auth state
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-orange-500 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Not Logged In
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
       <Helmet>
        <title>{user.first_name}'s Profile - Royal Crest Estate</title>
        <meta name="description" content={`${user.first_name}'s profile on Royal Crest Estate. View account details, saved properties, and listing history.`} />
      </Helmet>
    
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Profile
                </h1>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <EditOutlined />
                  Edit Profile
                </button>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 ml-4 mt-2">
              View and manage your personal information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 text-center"
            >
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  {avatarPreview && !imageError ? (
                    <img
                      src={avatarPreview}
                      alt={getDisplayName()}
                      className="w-full h-full object-cover rounded-full"
                      onError={handleImageError}
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {getInitials()}
                    </span>
                  )}
                </div>
                {isEditing && (
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Max size: 5MB (JPEG, PNG, GIF, WebP)
                    </p>
                  </div>
                )}
              </div>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-center text-xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-orange-500 focus:outline-none dark:text-white mb-2 px-2"
                  placeholder="Your Name"
                  required
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getDisplayName()}
                </h2>
              )}

              <p className="text-sm text-gray-500 mt-1">
                Member since {formatDate(user?.createdAt)}
              </p>

              <div className="mt-4 flex justify-center gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 rounded-full text-xs">
                  {user?.isVerified ? "Verified Member" : "Member"}
                </span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 rounded-full text-xs">
                  {user?.role === "admin" ? "Admin" : "Premium"}
                </span>
              </div>
            </motion.div>

            {/* Profile Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-orange-500" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Personal Information
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        required
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium">
                        {getDisplayName()}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2">
                      <MailOutlined className="text-orange-500" />
                      <p className="text-gray-900 dark:text-white font-medium">
                        {user?.email || "Not provided"}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        placeholder="Your phone number"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <PhoneOutlined className="text-orange-500" />
                        <p className="text-gray-900 dark:text-white font-medium">
                          {form.phone || user?.phone || "Not provided"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={form.bio}
                        onChange={(e) =>
                          setForm({ ...form, bio: e.target.value })
                        }
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">
                        {form.bio || user?.bio || "No bio added yet"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Member Since
                    </label>
                    <div className="flex items-center gap-2">
                      <CalendarOutlined className="text-orange-500" />
                      <p className="text-gray-900 dark:text-white font-medium">
                        {formatDate(user?.createdAt)}
                      </p>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        {loading ? (
                          <LoadingOutlined className="animate-spin" />
                        ) : (
                          <SaveOutlined />
                        )}
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <CloseOutlined />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;