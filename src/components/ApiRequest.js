import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError(err));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>Name:</strong> {product.title}
              <br />
              <strong>Price:</strong> ${product.price}
              <br />
              <strong>Category:</strong> {product.category}
              <br />
              <strong>Description:</strong> {product.description}
              <br />
              <img src={product.image} alt={product.title} />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
