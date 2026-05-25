import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPropertiesAdmin } from "../Redux/Actions/propertyAction.js";
import { useAuth } from "./auth.jsx";
import axios from "axios";
import apis from "../../config/apis.js";
const AdminContext = createContext();
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
export const AdminProvider = ({ children }) => {
  const {
    loading,
    properties,
    error: reduxError,
  } = useSelector((state) => state.propertySlices);
  const [auth] = useAuth();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("properties");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [localError, setLocalError] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userFilter, setUserFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const { data } = await axios.get(`${apis[0]}/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(data.users);
        setLoadingUsers(false);
      } catch (err) {
        console.log(err);
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (auth?.token) {
      dispatch(fetchAllPropertiesAdmin());
    } else {
      setLocalError("Please login first to view dashboard");
    }
  }, [dispatch, auth?.token]);
  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location?.toLowerCase().includes(searchTerm.toLowerCase());

    if (propertyFilter !== "all")
      return matchesSearch && prop.status === propertyFilter;
    return matchesSearch;
  });

  const agents = users.filter((user) => user.role === "agent");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    if (userFilter === "agents") return matchesSearch && user.role === "agent";
    if (userFilter === "users") return matchesSearch && user.role === "user";
    return matchesSearch;
  });

  const handleDeleteUser = async (userId) => {
    try {
      console.log("Deleting user:", userId);
      setUsers(users.filter((user) => user.id !== userId));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleVerifyAgent = async (userId) => {
    try {
      console.log("Verifying agent:", userId);
    } catch (err) {
      console.error("Error verifying agent:", err);
    }
  };

  const value = {
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    searchTerm,
    setSearchTerm,
    loading,
    loadingUsers,
    error: reduxError || localError,
    users,
    agents,
    properties,
    filteredUsers,
    filteredProperties,
    userFilter,
    setUserFilter,
    propertyFilter,
    setPropertyFilter,
     handleDeleteUser,
    handleVerifyAgent,
    fetchUsers: () => {
      const fetchUsers = async () => {
        try {
          setLoadingUsers(true);
          const { data } = await axios.get(`${apis[0]}/all`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setUsers(data.users);
          setLoadingUsers(false);
        } catch (err) {
          console.log(err);
          setLoadingUsers(false);
        }
      };
      fetchUsers();
    },
  };

  return (
    <AdminContext.Provider value={value}>
              {children}
      </AdminContext.Provider>
  );
};
