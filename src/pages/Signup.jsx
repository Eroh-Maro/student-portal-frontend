import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const API = "https://eroh-maro-student-portal-backend.vercel.app";

/* Case-insensitive regex */
const matricRegex =
  /^(FOS|FNG|FOL|COS|FOE|FOA|PHC|BMS)\/\d{2}\/\d{2}\/\d{4,6}$/i;

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    matric: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* PASSWORD STRENGTH */
  const getStrength = (pwd) => {
    if (pwd.length < 6) return "weak";
    if (pwd.match(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)) return "strong";
    return "medium";
  };

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "matric" ? value.toUpperCase() : value,
    });

    setError("");
  };

  const validate = () => {
    if (!form.name.trim()) return "Full name is required";
    if (!form.email.includes("@")) return "Enter a valid email";
    if (!matricRegex.test(form.matric)) return "Invalid matric number format";
    if (form.password.length < 8)
      return "Password must be at least 8 characters";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        matric: form.matric.toUpperCase(),
      };

      const res = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      navigate("/verify-otp", { state: { email: form.email } });
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Create student account</h1>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="matric"
            placeholder="Matric No. (e.g. FOS/24/25/209282)"
            value={form.matric}
            onChange={handleChange}
            disabled={loading}
          />

          {/* PASSWORD FIELD */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* PASSWORD STRENGTH */}
          {form.password && (
            <div className={`password-strength ${strength}`}>
              {strength === "weak" && "Weak password"}
              {strength === "medium" && "Medium strength"}
              {strength === "strong" && "Strong password"}
            </div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p className="auth-footer">
            Have an account already? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;