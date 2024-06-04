import React from "react";

const MenuItem = ({
  item,
  index,
  menuItems,
  addToFavorites,
  getRandomAngle,
}) => {
  const isFavorite = menuItems.favorites.some(
    (favorite) => favorite.id === item.id && favorite.category === item.category
  );

  return (
    <div className="menu-item">
      <div className="item-info">
        <h1>{item.title}</h1>
        <h2>{item.price} $ </h2>
        <p>{item.description}</p>
        <button className="btn btn-success btn-add-order">Add to order</button>
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
