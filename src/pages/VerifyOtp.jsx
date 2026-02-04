import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div className="page auth-page">
        <div className="auth-card">
          <p className="auth-error">
            Invalid access. Please sign up again.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://172.20.10.4:5000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Verification failed");
        setLoading(false);
        return;
      }

      // success → go to login
      navigate("/login");
    } catch {
      setError("Network error. Check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Verify Email</h1>
        <p>
          Enter the OTP sent to <b>{email}</b>
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
            required
          />

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;