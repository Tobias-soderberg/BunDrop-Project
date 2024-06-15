import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ConfirmPayment.css";
import { clearCart } from "../components/CartManager";

function ConfirmPayment() {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { price } = useParams();

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
      setCart(JSON.parse(localStorage.getItem("cart")) || {});
    }
  }, [user]);

  const handleConfirm = () => {
    clearCart(JSON.parse(localStorage.getItem("currentUser")));
    navigate("/");
  };

  const getRandomDeliveryTime = () => {
    return Math.floor(Math.random() * 41) + 20;
  };

  return (
    <>
      <div className="confirmpage-under-navbar"></div>
      <div className="order-confirmation-page">
        <div className="order-confirmation-content">
          {
            <>
              <h5>Order confirmed and on the way to you!</h5>
              <br />
              <ul className="confirmation-cart-list">
                {Object.entries(cart).map(([key, item]) => (
                  <li key={key}>
                    {item.title} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <p>Total Price: ${price}</p>
              <p>Estimated Delivery Time: {getRandomDeliveryTime()} minutes</p>
            </>
          }
          <button
            className="btn-confirm btn btn-primary"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmPayment;
