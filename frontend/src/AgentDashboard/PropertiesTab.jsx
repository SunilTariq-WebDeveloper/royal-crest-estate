import React from "react";
import { motion } from "framer-motion";
import { PlusCircle, Home } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";
import { useAgent } from "../Context/AgentContext";

const PropertiesTab = () => {
  const {
    filteredProperties,
      searchTerm,
  } = useAgent();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Properties
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            You have {filteredProperties.length} properties total
          </p>
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No properties found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "Try a different search term"
              : "Add your first property to get started"}
          </p>
          {!searchTerm && (
            <Link to="/add">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 inline-flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Add Property
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties?.map((property) => (
            <PropertyCard
              key={property.id || property._id}
              property={property}
              fadeInUp={fadeInUp}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PropertiesTab;