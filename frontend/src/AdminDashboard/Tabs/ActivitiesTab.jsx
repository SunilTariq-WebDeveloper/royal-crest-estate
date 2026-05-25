import React from "react";
import {
  Home,
  CheckCircle,
  XCircle,
  UserPlus,
  User
} from "lucide-react";

const ActivitySection = ({ properties, users }) => {

  const activities = [];

  properties?.slice(0, 3).forEach((p) => {
    activities.push({
      icon: Home,
      text: `${p.title} property added`,
      color: "text-blue-500",
      time: new Date(p.createdAt).toLocaleDateString()
    });

    if (p.status === "approved") {
      activities.push({
        icon: CheckCircle,
        text: `${p.title} property approved`,
        color: "text-green-500",
        time: new Date(p.updatedAt).toLocaleDateString()
      });
    }

    if (p.status === "rejected") {
      activities.push({
        icon: XCircle,
        text: `${p.title} property rejected`,
        color: "text-red-500",
        time: new Date(p.updatedAt).toLocaleDateString()
      });
    }
  });

  users?.slice(0, 2).forEach((u) => {
    activities.push({
      icon: u.role === "agent" ? UserPlus : User,
      text: `${u.first_name} joined as ${u.role}`,
      color: "text-purple-500",
      time: new Date(u.createdAt).toLocaleDateString()
    });
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
      
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.slice(0, 6).map((act, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-3"
          >
            <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800`}>
              <act.icon className={`w-5 h-5 ${act.color}`} />
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {act.text}
              </p>
              <span className="text-xs text-gray-400">{act.time}</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ActivitySection;