import { useAuth } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <h1>Welcome back, {user?.name}</h1>
        <p className="home-matric">{user?.matricNumber}</p>
      </section>

      {/* QUICK ACTIONS */}
      <section className="home-actions">
        <div className="action-card">
          <h3>📚 Courses</h3>
          <p>Register, add or remove your courses for this session.</p>
        </div>

        <div className="action-card">
          <h3>👤 Profile</h3>
          <p>View your personal details and academic records.</p>
        </div>

        <div className="action-card">
          <h3>📝 Registration</h3>
          <p>Manage your course registration and updates.</p>
        </div>
      </section>

      {/* INFO */}
      <section className="home-info">
        <h2>About the Student Portal</h2>
        <p>
          This portal helps students manage academic activities such as course
          registration, profile updates, and access to essential student data —
          all in one place.
        </p>
      </section>
    </div>
  );
};

export default Home;