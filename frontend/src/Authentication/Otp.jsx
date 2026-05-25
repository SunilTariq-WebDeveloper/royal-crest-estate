import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import apis from "../../config/apis.js";

import { errorToast, successToast } from "../messages/toastify.js";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [userOTP, setUserOTP] = useState({
    otp: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    console.log(userOTP.otp);
    setUserOTP({ ...userOTP, [e.target.name]: e.target.value });
  };
  const decodeOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apis[0]}/decode-otp`, userOTP);
      console.log(res);
      const { error, success, id } = res.data;
      if (error) {
        errorToast(error);
      }
      if (success) {
        successToast(success);
        setTimeout(() => {
          navigate(`/reset-password/${id}`);
        }, 1000);
      }
    } catch (err) {}
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-black dark:via-gray-900 dark:to-orange-950 px-3 transition-colors duration-300">
      <form
        onSubmit={decodeOTP}
        className="flex flex-col gap-4 max-w-[400px] w-full p-8 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-2xl dark:shadow-orange-500/10 transition-colors duration-300"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
          Enter{" "}
          <span className="text-orange-500">
            <Typewriter
              words={["OTP"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Enter the 5-digit code sent to your email
        </p>

        <div className="mt-2">
          <input
            type="text"
            name="otp"
            onChange={changeHandler}
            value={userOTP.otp}
            placeholder="Enter OTP"
            maxLength="5"
            className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-center text-xl tracking-widest py-3 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base font-semibold transition-all duration-300 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg hover:shadow-orange-500/30"
        >
          Verify OTP
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Didn't receive code?{" "}
          <button
            type="button"
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-semibold hover:underline transition-colors"
          >
            Resend
          </button>
        </p>

        <a
          href="/login"
          className="text-center text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
        >
          ← Back to Login
        </a>
      </form>
    </div>
  );
};

export default OTP;