import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Admin.css";

const API = "http://172.20.10.4:5000";

const AdminDashboard = () => {
  const { token } = useAuth();

  const [stats, setStats] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // LOAD STATS
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch(`${API}/courses/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error();

        setStats(data);
        setFiltered(data);
      } catch {
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [token]);

  // SEARCH FILTER
  useEffect(() => {
    const q = search.toLowerCase();

    setFiltered(
      stats.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q)
      )
    );
  }, [search, stats]);

  // DELETE COURSE
  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;

    try {
      const res = await fetch(`${API}/courses/admin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      // remove from UI instantly
      const updated = stats.filter((c) => c._id !== id);
      setStats(updated);
      setFiltered(updated);
    } catch {
      alert("Failed to delete course");
    }
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <section className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage courses and view student registrations</p>
      </section>

      {error && <p className="auth-error">{error}</p>}
      {loading && <p>Loading statistics...</p>}

      {!loading && !error && (
        <>
          {/* SEARCH BAR */}
          <div className="admin-search">
            <div className="admin-search-box">
              <span className="admin-search-icon">🔍</span>
              <input
                placeholder="Search courses by code or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* COURSE LIST */}
          <section className="admin-courses">
            {filtered.map((course) => (
              <div key={course._id} className="admin-course-card">
                <div className="admin-course-info">
                  <h3>
                    {course.code} — {course.title}
                  </h3>
                  <p>Students registered</p>
                </div>

                <div className="admin-right">
                  <span className="admin-count">
                    {course.studentCount}
                  </span>

                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;