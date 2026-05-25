import React from "react";
import { PlusCircle } from "lucide-react";
import UsersTable from "../Tables/UsersTable";
import { useAdmin } from "../../Context/AdminContext";

const UsersTab = () => {
  const {
    filteredUsers,
    userFilter,
    setUserFilter,
    handleVerifyAgent,
    handleBlockUser,
  } = useAdmin();

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {["all", "agents", "users"].map((filter) => (
            <button
              key={filter}
              onClick={() => setUserFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                userFilter === filter
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
              }`}
            >
              {filter === "all" ? "All Users" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <UsersTable
        users={filteredUsers}
        handleVerifyAgent={handleVerifyAgent}
        handleBlockUser={handleBlockUser}
      />
    </div>
  );
};

export default UsersTab;