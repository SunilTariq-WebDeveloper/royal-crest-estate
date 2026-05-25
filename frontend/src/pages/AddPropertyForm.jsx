import { useState } from "react";
import axios from "axios";
import apis from "../../config/apis.js";
import { useSelector } from "react-redux";
import {
  HomeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  PictureOutlined,
  StarOutlined,
  CalendarOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  CheckOutlined,
  BorderlessTableOutlined,
  TagOutlined,
  SafetyOutlined,
  FireOutlined,
  CarOutlined,
  ApartmentOutlined,
  BankOutlined,
  BuildOutlined,
  WifiOutlined,
  ThunderboltOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { errorToast, successToast } from "../messages/toastify.js";

const AddPropertyForm = () => {
  const auth = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    type: "Villa",
    images: [],
    isNew: false,
    location: "",
    status: "pending",
    isFeatured: false,
    amenities: [],
    rating: "",
    yearBuilt: "",
  });

  const [imageInput, setImageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const propertyTypes = [
    { value: "Villa", icon: <HomeOutlined />, label: "Villa" },
    { value: "Penthouse", icon: <ApartmentOutlined />, label: "Penthouse" },
    { value: "Estate", icon: <BankOutlined />, label: "Estate" },
    { value: "Loft", icon: <BuildOutlined />, label: "Loft" },
    { value: "Cabin", icon: <HomeOutlined />, label: "Cabin" },
    { value: "Smart Home", icon: <WifiOutlined />, label: "Smart Home" },
  ];

  const propertyStatuses = [
    { value: "Pending", label: "Pending", color: "green" },
  ];

  const allAmenities = [
    { name: "Swimming Pool", icon: <EnvironmentOutlined /> },
    { name: "Solar System", icon: <ThunderboltOutlined /> },
    { name: "Gym", icon: <BuildOutlined /> },
    { name: "Garden / Park", icon: <EnvironmentOutlined /> },
    { name: "Parking", icon: <CarOutlined /> },
    { name: "Smart Home", icon: <WifiOutlined /> },
    { name: "Security System", icon: <SafetyOutlined /> },
    { name: "CCTV Surveillance", icon: <CameraOutlined /> },
    { name: "Fireplace", icon: <FireOutlined /> },
    { name: "Mosque Nearby", icon: <BankOutlined /> },
    { name: "Electricity Backup", icon: <ThunderboltOutlined /> },
    { name: "Gated Community", icon: <ApartmentOutlined /> },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "amenities") {
      let newAmenities = [...formData.amenities];
      if (checked) newAmenities.push(value);
      else newAmenities = newAmenities.filter((a) => a !== value);
      setFormData({ ...formData, amenities: newAmenities });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      const res = await axios.post("http://localhost:7500/api/v1/upload", formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({
        ...formData,
        images: [...formData.images, ...res.data.images],
      });
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
      setFormData({
        ...formData,
        images: [...formData.images, ...urls],
      });
      setImageInput("");
      successToast(`${urls.length} images added!`);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = auth.token || localStorage.getItem("token");

      if (!token) {
        errorToast("Please login first to add a property");
        setLoading(false);
        return;
      }

      if (!formData.title || !formData.price || !formData.location) {
        errorToast("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        yearBuilt: Number(formData.yearBuilt) || new Date().getFullYear(),
        sqft: Number(formData.sqft) || 0,
      };

      const res = await axios.post(apis[1], payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      successToast("Property added successfully!");

      setFormData({
        title: "",
        description: "",
        address: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        sqft: "",
        type: "Villa",
        images: [],
        isNew: false,
        location: "",
        status: "pending",
        isFeatured: false,
        amenities: [],
        yearBuilt: "",
      });
      setImageInput("");
    } catch (err) {
      console.error(err);
      errorToast(err.response?.data?.message || "Error adding property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-2xl mb-4 border border-orange-500/30">
            <HomeOutlined className="text-3xl text-orange-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Add New Property
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the details below to list a new property
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Property Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <TagOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="e.g., Modern Luxury Villa"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                  placeholder="Describe the property..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Price (Rs) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  {/* <DollarOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full pl-5 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="3,450,000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <EnvironmentOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Lahore, Pakistan"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder=" Main Model town Lahore, Pakistan"
                />
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-4">
              <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
              Property Details
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="4.5"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Sq Ft
                </label>
                <input
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  placeholder="4200"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Year Built
                </label>
                <div className="relative">
                  <CalendarOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="2022"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                >
                  {propertyTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.icon} {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                >
                  {propertyStatuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
              Amenities
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {allAmenities.map((amenity) => (
                <label
                  key={amenity.name}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.amenities.includes(amenity.name)
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-orange-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity.name}
                    checked={formData.amenities.includes(amenity.name)}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span
                    className={`text-xl ${formData.amenities.includes(amenity.name) ? "text-orange-500" : "text-gray-400"}`}
                  >
                    {amenity.icon}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                    {amenity.name}
                  </span>
                  {formData.amenities.includes(amenity.name) && (
                    <CheckOutlined className="text-orange-500" />
                  )}
                </label>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
              Property Images
            </h2>
            <div className="mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImages}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  uploadingImages
                    ? "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                    : "border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-500/5 hover:bg-orange-100"
                }`}
              >
                <UploadOutlined
                  className={`text-3xl mb-2 ${uploadingImages ? "text-gray-400" : "text-orange-500"}`}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {uploadingImages ? "Uploading..." : "Click to upload images"}
                </span>
                <span className="text-xs text-gray-500">
                  PNG, JPG, WEBP up to 5MB each
                </span>
              </label>
            </div>

            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <PictureOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="Or enter image URLs (comma separated)"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
              <button
                type="button"
                onClick={handleAddImages}
                disabled={!imageInput.trim()}
                className="px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2 disabled:opacity-50"
              >
                <PlusOutlined />
                Add URLs
              </button>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <DeleteOutlined className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-6 items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mark as New
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Mark as Featured
                </span>
              </label>

          
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Adding Property...</span>
                </>
              ) : (
                <>
                  <PlusOutlined />
                  <span>Add Property</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;