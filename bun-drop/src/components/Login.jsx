import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        //Global variable
        window.currentUser = user.id;
        console.log("User logged in: ", user.id);
        handleClose();
        navigate("/");
      } else {
        console.error("Invalid username or password");
        navigate("/registration");
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
