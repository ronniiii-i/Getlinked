import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Discount Percentage:</strong> {product.discountPercentage}%
            </p>
            <p>
              <strong>Rating:</strong> {product.rating}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <img src={product.thumbnail} alt={product.title} />
            <h3>Additional Images</h3>
            <div>
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={`${index + 1}`} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
