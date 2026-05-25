import React from "react";
import { motion } from "framer-motion";
import {
  HomeOutlined,
  FileTextOutlined,
  CalculatorOutlined,
  UserOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined,
  FundOutlined,
  RocketOutlined,
  DollarOutlined,
  TeamOutlined,
  CameraOutlined,
  AuditOutlined,
} from "@ant-design/icons";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: <HomeOutlined />,
      title: "Property Listing",
      description:
        "Premium property listing services with professional photography and maximum exposure across all major platforms.",
      features: [
        "Professional Photography",
        "360° Virtual Tours",
        "Multiple Platform Listing",
        "Featured Placement",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 2,
      icon: <CameraOutlined />,
      title: "Property Marketing",
      description:
        "Strategic marketing campaigns to attract qualified buyers through digital and traditional channels.",
      features: [
        "Social Media Marketing",
        "Email Campaigns",
        "Open House Events",
        "Targeted Advertising",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 3,
      icon: <CalculatorOutlined />,
      title: "Property Valuation",
      description:
        "Accurate property valuation using market analysis and current market trends to price your property right.",
      features: [
        "Market Analysis",
        "Comparative Market Study",
        "Professional Appraisal",
        "Pricing Strategy",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 4,
      icon: <UserOutlined />,
      title: "Seller Representation",
      description:
        "Dedicated seller agents who work exclusively for your interests and handle negotiations.",
      features: [
        "Exclusive Representation",
        "Professional Negotiation",
        "Buyer Qualification",
        "Offer Management",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 5,
      icon: <FileTextOutlined />,
      title: "Legal Documentation",
      description:
        "Complete legal support for property sales including contracts and all necessary paperwork.",
      features: [
        "Contract Preparation",
        "Legal Disclosures",
        "Title Transfer",
        "Closing Documents",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 6,
      icon: <AuditOutlined />,
      title: "Closing Coordination",
      description:
        "End-to-end closing coordination ensuring your sale completes successfully and on time.",
      features: [
        "Timeline Management",
        "Party Coordination",
        "Inspection Management",
        "Funds Transfer",
      ],
      color: "from-orange-500 to-orange-600",
    },
  ];

  const stats = [
    { value: "500+", label: "Properties Sold", icon: <HomeOutlined /> },
    { value: "1000+", label: "Happy Clients", icon: <UserOutlined /> },
    { value: "50+", label: "Expert Agents", icon: <TeamOutlined /> },
    { value: "15+", label: "Years Experience", icon: <RocketOutlined /> },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
  };

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-300/30 dark:bg-orange-600/10 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500 rounded-full mb-6">
            <span className="text-orange-600 dark:text-orange-400 text-sm font-semibold">
              ✦ OUR SERVICES
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Property Seller <span className="text-orange-500">Services</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete selling solutions to help you get the best value for your
            property with a seamless experience.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="text-3xl text-orange-500 mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon with Gradient Background */}
              <div className="relative p-8 pb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          {[
            { icon: <SafetyOutlined />, text: "100% Verified Properties" },
            { icon: <ThunderboltOutlined />, text: "Fast & Reliable Service" },
            { icon: <EnvironmentOutlined />, text: "Prime Locations" },
            { icon: <FundOutlined />, text: "Best Market Value" },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <span className="text-orange-500 text-xl">{badge.icon}</span>
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;