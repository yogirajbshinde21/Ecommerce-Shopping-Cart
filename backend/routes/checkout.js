const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

router.post('/', async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;
    
    if (!name || !email || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Name, email, and cart items are required' });
    }
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const order = new Order({
      orderId,
      customerName: name,
      customerEmail: email,
      items: cartItems,
      total,
      timestamp: new Date()
    });
    
    await order.save();
    
    const cart = await Cart.findOne({ userId: 'guest_user' });
    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }
    
    res.json({
      orderId: order.orderId,
      total: order.total,
      timestamp: order.timestamp,
      items: order.items,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
