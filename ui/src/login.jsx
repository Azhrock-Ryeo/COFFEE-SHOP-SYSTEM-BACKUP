import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo1 from "./assets/logo1.png";

function Login({ setUser }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      setMessage(data.message);

      // LOGIN SUCCESS
      if (data.message === "Login success") {
        // SAVE USER
        localStorage.setItem("user", JSON.stringify(data.user));

        // UPDATE APP STATE
        setUser(data.user);

        // GO TO HOME
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="page">
      {/* DARK OVERLAY */}
      <div className="shader"></div>

      {/* CENTER CONTENT */}
      <div className="logointromod">
        {/* LOGO */}
        <img className="logointro" src={logo1} alt="logo" />

        {/* LOGIN BOX */}
        <div className="register-box">
          <h2 className="register-title">Login</h2>

          {/* MESSAGE */}
          {message && <div className="msg">{message}</div>}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <input type="submit" value="Login" />
          </form>

          {/* REGISTER LINK */}
          <Link to="/register">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;