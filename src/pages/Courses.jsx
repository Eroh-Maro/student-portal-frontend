import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Courses.css";

const API = "http://172.20.10.4:5000";

const Courses = () => {
  const { token } = useAuth();

  const [availableCourses, setAvailableCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [search, setSearch] = useState(""); // 🔹 search state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Load courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [catalogRes, myRes] = await Promise.all([
          fetch(`${API}/courses`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/courses/my/list`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const catalogData = await catalogRes.json();
        const myData = await myRes.json();

        if (!catalogRes.ok || !myRes.ok) {
          throw new Error("Failed to load courses");
        }

        setAvailableCourses(catalogData);
        setRegisteredCourses(myData.map((c) => c._id));
      } catch {
        setError("Could not load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  // 🔹 Toggle register/remove
  const toggleCourse = async (courseId) => {
    try {
      const isRegistered = registeredCourses.includes(courseId);

      const res = await fetch(`${API}/courses/${courseId}`, {
        method: isRegistered ? "DELETE" : "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setRegisteredCourses(data.map((c) => c._id));
    } catch {
      setError("Action failed. Try again.");
    }
  };

  // 🔹 Filtered courses based on search
  const filteredCourses = availableCourses.filter((course) =>
    `${course.code} ${course.title}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="courses-page">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* HEADER */}
      <section className="courses-header">
        <h1>Course Registration</h1>
        <p>Select and manage your registered courses</p>
      </section>

      {error && <p className="auth-error">{error}</p>}

      {/* SEARCH */}
      <div className="course-search">
        <div className="course-search-box">
          <span className="course-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search courses by code or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* COURSE LIST */}
      <section className="courses-list">
        {filteredCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          filteredCourses.map((course) => {
            const isRegistered = registeredCourses.includes(course._id);

            return (
              <div
                key={course._id}
                className={`course-card ${isRegistered ? "registered" : ""}`}
              >
                <div>
                  <h3>{course.code}</h3>
                  <p>
                    {isRegistered
                      ? "Registered for this course"
                      : "Not registered"}
                  </p>
                </div>

                <button
                  onClick={() => toggleCourse(course._id)}
                  className={isRegistered ? "remove" : "add"}
                >
                  {isRegistered ? "Remove" : "Register"}
                </button>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Courses;
