import { useState } from "react";
import "./Auth.css";

const API = "https://eroh-maro-student-portal-backend.vercel.app/";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/forgot`, {   // ✅ FIXED ROUTE
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      setSuccess("If this email exists, a reset link has been sent.");
      setLoading(false);
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Forgot Password</h1>
        <p className="auth-subtitle">
          Enter your email to receive a reset link
        </p>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </label>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;