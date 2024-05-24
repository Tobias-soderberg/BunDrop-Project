import React, { useState, useEffect } from "react";
import "./Menu.css";
import { Link as LinkScroll, Element } from "react-scroll";

function Menu() {
  const [menuSearchInputValue, setMenuSearchInputValue] = useState("");
  const [menuItems, setMenuItems] = useState({
    favorites: [],
    burgers: [],
    sides: [],
    drinks: [],
    desserts: [],
  });

  useEffect(() => {
    const searchText = menuSearchInputValue.toLowerCase();

    fetch("http://localhost:3001/menu")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const { burgers, sides, desserts, drinks } = data;

          // Filter menu items based on searchText
          const filteredBurgers = burgers.filter(
            (item) =>
              item.title.toLowerCase().includes(searchText) ||
              item.category.toLowerCase().includes(searchText)
          );
          const filteredSides = sides.filter(
            (item) =>
              item.title.toLowerCase().includes(searchText) ||
              item.category.toLowerCase().includes(searchText)
          );
          const filteredDrinks = drinks.filter(
            (item) =>
              item.title.toLowerCase().includes(searchText) ||
              item.category.toLowerCase().includes(searchText)
          );
          const filteredDesserts = desserts.filter(
            (item) =>
              item.title.toLowerCase().includes(searchText) ||
              item.category.toLowerCase().includes(searchText)
          );

          const filteredFavorites = [
            ...filteredBurgers,
            ...filteredSides,
            ...filteredDrinks,
            ...filteredDesserts,
          ].filter((item) => {
            return (
              item.userFavorited.includes(window.currentUser) &&
              window.currentUser
            );
          });
          console.log(filteredFavorites);

          setMenuItems({
            favorites: filteredFavorites,
            burgers: filteredBurgers,
            sides: filteredSides,
            drinks: filteredDrinks,
            desserts: filteredDesserts,
          });
        } else {
          console.error("Invalid menu data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, [menuSearchInputValue]);

  function getRandomAngle() {
    return Math.floor(Math.random() * 20) - 10;
  }

  const handleSearchInputChange = (event) => {
    setMenuSearchInputValue(event.target.value);
  };
  return (
    <>
      <div className="under-navbar"></div>
      <div className="menu-page">
        <div className="menu-content">
          <div className="menu-navbar">
            <div className="menu-navbar-categories">
              <LinkScroll
                to="burgers"
                smooth={true}
                duration={500}
                activeClass="active-category"
                spy={true}
                offset={-140}
                className="navbar-category"
              >
                Burgers
              </LinkScroll>
              <LinkScroll
                to="sides"
                smooth={true}
                duration={500}
                activeClass="active-category"
                spy={true}
                offset={-140}
                className="navbar-category"
              >
                Sides
              </LinkScroll>
              <LinkScroll
                to="drinks"
                smooth={true}
                duration={500}
                activeClass="active-category"
                spy={true}
                offset={-140}
                className="navbar-category"
              >
                Drinks
              </LinkScroll>
              <LinkScroll
                to="desserts"
                smooth={true}
                duration={500}
                activeClass="active-category"
                spy={true}
                offset={-140}
                className="navbar-category"
              >
                Desserts
              </LinkScroll>
            </div>
            <div className="menu-navbar-search">
              <label className="xxlg-text">Search: </label>
              <input
                type="text"
                id="menu-search-input"
                value={menuSearchInputValue}
                onChange={handleSearchInputChange}
              ></input>
            </div>
          </div>
          <div className="menu">
            <div className="menu-favorites">
              <h1>Favorites</h1>
              <div className="category-box">
                {menuItems.favorites.length == 0 ? (
                  <p className="favorite-info">
                    It doesn't look like you have any favorite items yet <br />
                    Add the most tasty items on the menu below by clicking the
                    star!
                  </p>
                ) : (
                  menuItems.favorites.map((favorite, index) => (
                    <div key={index} className="menu-item">
                      <div className="item-info">
                        <h1>{favorite.title}</h1>
                        <h2>{favorite.price} $</h2>
                        <p>{favorite.description}</p>
                        <button className="btn btn-success btn-add-order">
                          Add to order
                        </button>
                      </div>
                      <div className="item-image">
                        <img
                          src={favorite.image}
                          alt={`Favorite: ${index}`}
                          style={{
                            transform: `rotate(${getRandomAngle()}deg)`,
                          }}
                        />
                        <div className="image-button">
                          <button className="btn btn-success">
                            Add to order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <Element name="burgers" className="menu-burgers">
              <h1>Burgers</h1>
              <div className="category-box">
                {menuItems.burgers.map((burger, index) => (
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
            </Element>
            <Element name="sides" className="menu-sides">
              <h1>Sides</h1>
              <div className="category-box">
                {menuItems.sides.map((side, index) => (
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
            </Element>
            <Element name="drinks" className="menu-drinks">
              <h1>Drinks</h1>
              <div className="category-box">
                {menuItems.drinks.map((drink, index) => (
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
            </Element>
            <Element name="desserts" className="menu-desserts">
              <h1>Desserts</h1>
              <div className="category-box">
                {menuItems.desserts.map((dessert, index) => (
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
            </Element>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
