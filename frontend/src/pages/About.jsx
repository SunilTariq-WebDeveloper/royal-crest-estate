import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  HomeOutlined,
  TrophyOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  RiseOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  UserOutlined
} from "@ant-design/icons";

const RoyalCrestAbout = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const coreValues = [
    {
      icon: <TrophyOutlined className="text-3xl" />,
      title: "Excellence",
      description:
        "We strive for excellence in every project, ensuring the highest quality standards.",
    },
    {
      icon: <SafetyCertificateOutlined className="text-3xl" />,
      title: "Integrity",
      description:
        "Transparent dealings and ethical practices are at the heart of our business.",
    },
    {
      icon: <TeamOutlined className="text-3xl" />,
      title: "Client-Centric",
      description:
        "Our clients' dreams and satisfaction drive everything we do.",
    },
    {
      icon: <RiseOutlined className="text-3xl" />,
      title: "Innovation",
      description:
        "Embracing modern technology and innovative design solutions.",
    },
    {
      icon: <HeartOutlined className="text-3xl" />,
      title: "Passion",
      description: "Passionate about creating spaces that inspire and delight.",
    },
    {
      icon: <EnvironmentOutlined className="text-3xl" />,
      title: "Sustainability",
      description:
        "Committed to eco-friendly practices and sustainable development.",
    },
  ];
  const stats = [
    { value: "13+", label: "Years of Excellence", icon: <TrophyOutlined /> },
    { value: "1000+", label: "Properties Sold", icon: <HomeOutlined /> },
    { value: "5000+", label: "Happy Clients", icon: <UserOutlined /> },
    { value: "25+", label: "Cities", icon: <EnvironmentOutlined /> },
  ];

  return (
    <div id="about" className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent" />
        </motion.div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-orange-500 text-sm font-semibold">
              ✨ ABOUT US
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              About{" "}
              <span className="text-orange-500">Us</span>
            </h2>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Crafting Dreams,
              <span className="text-orange-500 block">Building Legacies</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Since 2010, Royal Crest Estate has been at the forefront of luxury
              real estate, transforming spaces into extraordinary living
              experiences.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="relative -mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-black/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-orange-500/20 dark:shadow-orange-500/10 p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl text-orange-500 mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-orange-500">Story</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Royal Crest Estate began with a simple yet powerful vision: to
              redefine luxury living through exceptional design, uncompromising
              quality, and unparalleled service. What started as a small
              boutique real estate firm has grown into one of the most trusted
              names in the industry.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Over the past decade, we've had the privilege of helping thousands
              of families find their dream homes and assisting investors in
              making sound real estate decisions. Our portfolio spans across
              luxury apartments, exclusive villas, commercial spaces, and
              premium plots in the most desirable locations.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Today, Royal Crest Estate stands as a symbol of trust, excellence,
              and innovation in the real estate sector. We continue to push
              boundaries, embrace new technologies, and set new standards in
              property development and client service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                alt="Luxury Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-xl p-4 rounded-xl border border-orange-500/30 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <HomeOutlined className="text-white text-xl" />
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-semibold">
                      Naqash Tariq
                    </div>
                    <div className="text-orange-500 text-sm">Founder & CEO</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  "Our commitment to excellence and client satisfaction has been
                  the cornerstone of our success."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-orange-500">Core Values</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide us in delivering exceptional real estate
              experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-black/60 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10 transition-all group"
              >
                <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoyalCrestAbout;