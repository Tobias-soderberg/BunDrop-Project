export async function removeItemFromCart(item, user) {
  if (user) {
    await fetch(`http://localhost:3001/users/${user.id}`)
      .then((response) => response.json())
      .then(async (userData) => {
        const userCart = userData.cart || {};
        if (userCart[item.category + item.id]) {
          if (userCart[item.category + item.id].quantity > 1) {
            userCart[item.category + item.id].quantity -= 1;
          } else {
            delete userCart[item.category + item.id];
          }

          await fetch(`http://localhost:3001/users/${user.id}`, {
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

export async function addItemToCart(item, user) {
  if (user) {
    await fetch(`http://localhost:3001/users/${user.id}`)
      .then((response) => response.json())
      .then(async (userData) => {
        console.log("TEST");
        const userCart = userData.cart;
        if (userCart[item.category + item.id]) {
          userCart[item.category + item.id].quantity += 1;
        } else {
          userCart[item.category + item.id] = { ...item, quantity: 1 };
        }
        console.log("TEST");
        await fetch(`http://localhost:3001/users/${user.id}`, {
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

export function clearCart(user) {
  if (user) {
    fetch(`http://localhost:3001/users/${user.id}`)
      .then((response) => response.json())
      .then((userData) => {
        fetch(`http://localhost:3001/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userData, cart: {} }),
        }).catch((error) => console.error("Error clearing user cart: ", error));
      })
      .catch((error) => {
        console.error("Error fetching user: ", error);
      });
  } else {
    localStorage.setItem("cart", JSON.stringify({}));
  }
}
