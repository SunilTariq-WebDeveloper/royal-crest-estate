import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiFilter, FiMoreVertical } from "react-icons/fi";
import { MdOutlineAdminPanelSettings, MdOutlinePerson } from "react-icons/md";
import { Trash2, UserLock, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../Context/auth.jsx";
import apis from "../../../config/apis.js";
import { errorToast } from "../../messages/toastify.js";
import { Menu, MenuItem } from "@mui/material"; 

const Users = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [auth] = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenuId(null);
  };

  const handleRoleChange = async (newRole) => {
    try {
      await axios.patch(
        `${apis[0]}/${selectedUser}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        },
      );
      handleMenuClose();
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch users
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${apis[0]}/all`);
      const { users } = data;
      setUsers(users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Handle delete user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${apis[0]}/${id}`);
        getUsers();
      } catch (err) {
        errorToast(err);
      }
    }
  };

  // Filter users
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.toLowerCase());

    if (filterRole === "all") return matchesSearch;
    return matchesSearch && user.role === filterRole;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers?.filter(user => user.role !== "admin").slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((filteredUsers?.filter(user => user.role !== "admin").length || 0) / itemsPerPage);

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return { bg: 'bg-orange-100 dark:bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400', icon: MdOutlineAdminPanelSettings, label: 'Admin' };
      case 'agent':
        return { bg: 'bg-green-100 dark:bg-green-500/20', text: 'text-green-600 dark:text-green-400', icon: MdOutlinePerson, label: 'Agent' };
      default:
        return { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400', icon: MdOutlinePerson, label: 'User' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 sm:p-6 transition-colors duration-300">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Users Management
            </h1>
          </div>
          <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-center">
            {filteredUsers?.filter(user => user.role !== "admin").length || 0} Users
          </span>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 ml-1 sm:ml-4">
          Manage and monitor all registered users
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-4 sm:p-5 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="relative sm:w-48">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-gray-900 dark:text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="agent">Agents</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchText || filterRole !== "all") && (
          <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Active filters:
            </span>
            {searchText && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-xs sm:text-sm border border-orange-200 dark:border-orange-500/30">
                Search: {searchText}
                <button
                  onClick={() => setSearchText("")}
                  className="ml-1 hover:text-orange-700 dark:hover:text-orange-300"
                >
                  ×
                </button>
              </span>
            )}
            {filterRole !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-xs sm:text-sm border border-orange-200 dark:border-orange-500/30">
                Role: {filterRole}
                <button
                  onClick={() => setFilterRole("all")}
                  className="ml-1 hover:text-orange-700 dark:hover:text-orange-300"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Users</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{users?.length || 0}</h3>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <MdOutlinePerson className="text-xl sm:text-2xl text-orange-500" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Regular Users</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{users?.filter(u => u.role !== "admin").length || 0}</h3>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <MdOutlinePerson className="text-xl sm:text-2xl text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Admins</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{users?.filter(u => u.role === "admin").length || 0}</h3>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center">
              <MdOutlineAdminPanelSettings className="text-xl sm:text-2xl text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {currentUsers?.map((user, index) => {
                    const roleBadge = getRoleBadge(user.role);
                    const Icon = roleBadge.icon;
                    return (
                      <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{indexOfFirstItem + index + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.first_name || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.last_name || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Icon size={16} className={roleBadge.text} />
                            <span className={`px-2 py-1 ${roleBadge.bg} ${roleBadge.text} rounded-full text-xs font-medium`}>
                              {roleBadge.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => handleMenuOpen(e, user._id)}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                              <FiMoreVertical size={18} className="dark:text-white" />
                            </button>
                            <button onClick={() => deleteUser(user._id)} className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                              <Trash2 size={18} className="text-red-500" />
                            </button>
                            <button className="p-1.5 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded">
                              <UserLock size={18} className="text-rose-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-800">
              {currentUsers?.map((user, index) => {
                const roleBadge = getRoleBadge(user.role);
                const Icon = roleBadge.icon;
                return (
                  <div key={user._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => deleteUser(user._id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded">
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                        <button className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded">
                          <UserLock size={18} className="text-rose-500" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className={roleBadge.text} />
                        <span className={`px-2 py-1 ${roleBadge.bg} ${roleBadge.text} rounded-full text-xs font-medium`}>
                          {roleBadge.label}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleMenuOpen(e, user._id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      >
                        <FiMoreVertical size={18} className="dark:text-white" />
                      </button>
                    </div>
                    
                    {/* Dropdown Menu for Mobile */}
                    {selectedUser === user._id && anchorEl && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRoleChange("agent")}
                            className="flex-1 px-3 py-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100"
                          >
                            Make Agent
                          </button>
                          <button
                            onClick={() => handleRoleChange("user")}
                            className="flex-1 px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100"
                          >
                            Make User
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleRoleChange("agent")}>
          Make Agent
        </MenuItem>
        <MenuItem onClick={() => handleRoleChange("user")}>
          Make User
        </MenuItem>
      </Menu>

      {/* Footer Info */}
      <div className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-right">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default Users;