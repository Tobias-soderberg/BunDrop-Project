import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Login from "./Login";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const dropdownRef = useRef(null);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function toggleLogin() {
    setIsLoginOpen(!isLoginOpen);
  }

  //Given dropdown menu exist and I click on page that is not the menu then I will remove it.
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  }

  //Add eventlistener on load, removes when component is no longer there... Maybe I will change this later?
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <div className="menu-container" ref={dropdownRef}>
            <button className="menu-button" onClick={toggleMenu}>
              <i className="fas fa-bars fa-2x"></i>
              <span className="xlg-text">Menu</span>
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <Link to="/" className="dropdown-item">
                  <p>
                    <i className="fa-solid fa-house"></i> Home page
                  </p>
                </Link>

                <Link to="menu" className="dropdown-item">
                  <p>
                    <i className="fa-solid fa-burger"></i> Explore our menu
                  </p>
                </Link>

                <Link to="cart" className="dropdown-item">
                  <p>
                    <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
                  </p>
                </Link>

                <Link to="register" className="dropdown-item">
                  <p>
                    <i className="fa-solid fa-user"></i> Register account
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="navbar-middle">
          <Link to="/" className="menu-button">
            <img src="src\assets\img\logo color.png" className="logo" />
            <span className="xxlg-text nav-title-text">BUN DROP</span>
          </Link>
        </div>
        <div className="navbar-right">
          <button className="login-button xlg-text" onClick={toggleLogin}>
            Login
          </button>
          <Link to="register">
            <button className="register-button xlg-text">Register</button>
          </Link>
        </div>
      </div>

      {/* Opens when you click on login button */}
      <Login isOpen={isLoginOpen} onClose={toggleLogin}></Login>
    </>
  );
}

export default Navbar;
