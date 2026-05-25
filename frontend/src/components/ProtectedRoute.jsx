import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/auth";

const ProtectedRoute = ({ children, role }) => {
  const [auth] = useAuth();
  const location = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role && auth.user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
