import "./css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavigationBar";
import Home from "./pages/Home";
import About from "./pages/About";
import PropertyListing from "./pages/PropertyListing";
import LoginForm from "./Authentication/LoginForm.jsx";
import SignupForm from "./Authentication/Signup.jsx";
import WhyChooseUs from "./pages/Choose";
import ContactForm from "./pages/Contact";
import FAQPage from "./pages/FAQ";
import SingleProperty from "./pages/SinglePage";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AgentDashboard from "./AgentDashboard/index.jsx";
import AdminDashboard from "./AdminDashboard";
import ActivateAccount from "./Authentication/ActiveAcount.jsx";
import { ToastContainer } from "react-toastify";
import AuthContext from "./Context/auth";
import ForgetPassword from "./Authentication/ForgetPassword.jsx";
import OTP from "./Authentication/Otp";
import { ThemeProvider } from "./Context/ThemeContext";
import ResetPassword from "./Authentication/ResetPassword";
import { AdminProvider } from "./Context/AdminContext.jsx";
import ServicesSection from "./pages/Services.jsx";
import { AgentProvider } from "./Context/AgentContext.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import Loading from "./components/Starting-Loader.jsx";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./components/Loader.jsx";
function App() {
   const [loading, setLoading] = useState(true);
   

   useEffect(() => {
     setTimeout(() => {
       setLoading(false);
     }, 3000); 
   }, []);

   if (loading) {
     return <Loading />;
   }
  return (
    <div>
      <AuthContext>
        <ThemeProvider>
          <Router>
            <ScrollToTop />
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/choose" element={<WhyChooseUs />} />
              <Route path="/Faq" element={<FAQPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/services" element={<ServicesSection />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route
                path="/auth/activate/:token"
                element={<ActivateAccount />}
              />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/decode-otp" element={<OTP />} />
              <Route path="/reset-password/:id" element={<ResetPassword />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/properties" element={<PropertyListing />} />
              <Route
                path="/agent-dashboard"
                element={
                  <ProtectedRoute role="agent">
                    <AgentProvider>
                      <AgentDashboard />
                    </AgentProvider>
                  </ProtectedRoute>
                }
              />
              <Route path="/property/:id" element={<SingleProperty />} />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminProvider>
                      <AdminDashboard />
                    </AdminProvider>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthContext>
    </div>
  );
}

export default App;
