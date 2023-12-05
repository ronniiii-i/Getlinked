import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ThreeCircles } from "react-loader-spinner";

function ProductDetails({ addToCart }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const [error, setError] = useState(null);
  let brand = "";

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  }, [id]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setRelated(data.products);
        console.log(data.products);
        setIsRelatedLoading(false);
      });
  }, [product.category]);

  useEffect(() => {
    // Function to shuffle the data array randomly
    const shuffleData = () => {
      const shuffled = [...related];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledData(shuffled);
    };
    shuffleData(); // Call the shuffleData function once on component mount
  }, [related]);

  product.brand ? (brand = product.brand.toLowerCase()) : (brand = "");

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
          <span key={i} style={{ color: "yellow" }}>
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
              overflow: "hidden",
              color: "yellow",
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
    <section id="product_detail" className="flex justify-center">
      <div className="content">
        {isLoading ? (
          <ThreeCircles
            height="100"
            width="100"
            color="#fff"
            wrapperStyle={{ marginBlock: "10rem" }}
            wrapperClass="loader"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>
            <div className="card flex justify-center">
              <div className="img flex align-center justify-center">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className="text flex column justify-evenly">
                <h3>{product.title}</h3>
                <div>
                  <small>
                    <strong>Brand: </strong>
                    <a href={`/products/brand/${brand}`}>{product.brand}</a>
                  </small>
                  &nbsp; &nbsp; | &nbsp; &nbsp;
                  <small>
                    <strong>Category:</strong>{" "}
                    <a href={`/products/category/${product.category}`}>
                      {product.category}
                    </a>
                  </small>
                </div>
                <p className="flex align-center">
                  {product.discountPercentage && (
                    <strong>
                      ${" "}
                      {parseFloat(
                        product.price -
                          (product.discountPercentage / 100) * product.price
                      ).toFixed(2)}
                    </strong>
                  )}
                  {product.discountPercentage ? (
                    <s>$ {product.price}</s>
                  ) : (
                    <strong>$ {product.price}</strong>
                  )}
                  <span>-{product.discountPercentage}%</span>
                </p>
                <p>
                  {product.stock === 0
                    ? "Out of stock"
                    : product.stock <= 10
                    ? `Only ${product.stock} left`
                    : "In Stock"}
                </p>
                <p>
                  <strong>Rating: </strong>
                  <span
                    className="flex align-center justify-center"
                    style={{ width: `5rem` }}
                  >
                    {renderStars(product.rating)}
                  </span>
                  <small>{product.rating}</small>
                </p>
                <button
                  className="button button-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="details">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              <a
                href={`/products/category/${product.category}`}
                className="button-secondary"
              >
                {product.category}
              </a>
            </div>
            <div className="moreimg">
              <h3>More Images:</h3>
              <div className="slider flex align-center">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image) => (
                    <div key={image} className="image">
                      <img src={image} alt={product.title} />
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <aside>
        <h3 className="big">Others from "{product.category}"</h3>
        <div className="cards">
          {isRelatedLoading ? (
            <ThreeCircles
              height="100"
              width="100"
              color="#fff"
              wrapperStyle={{}}
              wrapperClass="loader"
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          ) : (
            shuffledData
              .filter((prod) => prod.id !== id)
              .slice(0, 2)
              .map((product) => {
                return (
                  <div key={product.id} className="mini-card">
                    <div className="prod flex justify-center">
                      <div className="img flex align-center justify-center">
                        <img src={product.thumbnail} alt={product.title} />
                      </div>
                      <div className="text">
                        <h4>{product.title}</h4>
                        <p className="flex align-center">
                          {product.discountPercentage && (
                            <strong>
                              ${" "}
                              {parseFloat(
                                product.price -
                                  (product.discountPercentage / 100) *
                                    product.price
                              ).toFixed(2)}
                            </strong>
                          )}
                          {product.discountPercentage ? (
                            <s>$ {product.price}</s>
                          ) : (
                            <strong>$ {product.price}</strong>
                          )}
                          <span>-{product.discountPercentage}%</span>
                        </p>
                        <p className="flex align-center">
                          <strong>Rating: </strong>
                          <span
                            className="flex align-center justify-center"
                            style={{ width: `5rem` }}
                          >
                            {renderStars(product.rating)}
                          </span>
                          <small>{product.rating}</small>
                        </p>
                      </div>
                    </div>
                    <button
                      className="button button-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })
          )}
        </div>
        <a href={`/products/category/${product.category}`}>See All</a>
      </aside>
    </section>
  );
}

export default ProductDetails;
