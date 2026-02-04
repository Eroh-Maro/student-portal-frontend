import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { token, user, loading } = useAuth();

  // ⏳ Wait until auth state is restored from localStorage
  if (loading) return null;

  // ❌ Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // ❌ Not admin
  if (user?.role !== "admin") return <Navigate to="/" replace />;

  // ✅ Allow admin access
  return <Outlet />;
};

export default AdminRoute;