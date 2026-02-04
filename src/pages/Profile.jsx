import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

const API = "https://eroh-maro-student-portal-backend.vercel.app";

const Profile = () => {
  const { user, token } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load registered courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/courses/my/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setCourses(data);
      } catch {
        console.log("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCourses();
  }, [token]);

  // 🔹 Remove course
  const removeCourse = async (courseId) => {
    try {
      const res = await fetch(`${API}/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCourses(data);
    } catch {
      console.log("Failed to remove course");
    }
  };

  return (
    <div className="profile-page">
      {/* PROFILE CARD */}
      <section className="profile-card">
        <h1>Student Profile</h1>

        <div className="profile-info">
          <div>
            <span>Full Name</span>
            <p>{user?.name}</p>
          </div>

          <div>
            <span>Matric Number</span>
            <p>{user?.matric}</p>
          </div>

          <div>
            <span>Email</span>
            <p>{user?.email}</p>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="courses-card">
        <h2>Registered Courses</h2>

        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No registered courses yet.</p>
        ) : (
          <ul className="course-list">
            {courses.map((course) => (
              <li key={course._id}>
                <span>
                  {course.code} — {course.title}
                </span>
                <button onClick={() => removeCourse(course._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Profile;