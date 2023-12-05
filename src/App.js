import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import ApiRequest from './components/ApiRequest';
// import ProductList from './components/ProductList'
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Cart from "./components/Cart";

import "./App.scss";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    let obj = {
      ...product,
      count: 1,
      discountPrice: parseFloat(
        product.price - (product.discountPercentage / 100) * product.price
      ),
    };

    if (!cart.some((item) => item.id === obj.id)) {
      setCart([...cart, obj]);
      console.log(obj);
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === obj.id) {
          cart[i].count += 1;
          break;
        }
      }
    }
  };
  const removeFromCart = (productId) => {
    console.log("remove", productId);
    let newArr = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id !== productId) {
        newArr.push(cart[i]);
      } else {
        continue;
      }
    }
    setCart(newArr);
  };

  return (
    <main>
      <Router>
        {/* <h1>
          <a href="/">Online Store</a>
        </h1> */}
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li className="drop">
              <Link to={"/products"}>Products</Link>
              <div className="dropdown">
                <ol>
                  {categories.map((category) => {
                    return (
                      <li key={category}>
                        <a href={`/products/category/${category}`}>
                          {category}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </li>
            <li>
              <Link
                onClick={() => {
                  setShowCart(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 576 512"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0h45.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5l-51.6-271c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zm128 440a48 48 0 1196 0 48 48 0 11-96 0zm336-48a48 48 0 110 96 48 48 0 110-96z"></path>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
        <Cart
          cart={cart}
          setCart={setCart}
          showCart={showCart}
          setShowCart={setShowCart}
          deleteItem={removeFromCart}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/products"
            element={
              <Products
                products={products}
                isLoading={isLoading}
                addToCart={addToCart}
              />
            }
          />
          <Route
            exact
            path="/products/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />
          <Route
            exact
            path="/products/category/:category"
            element={<Category addToCart={addToCart} />}
          />
          {/* <ProductList products={products} /> */}
        </Routes>
      </Router>
    </main>
  );
}

export default App;
