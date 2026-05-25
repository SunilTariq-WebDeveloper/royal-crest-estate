import React from "react";
import {
  Users,
  UserCheck,
  Building2,
  ShieldCheck,
  ShieldX,
  ClipboardClock,
} from "lucide-react";
import { useAdmin } from "../Context/AdminContext";

const StatsCards = () => {
  const { users, agents, properties } = useAdmin();

  const pendingProperties =
    properties?.filter((p) => p.status === "pending") || [];

  const approvedProperties =
    properties?.filter((p) => p.status === "approved") || [];

  const rejectedProperties =
    properties?.filter((p) => p.status === "rejected") || [];

  const stats = [
    {
      icon: Users,
      iconBg: "from-orange-500 to-orange-600",
      value: users?.length || 0,
      label: "Total Users",
    },
    {
      icon: UserCheck,
      iconBg: "from-blue-500 to-blue-600",
      value: agents?.length || 0,
      label: "Total Agents",
    },
    {
      icon: Building2,
      iconBg: "from-green-500 to-green-600",
      value: properties?.length || 0,
      label: "Total Properties",
    },
    {
      icon: ClipboardClock,
      iconBg: "from-yellow-500 to-yellow-600",
      value: pendingProperties.length,
      label: "Pending Properties",
    },
    {
      icon: ShieldCheck,
      iconBg: "from-emerald-500 to-emerald-600",
      value: approvedProperties.length,
      label: "Approved Properties",
    },
    {
      icon: ShieldX,
      iconBg: "from-red-500 to-red-600",
      value: rejectedProperties.length,
      label: "Rejected Properties",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${stat.iconBg} rounded-xl flex items-center justify-center text-white`}
            >
              <stat.icon className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;