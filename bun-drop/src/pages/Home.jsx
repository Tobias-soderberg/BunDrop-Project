import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import logoColor from "../assets/img/logo color.png";

function Home() {
  const [popularMenuItems, setMenuItems] = useState({
    burgers: [],
    sides: [],
    desserts: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const { burgers, sides, desserts, drinks } = data;
          setMenuItems({
            burgers: burgers.slice(0, 3),
            sides: sides.slice(0, 1),
            desserts: desserts.slice(0, 1),
          });
        } else {
          console.error("Invalid menu data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  return (
    <>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>
      <div className="circle circle5"></div>
      <div className="flex-container">
        <div className="left-container">
          <div className="top-content">
            <img src={logoColor} className="top-image" alt="Logo" />
          </div>
          <div className="bottom-content">
            <h1>The future of burgers</h1>
            <h3>No more waiting, we just drop it like it's hot</h3>
            <Link to="/menu" className="z-index-increase">
              <button className="btn btn-primary btn-start-order">
                Start your order
              </button>
            </Link>
          </div>
        </div>
        <div className="right-container">
          <div className="carousel-wrapper">
            <Carousel>
              {popularMenuItems.burgers.map((menuItem, index) => (
                <Carousel.Item key={index} className="carousel-item">
                  <img
                    className="carousel-image"
                    src={menuItem.image}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
              {popularMenuItems.sides.map((menuItem, index) => (
                <Carousel.Item key={index} className="carousel-item">
                  <img
                    className="carousel-image"
                    src={menuItem.image}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
              {popularMenuItems.desserts.map((menuItem, index) => (
                <Carousel.Item key={index} className="carousel-item">
                  <img
                    className="carousel-image"
                    src={menuItem.image}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
