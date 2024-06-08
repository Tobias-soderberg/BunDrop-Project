import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/users/${user.id}`)
        .then((response) => response.json())
        .then((userData) => {
          setCart(Object.values(userData.cart || {}));
        })
        .catch((error) => {
          console.error("Error fetching user: ", error);
        });
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      setCart(Object.values(storedCart ? storedCart : {}));
    }
  }, [user]);

  return (
    <>
      <div className="under-navbar"></div>
      <div className="cart-page">
        <div className="cart-content">
          {cart.map(
            (item, index) =>
              item && (
                <div key={index}>
                  <p>{item.title}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.price}</p>
                </div>
              )
          )}
          <p>Get all the items from the cart and display them.</p>
        </div>
      </div>
    </>
  );
}

export default Cart;
