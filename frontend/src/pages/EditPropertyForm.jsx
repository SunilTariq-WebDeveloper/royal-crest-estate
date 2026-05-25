import React, { useState, useEffect } from "react";
import { useAdmin } from "../Context/AdminContext.jsx";
import axios from "axios";
import apis from "../../config/apis.js";
import { useAuth } from "../Context/auth.jsx";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../messages/toastify.js";
import {
  HomeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  StarOutlined,
  CalendarOutlined,
  TagOutlined,
  CheckCircleOutlined,
  SaveOutlined,
  CloseOutlined,
  PictureOutlined,
  CarOutlined,
  WifiOutlined,
  FireOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  ApartmentOutlined,
  CrownOutlined,
  GlobalOutlined,
  ShopOutlined,
  HomeFilled,
  RobotOutlined,
  ProfileOutlined,
  DropboxOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const EditPropertyForm = ({ propertyId, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageInput, setImageInput] = useState("");
  const [auth] = useAuth();
const handleCancel = () => {
  navigate("/agent-dashboard", {
    state: { activeTab: "properties", refresh: true },
    replace: true,
  });
  // Then refresh the page
  window.location.reload();
};

  const propertyTypes = [
    { value: "Villa", icon: <HomeOutlined />, label: "Villa" },
    { value: "Penthouse", icon: <CrownOutlined />, label: "Penthouse" },
    { value: "Estate", icon: <GlobalOutlined />, label: "Estate" },
    { value: "Loft", icon: <ShopOutlined />, label: "Loft" },
    { value: "Cabin", icon: <HomeFilled />, label: "Cabin" },
    { value: "Smart Home", icon: <RobotOutlined />, label: "Smart Home" },
  ];

  const propertyStatuses = [
    { value: "pending", label: "Pending", color: "yellow" },
    { value: "approved", label: "Approved", color: "green" },
    { value: "rejected", label: "Rejected", color: "red" },
    { value: "active", label: "Active", color: "green" },
    { value: "Sold", label: "Sold", color: "blue" },
  ];

  const allAmenities = [
    { name: "Swimming Pool", icon: <DropboxOutlined />, category: "Outdoor" },
    { name: "Solar System", icon: <ThunderboltOutlined />, category: "Energy" },
    { name: "Gym", icon: <ProfileOutlined />, category: "Wellness" },
    { name: "Garden", icon: <BgColorsOutlined />, category: "Outdoor" },
    { name: "Parking", icon: <CarOutlined />, category: "Convenience" },
    { name: "Smart Home", icon: <WifiOutlined />, category: "Technology" },
    { name: "Security System", icon: <SafetyOutlined />, category: "Safety" },
    { name: "Fireplace", icon: <FireOutlined />, category: "Comfort" },
  ];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!auth?.token) {
          console.log("Admin not logged in");
          return;
        }
        const { data } = await axios.get(`${apis[1]}/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setProperty(data.property);
        setLoading(false);
      } catch (err) {
        setError("Failed to load property");
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityToggle = (amenityName) => {
    setProperty((prev) => ({
      ...prev,
      amenities: prev.amenities?.includes(amenityName)
        ? prev.amenities.filter((a) => a !== amenityName)
        : [...(prev.amenities || []), amenityName],
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formDataUpload = new FormData();
    for (let i = 0; i < files.length; i++) {
      formDataUpload.append("images", files[i]);
    }

    setUploadingImages(true);
    try {
      const res = await axios.post(
        "http://localhost:7500/api/v1/upload",
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setProperty((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...res.data.images],
      }));
      successToast(`${res.data.images.length} images uploaded successfully!`);
    } catch (err) {
      console.error(err);
      errorToast(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleAddImages = () => {
    if (imageInput.trim()) {
      const urls = imageInput.split(",").map((url) => url.trim());
      setProperty((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...urls],
      }));
      setImageInput("");
      successToast(`${urls.length} images added!`);
    }
  };

  const handleRemoveImage = (index) => {
    setProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    successToast("Image removed successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (!auth?.token) {
        console.log("Admin not logged in");
        return;
      }
      await axios.put(`${apis[1]}/edit/property/${propertyId}`, property, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      successToast("Property updated successfully!");
      if (onSuccess) onSuccess();
      setTimeout(() => {
        navigate("/agent-dashboard", {
          state: { activeTab: "properties", refresh: true },
          replace: true,
        });
    
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      errorToast(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <button
          onClick={handleCancel}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="text-xl font-bold text-white">Edit Property</h2>
          <p className="text-orange-100 text-sm">Update property details</p>
        </div>
        <button
          type="button"
          onClick={handleCancel}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close"
        >
          <CloseOutlined className="text-white text-lg" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 max-h-[70vh] overflow-y-auto space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <TagOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  name="title"
                  value={property.title || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Property Title"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={property.description || ""}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Property Description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="number"
                  name="price"
                  value={property.price || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Price"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <EnvironmentOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  name="location"
                  value={property.location || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Location"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={property.address || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Full Address"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Property Details
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={property.bedrooms || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={property.bathrooms || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="4.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Square Feet
              </label>
              <input
                type="text"
                name="sqft"
                value={property.sqft || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="4200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <select
                name="type"
                value={property.type || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year Built
              </label>
              <div className="relative">
                <CalendarOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="number"
                  name="yearBuilt"
                  value={property.yearBuilt || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="2024"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating (1-5)
            </label>
            <div className="relative">
              <StarOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="number"
                name="rating"
                value={property.rating || ""}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="4.9"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Amenities
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allAmenities.map((amenity) => (
              <label
                key={amenity.name}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  property.amenities?.includes(amenity.name)
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-orange-300 dark:hover:border-orange-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={property.amenities?.includes(amenity.name)}
                  onChange={() => handleAmenityToggle(amenity.name)}
                  className="hidden"
                />
                <span
                  className={`text-lg ${property.amenities?.includes(amenity.name) ? "text-orange-500" : "text-gray-400 dark:text-gray-500"}`}
                >
                  {amenity.icon}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                  {amenity.name}
                </span>
                {property.amenities?.includes(amenity.name) && (
                  <CheckCircleOutlined className="text-orange-500" />
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Property Images
          </h2>

          {/* File Upload */}
          <div className="mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImages}
              className="hidden"
              id="image-upload-edit"
            />
            <label
              htmlFor="image-upload-edit"
              className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                uploadingImages
                  ? "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                  : "border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-500/5 hover:bg-orange-100 dark:hover:bg-orange-500/10"
              }`}
            >
              <UploadOutlined
                className={`text-3xl mb-2 ${uploadingImages ? "text-gray-400" : "text-orange-500"}`}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {uploadingImages ? "Uploading..." : "Click to upload images"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, WEBP up to 5MB each
              </span>
            </label>
          </div>

          {/* URL Input */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <PictureOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Or enter image URLs (comma separated)"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={handleAddImages}
              disabled={!imageInput.trim()}
              className="px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusOutlined />
              Add URLs
            </button>
          </div>

          {property.images?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {property.images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Property ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/150?text=Invalid")
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Remove Image"
                  >
                    <DeleteOutlined className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {!property.images?.length && (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <PictureOutlined className="text-3xl text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No images added yet
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auth?.user?.role === "admin" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                  Status & Options
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Property Status
                  </label>
                  <select
                    name="status"
                    value={property.status || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-900 dark:text-white"
                  >
                    {propertyStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div
              className={`flex flex-wrap gap-6 items-center ${auth?.user?.role === "admin" ? "h-full pt-7" : ""}`}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={property.isFeatured || false}
                  onChange={handleChange}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mark as Featured
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={property.isNew || false}
                  onChange={handleChange}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mark as New
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <span className="animate-spin">⏳</span>
                Saving...
              </>
            ) : (
              <>
                <SaveOutlined />
                Update Property
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPropertyForm;