import React from "react";
import "./Login.css";

const Login = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Login;
