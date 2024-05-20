import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card.jsx";
import Cart from "./Components/Cart/Cart.jsx";
const { getData } = require("./db/db");
const foods = getData();


const tele = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    tele.ready();
  });

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = (data) => {
    fetch('/increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => console.log(res.json())).catch((err) => console.log(err));
    tele.MainButton.text = "Pay :))";
    tele.MainButton.show();
  };

  // const clickCount = () => {
  //   fetch('/increment', { method: 'POST' });
  // }

  return (
    <>
      <h1 className="heading">Order Food</h1>
      {/* <button onClick={() => { clickCount() }}>Count</button> */}
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>
    </>
  );
}

export default App;
