import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, addingToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product.id)}
            disabled={addingToCart === product.id}
          >
            {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
