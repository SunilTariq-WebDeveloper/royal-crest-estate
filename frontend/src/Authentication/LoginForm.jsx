import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { useAuth } from "../Context/auth.jsx";
import { errorToast, successToast, warningToast } from "../messages/toastify";
import axios from "axios";
import apis from "../../config/apis";
import { useDispatch } from "react-redux";
import { setAuth } from "../Redux/Slices/authSlice.js";
import { Eye, EyeOff } from "lucide-react";
import { Helmet } from "react-helmet-async";
const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [auth, setAuthContext] = useAuth();
  useEffect(() => {
    if (auth?.token) {
      navigate("/", { replace: true });
    }
  }, [auth?.token, navigate]);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${apis[0]}/login`, user);

      console.log("LOGIN RESPONSE:", data);

      const { warning, error, message } = data;

      if (warning) {
        warningToast(warning);
      }

      if (error) {
        errorToast(error);
      }

      if (message) {
        const authData = {
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
        };
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuthContext(authData);
        dispatch(setAuth(authData));

        successToast(message);

        setTimeout(() => {
          const from = location.state?.from?.pathname || "/";

          navigate(from, { replace: true });
        }, 1500);
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      errorToast("Login failed");
    }
  };

  return (
    <div>
       <Helmet>
        <title>Login - Royal Crest Estate</title>
        <meta name="description" content="Login to your Royal Crest Estate account to access saved properties, dashboard, and manage listings." />
        <meta name="robots" content="noindex, nofollow"/>
      </Helmet>

    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-black dark:via-gray-900 dark:to-orange-950 px-3 transition-colors duration-300">
      <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl px-10 py-4 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-orange-500/10 w-full max-w-md border border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight text-center mb-2">
          Welcome Back To <br />
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

        <form onSubmit={loginHandler} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={changeHandler}
              value={user.email}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>

       

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={changeHandler}
                value={user.password}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/forget-password"
              className="text-orange-500 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
      </div>

  );
};

export default LoginForm;