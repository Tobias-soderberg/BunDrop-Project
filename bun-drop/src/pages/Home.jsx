import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import burger1 from "../assets/img/burger-1.png";
import burger7 from "../assets/img/burger-7.png";
import burger5 from "../assets/img/burger-5.png";
import fries1 from "../assets/img/fries-1.png";
import milkshake1 from "../assets/img/milkshake-1.png";
import logoColor from "../assets/img/logo color.png";

function Home() {
  const images = [burger1, burger7, burger5, fries1, milkshake1];

  return (
    <div className="flex-container">
      <div className="left-container">
        <div className="top-content">
          <img src={logoColor} className="top-image" alt="Logo" />
        </div>
        <div className="bottom-content">
          <p>Your text goes here.</p>
        </div>
      </div>
      <div className="right-container">
        <Carousel>
          {images.map((image, index) => (
            <Carousel.Item key={index} className="carousel-item">
              <img
                className="d-block w-100 carousel-image"
                src={image}
                alt={`Slide ${index}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
