// import React, { useState, useEffect } from "react";

function ProductCard({ product, addToCart }) {
  const renderStars = (rating) => {
    const starIcons = [];
    let count = 1;
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(
        <span
          key={count}
          className="outer"
          style={{
            width: "1rem",
            alignItems: "center",
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          <span key={i} >
            ★
          </span>
        </span>
      );
      count++;
    }

    // Add fractional stars if there is a decimal part
    if (decimalPart > 0) {
      starIcons.push(
        <span
          key={count}
          className="outer"
          style={{
            width: "1rem",
            alignItems: "center",
            display: "inline-flex",
            justifyContent: "center",
          }}
        >
          <span
            key="fractional"
            style={{
              width: `${decimalPart * 100}%`,
              overflow: "hidden"
            }}
          >
            ★
          </span>
        </span>
      );
    }

    return starIcons;
  };

  return (
    <div className="card product-card">
      <div className="img flex align-center justify-center">
        <img src={product.thumbnail} alt={product.title} />
        <div className="overlay flex justify-end">
          <button className="button-secondary rounded" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
      <div className="details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="flex align-center justify-between">
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p style={{ width: `5rem` }}>
            {renderStars(product.rating)}
            <small>{product.rating}</small>
          </p>
        </div>
        <a href={`/products/${product.id}`} className="button button-primary">
          View Product
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
