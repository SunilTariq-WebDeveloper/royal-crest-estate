// components/Loading.jsx
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="text-center">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative mb-8"
        >
          {/* Soft Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-orange-300 rounded-full blur-xl opacity-30"
          />

          {/* Logo */}
          <div className="relative z-10">
            <svg className="w-28 h-28 mx-auto" viewBox="0 0 200 200">
              {/* Crown */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M40 140 L60 60 L100 85 L140 60 L160 140 L100 170 Z"
                stroke="#f97316"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Crown Center */}
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                cx="100"
                cy="110"
                r="10"
                fill="#f97316"
              />

              {/* Crown Details */}
              {[60, 80, 100, 120, 140].map((x, i) => (
                <motion.circle
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  cx={x}
                  cy="75"
                  r="3"
                  fill="#f97316"
                />
              ))}

              {/* Base Line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                d="M50 145 L100 153 L150 145"
                stroke="#f97316"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Brand Name - Royal Crest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            <span className="text-orange-500">Royal</span>
            <span className="text-gray-800"> Crest</span>
          </h1>

          {/* Tagline */}
          <div className="mt-2">
            <span className="text-orange-400 text-xs tracking-[0.3em] font-medium">
              REAL ESTATE
            </span>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "50px" }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="h-0.5 bg-gradient-to-r from-orange-400 to-transparent mx-auto mt-3"
          />
        </motion.div>

        {/* Animated Loading Dots */}
        <div className="flex gap-2 justify-center mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                backgroundColor: ["#f97316", "#fdba74", "#f97316"],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#f97316" }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 text-xs mt-3 tracking-wider"
        >
          LOADING YOUR DREAM PROPERTY
        </motion.p>

        {/* Premium Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 1 }}
          transition={{ delay: 1 }}
          className="h-[2px] bg-orange-100 rounded-full mt-5 overflow-hidden mx-auto"
          style={{ width: "200px" }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-300"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
