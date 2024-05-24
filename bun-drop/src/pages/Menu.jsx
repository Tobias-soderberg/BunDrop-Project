import React, { useState, useEffect } from "react";
import "./Menu.css";
function Menu() {
  const [popularMenuItems, setMenuItems] = useState({
    burgers: [],
    sides: [],
    drinks: [],
    desserts: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/menu")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const { burgers, sides, desserts, drinks } = data;
          setMenuItems({
            burgers: burgers,
            sides: sides,
            drinks: drinks,
            desserts: desserts,
          });
        } else {
          console.error("Invalid menu data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  function getRandomAngle() {
    return Math.floor(Math.random() * 20) - 10;
  }

  return (
    <>
      <div className="under-navbar"></div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>
      <div className="circle circle5"></div>
      <div className="menu-page">
        <div className="menu-content">
          <div className="menu-navbar">
            <div className="menu-navbar-categories">
              <p className="navbar-category">Burgers</p>
              <p className="navbar-category">Sides</p>
              <p className="navbar-category">Drinks</p>
              <p className="navbar-category">Desserts</p>
            </div>
            <div className="menu-navbar-search">
              <label className="xxlg-text">Search: </label>
              <input type="text" id="menu-search-input"></input>
            </div>
          </div>
          <div className="menu">
            <div className="menu-favorites">
              <h1>Favorites</h1>
              <div className="category-box">
                {/* {popularMenuItems.favorites.map((fav, index) => (
                  <img
                    key={index}
                    src={fav.image}
                    alt={`Favorite item: ${index}`}
                  />
                ))} */}
              </div>
            </div>
            <div className="menu-burgers">
              <h1>Burgers</h1>
              <div className="category-box">
                {popularMenuItems.burgers.map((burger, index) => (
                  <div key={index} className="menu-item">
                    <div className="item-info">
                      <h1>{burger.title}</h1>
                      <h2>{burger.price} $ </h2>
                      <p>{burger.description}</p>
                      <button className="btn btn-success btn-add-order">
                        Add to order
                      </button>
                    </div>
                    <div className="item-image">
                      <img
                        src={burger.image}
                        alt={`Burger: ${index}`}
                        style={{ transform: `rotate(${getRandomAngle()}deg)` }}
                      />
                      <div className="image-button">
                        <button className="btn btn-success">
                          Add to order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="menu-sides">
              <h1>Sides</h1>
              <div className="category-box">
                {popularMenuItems.sides.map((side, index) => (
                  <div key={index} className="menu-item">
                    <div className="item-info">
                      <h1>{side.title}</h1>
                      <h2>{side.price} $ </h2>
                      <p>{side.description}</p>
                      <button className="btn btn-success btn-add-order">
                        Add to order
                      </button>
                    </div>
                    <div className="item-image">
                      <img
                        src={side.image}
                        alt={`Side: ${index}`}
                        style={{ transform: `rotate(${getRandomAngle()}deg)` }}
                      />
                      <div className="image-button">
                        <button className="btn btn-success">
                          Add to order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="menu-drinks">
              <h1>Drinks</h1>
              <div className="category-box">
                {popularMenuItems.drinks.map((drink, index) => (
                  <div key={index} className="menu-item">
                    <div className="item-info">
                      <h1>{drink.title}</h1>
                      <h2>{drink.price} $ </h2>
                      <p>{drink.description}</p>
                      <button className="btn btn-success btn-add-order">
                        Add to order
                      </button>
                    </div>
                    <div className="item-image">
                      <img
                        src={drink.image}
                        alt={`drink: ${index}`}
                        style={{ transform: `rotate(${getRandomAngle()}deg)` }}
                      />
                      <div className="image-button">
                        <button className="btn btn-success">
                          Add to order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="menu-desserts">
              <h1>Desserts</h1>
              <div className="category-box">
                {popularMenuItems.desserts.map((dessert, index) => (
                  <div key={index} className="menu-item">
                    <div className="item-info">
                      <h1>{dessert.title}</h1>
                      <h2>{dessert.price} $ </h2>
                      <p>{dessert.description}</p>
                      <button className="btn btn-success btn-add-order">
                        Add to order
                      </button>
                    </div>
                    <div className="item-image">
                      <img
                        src={dessert.image}
                        alt={`Dessert: ${index}`}
                        style={{ transform: `rotate(${getRandomAngle()}deg)` }}
                      />
                      <div className="image-button">
                        <button className="btn btn-success">
                          Add to order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
