import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Courses from "../pages/Courses.jsx";
import Profile from "../pages/Profile.jsx";
import VerifyOtp from "../pages/VerifyOtp.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import CreateCourse from "../pages/CreateCourse.jsx"; // ✅ NEW

import ProtectedRoute from "./ProtectedRoutes.jsx";
import AdminRoute from "./AdminRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // PUBLIC ROUTES
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "verify-otp", element: <VerifyOtp /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },

      // PROTECTED STUDENT ROUTES
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "courses", element: <Courses /> },
          { path: "profile", element: <Profile /> },
        ],
      },

      // 🔐 ADMIN ROUTES
      {
        element: <AdminRoute />,
        children: [
          { path: "admin", element: <AdminDashboard /> },
          { path: "admin/create-course", element: <CreateCourse /> }, // ✅ NEW ROUTE
        ],
      },
    ],
  },
]);

export default router;