import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Admin.css";

const API = "https://eroh-maro-student-portal-backend.vercel.app/";

const CreateCourse = () => {
  const { token } = useAuth();

  const [form, setForm] = useState({
    code: "",
    title: "",
    units: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.code || !form.title || !form.units || !form.department) {
      return setError("All fields are required");
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API}/courses/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          units: Number(form.units),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create course");
        setLoading(false);
        return;
      }

      setSuccess("Course created successfully");

      setForm({
        code: "",
        title: "",
        units: "",
        department: "",
      });

      setLoading(false);
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <section className="admin-header">
        <h1>Create Course</h1>
        <p>Add a new course to the system</p>
      </section>

      <div className="admin-form-card">
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            name="code"
            placeholder="Course Code (e.g. CSC301)"
            value={form.code}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="units"
            type="number"
            placeholder="Units"
            value={form.units}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="department"
            placeholder="Department (e.g. Computer Science)"
            value={form.department}
            onChange={handleChange}
            disabled={loading}
          />

          <button className="admin-create-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;