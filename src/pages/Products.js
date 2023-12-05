import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

import { ThreeCircles } from "react-loader-spinner";

function Products({ products, isLoading, addToCart  }) {

  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <section id="products">
      <h2>Products</h2>
      {isLoading ? (
        <ThreeCircles
          height="100"
          width="100"
          color="#fff"
          wrapperStyle={{ marginBlock: "7rem" }}
          wrapperClass="loader"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      ) : (
        <>
          <div className="inner grid g-af3">
            {currentProducts.map((product, index) => {
              return <ProductCard key={index} product={product} addToCart={addToCart} />;
            })}
          </div>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Products;
