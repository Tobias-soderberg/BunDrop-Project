import React, { useState, useEffect } from "react";
import "./Menu.css";
import { useLocation } from "react-router-dom";
import { Link as LinkScroll, Element } from "react-scroll";
import MenuItem from "../components/MenuItem";

function Menu() {
  const [menuSearchInputValue, setMenuSearchInputValue] = useState("");
  const [menuItems, setMenuItems] = useState({
    favorites: [],
    burgers: [],
    sides: [],
    drinks: [],
    desserts: [],
  });

  const location = useLocation();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== null) {
      fetch(`http://localhost:3001/users/${currentUser.id}`)
        .then((response) => response.json())
        .then((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          setUser(user);
          setMenuItems((prevMenuItems) => ({
            ...prevMenuItems,
            favorites: user.favoriteItems,
          }));
        })
        .catch((error) => {
          console.error("Error fetching user: ", error);
        });
    } else {
      setUser(null);
      const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
      if (savedFavorites) {
        setMenuItems((prevMenuItems) => ({
          ...prevMenuItems,
          favorites: savedFavorites,
        }));
      }
    }
  }, []);

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
            if (user == null) {
              var temp = JSON.parse(localStorage.getItem("favorites"));
              for (const favoriteItem of temp) {
                if (
                  favoriteItem.id == item.id &&
                  favoriteItem.category == item.category
                ) {
                  return true;
                }
              }
              return false;
            } else {
              const currentUser = user;
              for (const favoriteItem of currentUser.favoriteItems) {
                if (
                  favoriteItem.id == item.id &&
                  favoriteItem.category == item.category
                ) {
                  return true;
                }
              }
              return false;
            }
          });
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

  function addToFavorites(itemClicked) {
    if (user) {
      const isFavorite = user.favoriteItems.includes(itemClicked);
      const newFavorites = isFavorite
        ? user.favoriteItems.filter((item) => item !== itemClicked)
        : [...user.favoriteItems, itemClicked];

      user.favoriteItems = newFavorites;
      fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update favorites in the database");
          }
          setMenuItems((prevState) => ({
            ...prevState,
            favorites: newFavorites,
          }));
        })
        .catch((error) => {
          console.error("Error updating favorites in the database:", error);
        });
    } else {
      const favoriteCookies = JSON.parse(localStorage.getItem("favorites"));
      const isFavorite = () => {
        for (const favoriteItem of favoriteCookies) {
          if (
            favoriteItem.id == itemClicked.id &&
            favoriteItem.category == itemClicked.category
          ) {
            return true;
          }
        }
        return false;
      };

      const newFavorites = isFavorite()
        ? favoriteCookies.filter(
            (item) =>
              !(
                item.id == itemClicked.id &&
                item.category == itemClicked.category
              )
          )
        : [...favoriteCookies, itemClicked];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      // Update local state
      setMenuItems((prevState) => ({
        ...prevState,
        favorites: newFavorites,
      }));
    }
  }

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
                {menuItems.favorites !== undefined &&
                menuItems.favorites.length > 0 ? (
                  menuItems.favorites.map((favorite, index) => (
                    <MenuItem
                      key={index}
                      item={favorite}
                      index={index}
                      menuItems={menuItems}
                      addToFavorites={addToFavorites}
                      getRandomAngle={getRandomAngle}
                    />
                  ))
                ) : (
                  <p className="favorite-info">
                    It doesn't look like you have any favorite items yet <br />
                    Add the most tasty items on the menu below by clicking the
                    star!
                  </p>
                )}
              </div>
            </div>
            <Element name="burgers" className="menu-burgers">
              <h1>Burgers</h1>
              <div className="category-box">
                {menuItems.burgers.map((burger, index) => (
                  <MenuItem
                    key={index}
                    item={burger}
                    index={index}
                    menuItems={menuItems}
                    addToFavorites={addToFavorites}
                    getRandomAngle={getRandomAngle}
                  />
                ))}
              </div>
            </Element>
            <Element name="sides" className="menu-sides">
              <h1>Sides</h1>
              <div className="category-box">
                {menuItems.sides.map((side, index) => (
                  <MenuItem
                    key={index}
                    item={side}
                    index={index}
                    menuItems={menuItems}
                    addToFavorites={addToFavorites}
                    getRandomAngle={getRandomAngle}
                  />
                ))}
              </div>
            </Element>
            <Element name="drinks" className="menu-drinks">
              <h1>Drinks</h1>
              <div className="category-box">
                {menuItems.drinks.map((drink, index) => (
                  <MenuItem
                    key={index}
                    item={drink}
                    index={index}
                    menuItems={menuItems}
                    addToFavorites={addToFavorites}
                    getRandomAngle={getRandomAngle}
                  />
                ))}
              </div>
            </Element>
            <Element name="desserts" className="menu-desserts">
              <h1>Desserts</h1>
              <div className="category-box">
                {menuItems.desserts.map((dessert, index) => (
                  <MenuItem
                    key={index}
                    item={dessert}
                    index={index}
                    menuItems={menuItems}
                    addToFavorites={addToFavorites}
                    getRandomAngle={getRandomAngle}
                  />
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
