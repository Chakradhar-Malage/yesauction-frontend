import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login and remember where the user wanted to go
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;