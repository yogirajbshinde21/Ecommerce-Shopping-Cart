import React, { useState } from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose, cart, onCheckout }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    setLoading(true);
    try {
      await onCheckout(name, email);
      setName('');
      setEmail('');
    } catch (err) {
      setError('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Checkout</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cart.items.map(item => (
                <div key={item.productId} className="summary-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span className="total-amount">${cart.total.toFixed(2)}</span>
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="checkout-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
