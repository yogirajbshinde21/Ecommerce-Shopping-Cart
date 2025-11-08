import React, { useState, useEffect } from 'react';
import './OrderHistory.css';

const OrderHistory = ({ onBack, onDownloadReceipt }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    setOrders(savedOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(selectedOrder?.orderId === order.orderId ? null : order);
  };

  return (
    <div className="order-history">
      <div className="history-header">
        <h2>Order History</h2>
        <button className="back-btn" onClick={onBack}>
          ← Back to Shop
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="empty-history">
          <p>No orders yet</p>
          <button onClick={onBack}>Start Shopping</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header-row" onClick={() => handleViewDetails(order)}>
                <div className="order-info">
                  <h3>Order #{order.orderId}</h3>
                  <p className="order-date">
                    {new Date(order.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="order-summary-info">
                  <span className="item-count">{order.items.length} items</span>
                  <span className="order-total">${order.total.toFixed(2)}</span>
                  <span className="expand-icon">{selectedOrder?.orderId === order.orderId ? '▲' : '▼'}</span>
                </div>
              </div>

              {selectedOrder?.orderId === order.orderId && (
                <div className="order-details">
                  <div className="customer-info">
                    <p><strong>Customer:</strong> {order.customerName}</p>
                    <p><strong>Email:</strong> {order.customerEmail}</p>
                  </div>
                  
                  <div className="order-items">
                    <h4>Items:</h4>
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-details">
                          {item.image && <img src={item.image} alt={item.name} />}
                          <div>
                            <p className="item-name">{item.name}</p>
                            <p className="item-quantity">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="download-btn"
                    onClick={() => onDownloadReceipt(order)}
                  >
                    📥 Download Receipt
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
