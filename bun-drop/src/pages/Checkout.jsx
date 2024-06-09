import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import "./Checkout.css";
import { clearCart } from "../components/CartManager";

function Checkout() {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [cart, setCart] = useState({});

  const { price } = useParams();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [nameError, setNameError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [streetNumberError, setStreetNumberError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [cvvError, setCvvError] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState("error");

  const navigate = useNavigate();

  useEffect(() => {
    setUser(() => {
      if (user) {
        fetch(`http://localhost:3001/users/${user.id}`)
          .then((response) => response.json())
          .then((userData) => {
            setCart(Object.values(userData.cart || {}));
          })
          .catch((error) => {
            console.error("Error fetching user: ", error);
          });
      }
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit handling");
    var order = {
      name,
      address: {
        city,
        street,
        streetNumber,
        postalCode,
      },
      paymentMethod,
    };
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      order = {
        ...order,
        cart: cart,
      };
    } else {
      order = { ...order, cart: JSON.parse(localStorage.getItem("cart")) };
    }

    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      clearCart(JSON.parse(localStorage.getItem("currentUser")));

      setMessageText("Order placed successfully!");
      setMessageType("success");
      setShowMessage(true);
    } catch (error) {
      setMessageText(error + ". Please try again...");
      setMessageType("error");
      setShowMessage(true);
    }
  };

  const handleConfirm = () => {
    setShowMessage(false);

    if (messageType == "success") {
      navigate("/");
    }
  };

  return (
    <>
      <div className="under-navbar"></div>
      <div className="checkout-page">
        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <table className="checkout-table">
              <tbody>
                <tr>
                  <td className="label text-end">Name:</td>
                  <td>
                    <div className="input-container ">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setNameError(!e.target.validity.valid);
                        }}
                        pattern="[A-Za-zåäöÅÄÖ]{2,}(?:\s[A-Za-zåäöÅÄÖ]{2,})*"
                        title="Name must be at least 2 letters"
                        required
                        className={nameError ? "error" : ""}
                      />
                      {nameError && (
                        <p className="error-message">
                          Name must be at least 2 letters
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="label text-end">City:</td>
                  <td>
                    <div className="input-container">
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setCityError(!e.target.validity.valid);
                        }}
                        pattern="[A-Za-zåäöÅÄÖ]{2,}(?:\s[A-Za-zåäöÅÄÖ]{2,})*"
                        title="City must be at least 2 letters"
                        required
                        className={cityError ? "error" : ""}
                      />
                      {cityError && (
                        <p className="error-message">
                          City must be at least 2 letters
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="label text-end">Street:</td>
                  <td>
                    <div className="input-container">
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => {
                          setStreet(e.target.value);
                          setStreetError(!e.target.validity.valid);
                        }}
                        pattern="[A-Za-zåäöÅÄÖ]{2,}(?:\s[A-Za-zåäöÅÄÖ]{2,})*"
                        title="Street must be at least 2 letters"
                        required
                        className={streetError ? "error" : ""}
                      />
                      {streetError && (
                        <p className="error-message">
                          Street must be at least 2 letters
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="label text-end">Street Number:</td>
                  <td>
                    <div className="input-container">
                      <input
                        type="text"
                        value={streetNumber}
                        onChange={(e) => {
                          setStreetNumber(e.target.value);
                          setStreetNumberError(!e.target.validity.valid);
                        }}
                        pattern="[0-9]+[A-Za-z]?"
                        title="Street number must be a number (can be followed by a single letter)"
                        required
                        className={streetNumberError ? "error" : ""}
                      />
                      {streetNumberError && (
                        <p className="error-message">
                          Invalid street number format
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="label text-end">Postal Code:</td>
                  <td>
                    <div className="input-container">
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                          setPostalCodeError(!e.target.validity.valid);
                        }}
                        pattern="[0-9]{3}(?:\s?[0-9]{2})?"
                        title="Postal code must be 5 numbers"
                        required
                        className={postalCodeError ? "error" : ""}
                      />
                      {postalCodeError && (
                        <p className="error-message">
                          Postal code must be 5 numbers
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="label text-end">Payment Method:</td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      Card
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        value="swish"
                        checked={paymentMethod === "swish"}
                        onChange={() => setPaymentMethod("swish")}
                      />
                      Swish
                    </label>
                  </td>
                </tr>
                {paymentMethod === "card" && (
                  <>
                    <tr>
                      <td className="label text-end">Card Number:</td>
                      <td>
                        <div className="input-container">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => {
                              setCardNumber(e.target.value);
                              setCardNumberError(!e.target.validity.valid);
                            }}
                            pattern="[0-9]{4}\s?-?[0-9]{4}\s?-?[0-9]{4}\s?-?[0-9]{4}"
                            title="Card number must have exactly 16 numbers"
                            required
                            className={cardNumberError ? "error" : ""}
                          />
                          {cardNumberError && (
                            <p className="error-message">
                              Invalid card number format <br />{" "}
                              xxxx-xxxx-xxxx-xxxx
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="label text-end">Expiry Date:</td>
                      <td>
                        <select
                          value={expiryMonth}
                          onChange={(e) => setExpiryMonth(e.target.value)}
                          required
                        >
                          <option value="">-- Month --</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <option
                                key={month}
                                value={month < 10 ? `0${month}` : `${month}`}
                              >
                                {month < 10 ? `0${month}` : `${month}`}
                              </option>
                            )
                          )}
                        </select>
                        <select
                          value={expiryYear}
                          onChange={(e) => setExpiryYear(e.target.value)}
                          required
                        >
                          <option value="">-- Year --</option>
                          {Array.from(
                            { length: 16 },
                            (_, i) => new Date().getFullYear() + i
                          ).map((year) => (
                            <option
                              key={year}
                              value={year.toString().slice(-2)}
                            >
                              {year.toString().slice(-2)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td className="label text-end">CVV:</td>
                      <td>
                        <div className="input-container">
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => {
                              setCvv(e.target.value);
                              setCvvError(!e.target.validity.valid);
                            }}
                            pattern="[0-9]{3}"
                            title="CVV must be 3 numbers"
                            required
                            className={cvvError ? "error" : ""}
                          />
                          {cvvError && (
                            <p className="error-message">
                              CVV must be 3 numbers
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                )}
                {paymentMethod === "swish" && (
                  <tr>
                    <td className="label text-end">Phone Number:</td>
                    <td>
                      <div className="input-container">
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            setPhoneNumberError(!e.target.validity.valid);
                          }}
                          pattern="[0-9]{10}"
                          title="Phone number must be exactly 10 numbers"
                          required
                          className={phoneNumberError ? "error" : ""}
                        />
                        {phoneNumberError && (
                          <p className="error-message">
                            Invalid phone number format
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td id="pay-btn" colSpan="2">
                    <button className="btn btn-warning mt-5 " type="submit">
                      Pay {price} $
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
      {showMessage && (
        <div className="message">
          <div className="message-content">
            <p>{messageText}</p>
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
