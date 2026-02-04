import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { token, user, logout } = useAuth();

  // Hide navbar if not logged in
  if (!token) return null;

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">Student Portal</div>

          {/* Hamburger */}
          <button
            className="nav-toggle"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          {/* DESKTOP LINKS */}
          <ul className="nav-links desktop">
            {isAdmin ? (
              <>
                <li><Link to="/admin">Dashboard</Link></li>
                <li><Link to="/admin/create-course">Create Course</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            )}

            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </nav>

      {/* MOBILE SIDE DRAWER */}
      <div className={`side-drawer ${open ? "open" : ""}`}>
        <button
          className="drawer-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <ul>
          {isAdmin ? (
            <>
              <li onClick={() => setOpen(false)}>
                <Link to="/admin">Dashboard</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="/admin/create-course">Create Course</Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={() => setOpen(false)}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="/courses">Courses</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          )}

          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default Navbar;