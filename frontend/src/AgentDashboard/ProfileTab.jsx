import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Calendar, Home, User } from "lucide-react";
import profile from "../img/Profile.jpg";  
import { useAgent } from "../Context/AgentContext";
import { useAuth } from "../Context/auth";

const ProfileTab = () => {
  const { agentData, properties } = useAgent();
  const [auth] = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        My Profile
      </h2>
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
        <div className="relative h-16 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col items-center mt-12 mb-4">
            <img
              src={profile}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3">
              {auth?.user && `${auth.user.first_name} ${auth.user.last_name}`}
            </h3>
            <p className="text-sm text-gray-500">Royal Crest Estate Agent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white pl-8">
                {auth?.user?.email || "—"}
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white pl-8">
                {agentData?.phone || auth?.user?.phone || "03251987313"}
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Member Since
                </span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white pl-8">
                {auth?.user?.createdAt?.split("T")[0] || "—"} 
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white pl-8">
                {auth?.user?.role || "Agent"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-orange-500">
                {properties?.length || 0}
              </p>
              <p className="text-xs text-gray-500">Total Properties</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-green-500">
                {properties?.filter(
                  (p) => p.status === "active" || p.status === "approved",
                ).length || 0}
              </p>
              <p className="text-xs text-gray-500">Active Listings</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-blue-500">
                {properties?.filter((p) => p.status === "sold").length || 0}
              </p>
              <p className="text-xs text-gray-500">Sold Properties</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileTab;