import React from 'react';
import './ReceiptModal.css';

const ReceiptModal = ({ isOpen, onClose, receipt, onDownload, onViewHistory }) => {
  if (!isOpen || !receipt) return null;

  const formattedDate = new Date(receipt.timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase</p>
        </div>
        
        <div className="receipt-details">
          <div className="receipt-row">
            <span>Order ID:</span>
            <strong>{receipt.orderId}</strong>
          </div>
          <div className="receipt-row">
            <span>Customer:</span>
            <strong>{receipt.customerName}</strong>
          </div>
          <div className="receipt-row">
            <span>Email:</span>
            <strong>{receipt.customerEmail}</strong>
          </div>
          <div className="receipt-row">
            <span>Date:</span>
            <strong>{formattedDate}</strong>
          </div>
        </div>
        
        <div className="receipt-items">
          <h3>Items Ordered</h3>
          {receipt.items.map((item, index) => (
            <div key={index} className="receipt-item">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="receipt-total">
          <span>Total Amount:</span>
          <span className="total-price">${receipt.total.toFixed(2)}</span>
        </div>
        
        <div className="receipt-actions">
          <button className="download-receipt-btn" onClick={onDownload}>
            📥 Download Receipt
          </button>
          <button className="view-history-btn" onClick={onViewHistory}>
            📜 View Order History
          </button>
        </div>
        
        <button className="close-receipt-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
