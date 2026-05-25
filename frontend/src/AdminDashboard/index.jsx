import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useAdmin } from "../Context/AdminContext.jsx";
import Sidebar from "./Sidebar-admin.jsx";
import TopBar from "./TopBar";
import StatsCards from "./StatsCards";
import UsersTab from "./Tabs/UsersTab";
import PropertiesTab from "./Tabs/PropertiesTab";
import ActivitiesTab from "./Tabs/ActivitiesTab";
import LoadingSpinner from "./Modals/LoadingSpinner.jsx";
import ActivitySection from "./Tabs/ActivitiesTab";
import ContactMessages from "./Tabs/ContactMessages.jsx";
import AddPropertyForm from "../pages/AddPropertyForm.jsx";
import EditPropertyForm from "../pages/EditPropertyForm.jsx";
import { Helmet } from "react-helmet-async";

const AdminDashboard = () => {
  const { loading, error, sidebarOpen,activeTab } = useAdmin();

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard - Royal Crest Estate</title>
        <meta
          name="description"
          content="Manage your property listings, view inquiries, and track your favourite properties on Royal Crest Estate dashboard."
        />
        <meta
          property="og:title"
          content="User Dashboard - Royal Crest Estate"
        />
        <meta
          property="og:description"
          content="Access your saved properties, manage listings, and track real estate activities."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="relative flex">
          <Sidebar />
          <div
            className={`flex-1 transition-all duration-300 min-h-screen ${
              sidebarOpen ? "lg:ml-[280px]" : "lg:ml-[80px]"
            }`}
          >
            <TopBar />
            <div className="p-6">
              {activeTab === "properties" && <StatsCards />}

              <div className="mt-8">
                <TabsRenderer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const TabsRenderer = () => {
  const { activeTab, setActiveTab } = useAdmin();
if (activeTab.startsWith("editProperty-")) {
  const propertyId = activeTab.split("-")[1];

  return (
    <EditPropertyForm
      propertyId={propertyId}
      onSuccess={() => setActiveTab("properties")}
      onClose={() => setActiveTab("properties")}
    />
  );
}
  if (activeTab.startsWith("editProperty-")) {
    const propertyId = activeTab.split("-")[1];

    return (
      <EditPropertyForm
        propertyId={propertyId}
        onSuccess={() => setActiveTab("properties")}
        onClose={() => setShowEdit(false)}

      />
    );
  }

  switch (activeTab) {
    case "users":
      return <UsersTab />;

    case "agents":
      return <AgentsTab />;

    case "properties":
      return <PropertiesTab />;

    case "addProperty":
      return <AddPropertyForm />;

    case "ContactMessages":
      return <ContactMessages />;

    case "activities":
      return <ActivitySection />;

    default:
      return null;
  }
};

export default AdminDashboard;