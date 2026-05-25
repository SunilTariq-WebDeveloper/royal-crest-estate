import React from "react";
import Logo from "../img/Logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import BackToTop from "./BackToTop";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-black text-gray-600 dark:text-gray-300 pt-12 pb-6 border-t border-gray-200 dark:border-orange-500/20">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <img src={Logo} className="w-36 mb-4 mt-[-8px] dark:brightness-100" />
          <p className="text-gray-500 dark:text-gray-400">
            Helping you find your dream home with verified listings and expert
            agents.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            <a title="LinkeIn"
              href="#"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <FaLinkedinIn />
            </a>
            <a title="Facebook"
              href="#"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a title="Instagram"
              href="#"
              className="w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110"
            >
              <FaInstagram />
            </a>
           
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 relative inline-block">
            Quick Links
            <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-orange-500"></span>
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/#"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/#property-listing"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
              >
                Properties
              </a>
            </li>
            <li>
              <a
                href="/#choose"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
              >
                Why Choose Us
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/#services"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/#faq"
                className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}

<div className="flex justify-between">
  <div>
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 relative inline-block">
      Contact Us
      <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-orange-500"></span>
    </h4>

    <div className="space-y-3 text-gray-500 dark:text-gray-400">
      
      {/* Email */}
      <p className="flex items-start gap-3">
        <FaEnvelope className="text-orange-500 mt-1" />
        suniltariq08@gmail.com
      </p>

      {/* Phone */}
      <p className="flex items-start gap-3">
        <FaPhoneAlt className="text-orange-500 mt-1" />
        +92 3251987313
      </p>

      {/* Location */}
      <p className="flex items-start gap-3">
        <FaMapMarkerAlt className="text-orange-500 mt-1" />
        DHA Phase 8, Lahore, Pakistan
      </p>

    </div>
  </div>

  <div>
    <BackToTop />
  </div>
</div>
      </div>
      <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Royal Crest Estate. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;