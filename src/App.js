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



  const webapp = window.Telegram.WebApp;
  webapp.expand()
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');

  const onCheckout = (data) => {

    const dataToSend = {
      username,
      data,
    };
    fetch('https://7196-2001-ee0-4f95-a910-74c2-a4aa-f324-e9cb.ngrok-free.app/telegram-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));


    // tele.MainButton.text = "Pay :))";
    // tele.MainButton.show();

  };




  return (
    <>
      <h1 className="heading">Order Food</h1>
      <h2 className="heading">Welcome, {username} </h2>
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
