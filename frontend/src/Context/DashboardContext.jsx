import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPropertiesAdmin } from "../Redux/Actions/propertyAction.js";
import axios from "axios";
import apis from "../../config/apis.js";

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children, auth }) => {
  const dispatch = useDispatch();
  const {
    properties,
    loading,
    error: reduxError,
  } = useSelector((state) => state.propertySlices);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("properties");
  const [searchTerm, setSearchTerm] = useState("");
  const [localError, setLocalError] = useState(null);

  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Fetch Users
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
        console.error(err);
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch Properties
  useEffect(() => {
    if (auth?.token) {
      dispatch(fetchAllPropertiesAdmin());
    } else {
      setLocalError("Please login first to view dashboard");
    }
  }, [dispatch, auth?.token]);

  // Filtered Data
  const agents = users.filter((user) => user.role === "agent");

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location?.toLowerCase().includes(searchTerm.toLowerCase());
    if (propertyFilter !== "all")
      return matchesSearch && prop.status === propertyFilter;
    return matchesSearch;
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    if (userFilter === "agents") return matchesSearch && user.role === "agent";
    if (userFilter === "users") return matchesSearch && user.role === "user";
    return matchesSearch;
  });

  // Handlers
  const handleVerifyAgent = async (userId) => {
    console.log("Verify agent:", userId);
  };

  const handleBlockUser = async (userId) => {
    console.log("Block/unblock user:", userId);
  };

  const error = reduxError || localError;

  return (
    <DashboardContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        activeTab,
        setActiveTab,
        searchTerm,
        setSearchTerm,
        users,
        filteredUsers,
        agents,
        properties,
        filteredProperties,
        userFilter,
        setUserFilter,
        propertyFilter,
        setPropertyFilter,
        loading,
        loadingUsers,
        error,
        handleVerifyAgent,
        handleBlockUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
