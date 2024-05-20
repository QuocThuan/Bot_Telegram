import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
const { getData } = require("./db/db");
const foods = getData();
const express = require('express');
const app = express();


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

  const onCheckout = () => {
    // fetch('/increment', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then((res) => console.log(res.json()));
    // tele.MainButton.text = "Pay :)";
    // tele.MainButton.show();
    app.post('/increment', (req, res) => {

      let data = ''

      req.on('data', chunk => {
        data += chunk.toString();
      })

      req.on('end', () => {
        console.log('Received data:', data);

        bot.telegram.sendMessage('7003593765', `Total price: ${data} $`);

        // Phản hồi về cho trang web
        res.status(200).send('Data received');
      })
    });
    app.use(bodyParser.json());

    bot.launch();
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
