import axios from "axios";
import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../messages/toastify";
import apis from "../../config/apis.js";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${apis[0]}/reset-password/${id}`, {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      const { warning, success } = data;
      if (warning) {
        errorToast(warning);
      }
      if (success) {
        successToast(success);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-black dark:via-gray-900 dark:to-orange-950 px-3 transition-colors duration-300">
      <div className="w-full max-w-md mx-auto p-8 bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-orange-500/10 transition-colors duration-300">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Reset <span className="text-orange-500">Password</span>
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Enter your new password below
        </p>

        <form onSubmit={resetPasswordHandler} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />

          <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg hover:shadow-orange-500/30">
            Reset Password
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          <a
            href="/login"
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:underline"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;