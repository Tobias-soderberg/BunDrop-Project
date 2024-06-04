import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import ConfirmPayment from "./pages/ConfirmPayment";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function App() {
  //localStorage.setItem("favorites", []);
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", JSON.stringify([]));
  }

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
        <div className="circle circle5"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirm" element={<ConfirmPayment />} />
          <Route path="/home" element={<Home />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer></footer>
      </Router>
    </>
  );
}

export default App;
