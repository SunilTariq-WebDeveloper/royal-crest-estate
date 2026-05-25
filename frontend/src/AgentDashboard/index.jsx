import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useAgent } from "../Context/AgentContext";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import PropertiesTab from "./PropertiesTab";
import ProfileTab from "./ProfileTab";
import LoadingSpinner from "./LoadingSpinner";
import EditPropertyForm from "../pages/EditPropertyForm";
import AddPropertyForm from "../pages/AddPropertyForm";
import Profile from "../pages/Profile";
import AgentInquiries from "./AgentInquiries";
const AgentDashboard = () => {
  const { loading, error, sidebarOpen } = useAgent();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="relative z-10 flex">
        <Sidebar />

        <main
          className={`flex-1 transition-all duration-300 min-h-screen ${
            sidebarOpen ? "lg:ml-[280px]" : "lg:ml-[80px]"
          }`}
        >
          <TopBar />

          <div className="p-6">
            <AnimatePresence mode="wait">
              <TabRenderer />
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
const TabRenderer = () => {
  const { activeTab,setActiveTab } = useAgent();
if (activeTab.startsWith("editProperty-")) {
  const propertyId = activeTab.split("-")[1];
  return (
    <EditPropertyForm
      propertyId={propertyId}
      onSuccess={() => setActiveTab("myProperties")}
    />
  );
}


  switch (activeTab) {
    case "properties":
      return <PropertiesTab key="properties" />;
    case "profile":
      return <Profile key="profile" />;
    case "addProperty":
      return <AddPropertyForm />;
    case "Inquiry":
      return <AgentInquiries />;
    default:
      return null;
  }
};

export default AgentDashboard;