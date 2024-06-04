import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log("User logged in: ", user.id);
        handleClose();
        handleRefresh();
      } else {
        console.error("Invalid username or password");
        localStorage.setItem("currentUser", JSON.stringify(null));
        navigate("/register");
        if (location.pathname === "/register") {
          handleRefresh();
        }
        handleClose();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    onClose();
    setUsername("");
    setPassword("");
  };

  const handleRefresh = () => {
    navigate(location.pathname, { replace: true });
  };

  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={handleClose}>
      <div className="login-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-close" onClick={handleClose}>
          X
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <span> </span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <span> </span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
