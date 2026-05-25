import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import apis from "../../config/apis.js";
import { useNavigate, Link } from "react-router-dom";
import {Mail} from "lucide-react";

import {
  warningToast,
  errorToast,
  successToast,
} from "../messages/toastify.js";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const forgetHandler = async (values) => {
    try {
      const res = await axios.post(`${apis[0]}/otp`, values);
      const { error, message, warning } = res.data;
      if (warning) {
        warningToast(warning);
      }
      if (error) {
        errorToast(error);
      }
      if (message) {
        successToast(message);
        setTimeout(() => {
          navigate("/decode-otp");
        }, 1000);
      }
    } catch (err) {
      console.log("BACKEND ERROR 👉", err.response?.data);
      alert(err.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),

    onSubmit: forgetHandler,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-black dark:via-gray-900 dark:to-orange-950 px-3 transition-colors duration-300 relative overflow-hidden">
      <di className="absolute inset-0 opacity-10 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </di>

      <form
        onSubmit={formik.handleSubmit}
        className="relative z-10 flex flex-col gap-4 max-w-[400px] w-full p-8 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-2xl dark:shadow-orange-500/10 transition-colors duration-300"
      >
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 rounded-2xl mb-4 border border-orange-500/30 mx-auto">
            <span className="text-3xl text-orange-500">🔒</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Forget{" "}
            <span className="text-orange-500">
              <Typewriter
                words={["Password"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your registered email to receive OTP
          </p>
        </div>
        <div className="mt-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label> 
          <div className="relative group">
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
              className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
            {/* Email Icon */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail />
            </span>
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-400 mt-1">{formik.errors.email}</p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            We'll send a 5-digit OTP to this email
          </p>
        </div>
        <button
          type="submit"
          className="mt-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base font-semibold transition-all duration-300 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg hover:shadow-orange-500/30"
        >
          Send OTP
        </button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Remember password?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-semibold hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;