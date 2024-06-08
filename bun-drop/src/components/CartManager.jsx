export function removeItemFromCart(item, user) {
  if (user) {
    fetch(`http://localhost:3001/users/${user.id}`)
      .then((response) => response.json())
      .then((userData) => {
        const userCart = userData.cart || {};
        if (userCart[item.id]) {
          if (userCart[item.id].quantity > 1) {
            userCart[item.id].quantity -= 1;
          } else {
            delete userCart[item.id];
          }

          fetch(`http://localhost:3001/users/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...userData, cart: userCart }),
          }).catch((error) =>
            console.error("Error updating user cart: ", error)
          );
          return userCart;
        }
      })
      .catch((error) => {
        console.error("Error fetching user: ", error);
      });
  } else {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    if (storedCart[item.category + item.id]) {
      if (storedCart[item.category + item.id].quantity > 1) {
        storedCart[item.category + item.id].quantity -= 1;
      } else {
        delete storedCart[item.category + item.id];
      }
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }
    return storedCart;
  }
}

export function addItemToCart(item, user) {
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
        fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userData, cart: userCart }),
        }).catch((error) => console.error("Error updating user cart: ", error));
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
