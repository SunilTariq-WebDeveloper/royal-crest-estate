import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";
import { successToast } from "../messages/toastify";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("auth"); 
    setAuth(null); 
    successToast("Logged out successfully");
    navigate("/"); 

  };

  return (
    <button
      onClick={handleLogout}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
