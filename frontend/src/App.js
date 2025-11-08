import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import CartItem from './components/CartItem';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import OrderHistory from './components/OrderHistory';
import SearchFilter from './components/SearchFilter';
import * as api from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [addingToCart, setAddingToCart] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    loadCartFromLocalStorage();
  }, []);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, cartData] = await Promise.all([
        api.getProducts(),
        api.getCart()
      ]);
      setProducts(productsData);
      setFilteredProducts(productsData);
      setCart(cartData);
      setError(null);
    } catch (err) {
      setError('Failed to load data. Please ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveCartToLocalStorage = () => {
    if (cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (err) {
        console.error('Error loading cart from localStorage', err);
      }
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (category) => {
    if (!category) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleSort = (sortType) => {
    let sorted = [...filteredProducts];
    switch (sortType) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart(productId);
      const updatedCart = await api.addToCart(productId, 1);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to add item to cart');
      console.error(err);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await api.updateCartItem(productId, quantity);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to update cart');
      console.error(err);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const updatedCart = await api.removeFromCart(productId);
      setCart(updatedCart);
    } catch (err) {
      setError('Failed to remove item');
      console.error(err);
    }
  };

  const handleCheckout = async (name, email) => {
    try {
      const orderReceipt = await api.checkout(name, email, cart.items);
      
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      orderHistory.push(orderReceipt);
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      
      setReceipt(orderReceipt);
      setShowCheckout(false);
      setShowReceipt(true);
      setCart({ items: [], total: 0 });
      localStorage.removeItem('cart');
      setShowCart(false);
    } catch (err) {
      setError('Checkout failed');
      console.error(err);
      throw err;
    }
  };

  const downloadReceipt = (receiptData) => {
    const receiptToDownload = receiptData || receipt;
    if (!receiptToDownload) return;

    const receiptText = `
VIBE COMMERCE - ORDER RECEIPT
==============================

Order ID: ${receiptToDownload.orderId}
Date: ${new Date(receiptToDownload.timestamp).toLocaleString()}

Customer Information:
Name: ${receiptToDownload.customerName}
Email: ${receiptToDownload.customerEmail}

Items Ordered:
${receiptToDownload.items.map(item => 
  `- ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

==============================
Total Amount: $${receiptToDownload.total.toFixed(2)}
==============================

Thank you for shopping with Vibe Commerce!
    `.trim();

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptToDownload.orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const categories = [...new Set(products.map(p => p.category))];

  const handleViewHistory = () => {
    setShowReceipt(false);
    setShowHistory(true);
  };

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Vibe Commerce</h1>
          <div className="header-actions">
            <button 
              className="history-button"
              onClick={() => setShowHistory(!showHistory)}
            >
              📜 Orders
            </button>
            <button 
              className="cart-button"
              onClick={() => setShowCart(!showCart)}
            >
              <span className="cart-icon">🛒</span>
              Cart ({cartItemCount})
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className="main-content">
        {showHistory ? (
          <OrderHistory 
            onBack={() => setShowHistory(false)}
            onDownloadReceipt={downloadReceipt}
          />
        ) : showCart ? (
          <div className="cart-view">
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button className="back-btn" onClick={() => setShowCart(false)}>
                ← Back to Products
              </button>
            </div>

            {cart.items.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <button onClick={() => setShowCart(false)}>Start Shopping</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.items.map(item => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveFromCart}
                    />
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <button 
                    className="checkout-button"
                    onClick={() => setShowCheckout(true)}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="products-view">
            <h2 className="section-title">Featured Products</h2>
            <SearchFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              onSort={handleSort}
              categories={categories}
            />
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  addingToCart={addingToCart}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="no-results">
                <p>No products found</p>
              </div>
            )}
          </div>
        )}
      </main>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cart={cart}
        onCheckout={handleCheckout}
      />

      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        receipt={receipt}
        onDownload={() => downloadReceipt()}
        onViewHistory={handleViewHistory}
      />
    </div>
  );
}

export default App;
