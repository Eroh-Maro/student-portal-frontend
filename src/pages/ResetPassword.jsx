import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

const API = "http://localhost:5000";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API}/auth/reset/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Reset failed");
        setLoading(false);
        return;
      }

      setSuccess("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Reset Password</h1>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* NEW PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirm((s) => !s)}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          <button className="auth-button" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;