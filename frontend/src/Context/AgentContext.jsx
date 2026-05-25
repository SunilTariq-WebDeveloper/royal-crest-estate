import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgentProperties } from "../Redux/Actions/propertyAction";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../../config/apis";
import { successToast, errorToast } from "../messages/toastify";
const AgentContext = createContext();
export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within AgentProvider");
  }
  return context;
};
export const AgentProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const {
    loading,
    properties,
    error: reduxError,
  } = useSelector((state) => state.propertySlices);
  const [activeTab, setActiveTab] = useState("properties");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [localError, setLocalError] = useState(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showEditProperty, setShowEditProperty] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  
  const [agentData, setAgentData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    avatar: "https://via.placeholder.com/96?text=AV",
    memberSince: "",
    totalProperties: 0,
    activeListings: 0,
    pendingListings: 0,
    soldProperties: 0,
  });

  useEffect(() => {
    if (auth?.token) {
      dispatch(fetchAgentProperties());
    } else {
      setLocalError("Please login first to view dashboard");
    }
  }, [dispatch, auth?.token]);
  useEffect(() => {
    if (properties?.length > 0) {
      setAgentData((prev) => ({
        ...prev,
        totalProperties: properties.length,
        activeListings: properties.filter((p) => p.status === "active").length,
        pendingListings: properties.filter((p) => p.status === "pending")
          .length,
        soldProperties: properties.filter((p) => p.status === "sold").length,
      }));
    }
  }, [properties]);
  const filteredProperties =
    properties?.filter(
      (prop) =>
        (prop.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prop.location || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (prop.type || "").toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const handleDeleteProperty = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      successToast("Property deleted successfully");
      setShowDeleteConfirm(null);
    } catch (error) {
      errorToast("Failed to delete property");
    }
  };

  const handleEditProperty = (property) => {
    setShowEditProperty(property);
  };

  const handleAddProperty = () => {
    navigate("/add");
    setShowAddProperty(false);
  };

  const error = reduxError || localError;
  const value = {
    // UI State
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    searchTerm,
    setSearchTerm,
    loading,
    error,

    // Data
    properties,
    filteredProperties,
    agentData,

    // Modal States
    showAddProperty,
    setShowAddProperty,
    showEditProperty,
    setShowEditProperty,
    showDeleteConfirm,
    setShowDeleteConfirm,

    // Handlers
    handleDeleteProperty,
    handleEditProperty,
    handleAddProperty,
  };

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
};
