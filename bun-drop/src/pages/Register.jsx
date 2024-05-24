import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Register.css";

function Register() {
  const [registration, setRegistration] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;
    if (registration) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      const user = { username, password };

      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          const newUser = await response.json();
          console.log("User created:", newUser);
          window.currentUser = newUser.id;
          navigate("/");
        } else {
          console.error("Failed to log in");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/users");
        const users = await response.json();

        const user = users.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          window.currentUser = user.id;
          console.log("User logged in: ", user.id);
          navigate("/");
        } else {
          console.error("Invalid username or password");
          window.currentUser = -1;
          navigate("/register");
          if (location.pathname === "/register") {
            navigate(location.pathname, { replace: true });
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (window.currentUser === -1) {
      return () => {
        window.currentUser = undefined;
      };
    }
  }, []);

  return (
    <>
      <div className="under-navbar"></div>
      <div className="registration-page">
        <div className="form-content z-index-increase">
          {window.currentUser === -1 && (
            <p className="warning-text">Login failed, please try again!</p>
          )}
          <form onSubmit={handleSubmit}>
            {registration ? <h2>Registration</h2> : <h2>Login</h2>}
            <div className="registration-input-field">
              <label className="registration-label">Username:</label>
              <input
                className="registration-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="registration-input-field">
              <label className="registration-label">Password:</label>
              <input
                className="registration-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {registration && (
              <div className="registration-input-field">
                <label className="registration-label">Confirm Password:</label>
                <input
                  className="registration-input"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <button className="registration-submit-button" type="submit">
              {registration ? "Register" : "Login"}
            </button>
          </form>
          <button
            className="registration-toggle-button"
            onClick={() => setRegistration(!registration)}
          >
            {registration
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
