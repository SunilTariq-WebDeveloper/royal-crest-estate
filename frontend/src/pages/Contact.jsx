import React, { useState } from "react";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  SendOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  UserOutlined,
  MessageOutlined,
  GlobalOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
  ArrowRightOutlined,
  StarOutlined,
  TeamOutlined,
  TrophyOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import apis from "../../config/apis";
import { errorToast, successToast, warningToast } from "../messages/toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const contactInfo = [
    {
      icon: <EnvironmentOutlined />,
      title: "Visit Our Office",
      details: [
        "DHA Phase 6, Lahore",
        "Near Askari XI",
        "Lahore, Pakistan 54000",
      ],
      color: "from-orange-500 to-orange-600",
      extra: "Get directions →",
    },
    {
      icon: <PhoneOutlined />,
      title: "Call Us Anytime",
      details: ["+92 325 1987313"],
      action: "tel:+923251987313",
      color: "from-blue-500 to-blue-600",
      extra: "24/7 Support Available",
    },
    {
      icon: <MailOutlined />,
      title: "Email Us",
      details: ["suniltariq08@gmail.com", "st.webdeveloper08@gmail.com"],
      action: "mailto:suniltariq08@gmail.com",
      color: "from-purple-500 to-purple-600",
      extra: "Response within 24 hours",
    },
    {
      icon: <ClockCircleOutlined />,
      title: "Working Hours",
      details: [
        "Monday - Friday: 9AM - 8PM",
        "Saturday: 10AM - 6PM",
        "Sunday: Closed",
      ],
      color: "from-green-500 to-green-600",
      extra: "Emergency Support: 24/7",
    },
  ];
  const offices = [
    {
      city: "Lahore (Head Office)",
      address: "DHA Phase 6, Sector X, Lahore",
      phone: "+92 325 1987313",
      email: "suniltariq08@gmail.com",
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      timings: "Mon-Sat: 9AM-8PM",
      features: ["Main Office", "Showroom Available", "Free Parking"],
    },
  ];

  const socialLinks = [
    {
      icon: <FacebookOutlined />,
      name: "Facebook",
      url: "#",
      color: "hover:bg-blue-600",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
    {
      icon: <TwitterOutlined />,
      name: "Twitter",
      url: "#",
      color: "hover:bg-sky-500",
      bg: "bg-sky-100 dark:bg-sky-500/20",
    },
    {
      icon: <InstagramOutlined />,
      name: "Instagram",
      url: "#",
      color: "hover:bg-pink-600",
      bg: "bg-pink-100 dark:bg-pink-500/20",
    },
    {
      icon: <LinkedinOutlined />,
      name: "LinkedIn",
      url: "#",
      color: "hover:bg-blue-700",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
    {
      icon: <WhatsAppOutlined />,
      name: "WhatsApp",
      url: "#",
      color: "hover:bg-green-600",
      bg: "bg-green-100 dark:bg-green-500/20",
    },
    {
      icon: <YoutubeOutlined />,
      name: "YouTube",
      url: "#",
      color: "hover:bg-red-600",
      bg: "bg-red-100 dark:bg-red-500/20",
    },
  ];
  const trustBadges = [
    {
      icon: <TrophyOutlined />,
      text: "Award Winning",
      color: "text-yellow-500",
    },
    {
      icon: <SafetyOutlined />,
      text: "100% Verified",
      color: "text-green-500",
    },
    { icon: <TeamOutlined />, text: "5000+ Clients", color: "text-blue-500" },
    { icon: <StarOutlined />, text: "4.9 Rating", color: "text-orange-500" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      errorToast(Object.values(validationErrors)[0]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apis[2]}/contact`, formData);
      if (res.data.success) {
        successToast("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else if (res.data.warning) warningToast(res.data.warning);
      else if (res.data.error) errorToast(res.data.error);
    } catch (error) {
      errorToast(
        error?.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (

    <div id="contact" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-black transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Let's Talk
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                Have questions about our properties or services? We're here to
                help you find your dream home.
              </p>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-orange-500" />
                  <span>Quick Response</span>
                </div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-orange-500" />
                  <span>Expert Guidance</span>
                </div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-orange-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`group bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-800`}
            >
              <div
                className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}
              >
                {info.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {info.title}
              </h3>
              <div className="space-y-1 mb-3">
                {info.details.map((detail, i) => (
                  <p
                    key={i}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {detail}
                  </p>
                ))}
              </div>
              {info.extra && (
                <p className="text-xs text-orange-500 font-medium mt-2">
                  {info.extra}
                </p>
              )}
              {info.action && (
                <a
                  href={info.action}
                  className="inline-flex items-center gap-1 mt-2 text-orange-500 text-sm font-medium hover:gap-2 transition-all"
                >
                  Contact Now <ArrowRightOutlined />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send Us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <div className="relative">
                      <UserOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all ${
                          errors.name
                            ? "border-red-500"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <div className="relative">
                      <MailOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <div className="relative">
                      <PhoneOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <MessageOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all ${
                          errors.subject
                            ? "border-red-500"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                      />
                    </div>
                    {errors.subject && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    rows="5"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <LoadingOutlined className="animate-spin" />
                  ) : (
                    <SendOutlined />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Office Cards */}
          <div className="space-y-6">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-800"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h4 className="text-white font-bold text-lg">
                      {office.city}
                    </h4>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-2 mb-3">
                    <div className="flex items-start gap-2 text-sm">
                      <EnvironmentOutlined className="text-orange-500 mt-1" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {office.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <PhoneOutlined className="text-orange-500" />
                      <a
                        href={`tel:${office.phone}`}
                        className="text-gray-600 dark:text-gray-400 hover:text-orange-500"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MailOutlined className="text-orange-500" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-gray-600 dark:text-gray-400 hover:text-orange-500"
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ClockCircleOutlined className="text-orange-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {office.timings}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                    {office.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-gray-600 dark:text-gray-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
