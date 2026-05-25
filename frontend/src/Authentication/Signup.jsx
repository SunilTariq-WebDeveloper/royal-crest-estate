
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typewriter } from "react-simple-typewriter";
import {
  warningToast,
  errorToast,
  successToast,
} from "../messages/toastify.js";
import apis from "../../config/apis.js";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const signupHandler = async (values, { resetForm }) => {
    console.log("Form submit ho gaya", values);

    try {
      setLoading(true);

      const { data } = await axios.post(`${apis[0]}/pre-signup`, values);

      const { warning, error, message } = data;

      if (warning) return warningToast(warning);
      if (error) return errorToast(error);

      if (message) {
        successToast(message);
        resetForm();
      }
    } catch (err) {
      errorToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },

    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "Minimum 2 characters")
        .required("First name is required"),

      last_name: Yup.string()
        .min(2, "Minimum 2 characters")
        .required("Last name is required"),

      email: Yup.string().email("Invalid email").required("Email is required"),

      password: Yup.string()
        .min(8, "At least 8 characters")
        .required("Password is required"),

      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),

    onSubmit: signupHandler,
  });

  return (
    <div>   
      <Helmet>
        <title>Create Account - Royal Crest Estate</title>
        <meta name="description" content="Register on Royal Crest Estate to save favourite properties, get alerts, and manage your real estate journey." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-black dark:via-gray-900 dark:to-orange-950 px-3 transition-colors duration-300">
      <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl px-10 py-4 md:p-7 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-orange-500/10 w-[400px] max-w-lg border border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            Sign Up for <br />
            <span className="text-orange-500">
              <Typewriter
                words={["Royal Crest Estate"]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={40}
                delaySpeed={1200}
              />
            </span>
          </h1>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <p className="text-xs text-red-400 mt-1">
                {formik.errors.first_name}
              </p>
            )}
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter Last Name"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <p className="text-xs text-red-400 mt-1">
                {formik.errors.last_name}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-400 mt-1">{formik.errors.email}</p>
            )}
          </div>

          
          <div className="md:col-span-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              maxLength={8}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>


          <div className="md:col-span-1">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              maxLength={8}
            />
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <p className="text-xs text-red-400 mt-1">
                  {formik.errors.confirm_password}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-md hover:from-orange-600 hover:to-orange-700 transition-all text-sm font-semibold disabled:opacity-60 shadow-md hover:shadow-lg hover:shadow-orange-500/30"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
       </div>
  );
};
export default SignupForm;