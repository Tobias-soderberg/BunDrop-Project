import React, { useEffect, useState } from "react";
import "./Cart.css";
import { addItemToCart, removeItemFromCart } from "../components/CartManager";

function Cart() {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    updateCart();
  }, [user]);

  function updateCart() {
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
  }

  function calculateTotalPrice() {
    if (user) {
      fetch(`http://localhost:3001/users/${user.id}`)
        .then((response) => response.json())
        .then((userData) => {
          var totalCost = 0;
          for (var item in Object.values(userData.cart)) {
            totalCost += item.quantity * item.price;
          }
          return totalCost.toFixed(2);
        })
        .catch((error) => {
          console.error("Error fetching user: ", error);
        });
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      var totalCost = 0;
      for (var item in storedCart) {
        totalCost += storedCart[item].quantity * storedCart[item].price;
      }
      return totalCost.toFixed(2);
    }
  }
  const handleAddToCart = (item) => {
    addItemToCart(item, user);
    updateCart();
  };
  const handleRemoveFromCart = (item) => {
    removeItemFromCart(item, user);
    updateCart();
  };

  return (
    <>
      <div className="under-navbar"></div>
      <div className="cart-page">
        <div className="cart-content">
          <table className="cart-items">
            <thead>
              <tr className="table-header">
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <p>{item.title}</p>
                  </td>
                  <td>
                    <div className="quantity-box">
                      <p>Quantity: {item.quantity}</p>
                      <button onClick={() => handleRemoveFromCart(item)}>
                        -
                      </button>{" "}
                      <button onClick={() => handleAddToCart(item)}>+</button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>Price: {(item.price * item.quantity).toFixed(2)} $</p>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <strong>Total Price:</strong>
                </td>
                <td>
                  <strong>{calculateTotalPrice()} $</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Cart;
