// App.js
import { useState, useEffect } from "react";
import './App.css'

function App(){
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const initialCart = {};
        data.forEach((pr) => {
          initialCart[pr.id] = 0;
        });
        setProducts(data);
        setCart(initialCart);
      })
      .catch((err) => console.error("my error" + err))
  }, []);

  const addToCart = (productId) => {
    setCart({
      ...cart,
      [productId]: cart[productId] + 1,
    });
  };

  const removeFromCart = (productId) => {
    if (cart[productId] > 0) {
      setCart({
        ...cart,
        [productId]: cart[productId] - 1,
      });
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">Use Effect Demo - Fetching</h1>
        <div className="cart">
          <span className="cart-text">Cart: {Object.values(cart).reduce((acc, curr) => acc + curr, 0)}</span>
        </div>
      </header>
      <div className="product-grid">
        {products.map((pr) => (
          <div className="product-card" key={pr.id}>
            <img className="product-image" src={pr.image} alt={pr.title} />

            <h2 className="product-title">{pr.title}</h2>
            <div className="button-group">
              <button className="action-button" onClick={() => addToCart(pr.id)}>+</button>
              <button className="action-button" onClick={() => removeFromCart(pr.id)}>-</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
