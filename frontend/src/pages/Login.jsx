import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ onLoginSuccess }) {
  const [role, setRole] = useState("faculty");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const chooseRole = (selectedRole) => {
    setRole(selectedRole);

    if (selectedRole === "faculty") {
      setEmail("admin@gmail.com");
      setPassword("123456");
    } else {
      setEmail("student@gmail.com");
      setPassword("123456");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await loginUser(email, password);

      if (data.success) {
        onLoginSuccess(data.user, data.token);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand-badge">D</div>
        <h1 className="login-title">DHAANISH AHMED INSTITUTE OF TECHNOLOGY</h1>
        <p className="login-subtitle">
          Placement Portal Management System with faculty admin and student access.
        </p>

        <div className="feature-row">
          <div className="feature-pill">Students</div>
          <div className="feature-pill">Companies</div>
          <div className="feature-pill">Drives</div>
          <div className="feature-pill">Reports</div>
          <div className="feature-pill">Analytics</div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Sign In</h2>
          <p>Login to access the placement portal</p>

          <div className="role-box">
            <button
              className={`role-btn ${role === "faculty" ? "active" : ""}`}
              onClick={() => chooseRole("faculty")}
              type="button"
            >
              Faculty
            </button>
            <button
              className={`role-btn ${role === "student" ? "active" : ""}`}
              onClick={() => chooseRole("student")}
              type="button"
            >
              Student
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && <div className="login-msg">{message}</div>}

          <div className="demo-box">
            <div><strong>Faculty:</strong> admin@gmail.com / 123456</div>
            <div><strong>Student:</strong> student@gmail.com / 123456</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;