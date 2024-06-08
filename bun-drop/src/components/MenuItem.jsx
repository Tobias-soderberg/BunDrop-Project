import React, { useState } from "react";

const MenuItem = ({
  item,
  index,
  menuItems,
  addToFavorites,
  getRandomAngle,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(storedUser ? storedUser : null);

  const isFavorite = menuItems.favorites.some(
    (favorite) => favorite.id === item.id && favorite.category === item.category
  );

  function addItemToCart(item) {
    if (user) {
      fetch(`http://localhost:3001/users/${user.id}`)
        .then((response) => response.json())
        .then((userData) => {
          const userCart = userData.cart || {};
          if (userCart[item.id]) {
            userCart[item.id].quantity += 1;
          } else {
            userCart[item.id] = { ...item, quantity: 1 };
          }
          // Update the user's cart on the server
          fetch(`http://localhost:3001/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...userData, cart: userCart }),
          }).catch((error) =>
            console.error("Error updating user cart: ", error)
          );
        })
        .catch((error) => {
          console.error("Error fetching user: ", error);
        });
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      console.log(storedCart[item.category + item.id]);
      if (storedCart[item.category + item.id]) {
        storedCart[item.category + item.id].quantity += 1;
      } else {
        storedCart[item.category + item.id] = { ...item, quantity: 1 };
      }
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }
  }

  return (
    <div className="menu-item">
      <div className="item-info">
        <h1>{item.title}</h1>
        <h2>{item.price} $ </h2>
        <p>{item.description}</p>
        <button
          className="btn btn-success btn-add-order"
          onClick={() => addItemToCart(item)}
        >
          Add to order
        </button>
      </div>
      <div className="item-image">
        <i
          className={`fav-star ${
            isFavorite ? "fa-solid fa-star" : "fa-regular fa-star"
          }`}
          onClick={() => addToFavorites(item)}
        ></i>
        <img
          src={item.image}
          alt={`Item: ${index}`}
          style={{ transform: `rotate(${getRandomAngle()}deg)` }}
        />
        <div className="image-button">
          <button className="btn btn-success">Add to order</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
