const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: 'guest_user' });
    
    if (!cart) {
      cart = new Cart({ userId: 'guest_user', items: [], total: 0 });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity required' });
    }
    
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    let cart = await Cart.findOne({ userId: 'guest_user' });
    
    if (!cart) {
      cart = new Cart({ userId: 'guest_user', items: [] });
    }
    
    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }
    
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    let cart = await Cart.findOne({ userId: 'guest_user' });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    let cart = await Cart.findOne({ userId: 'guest_user' });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    const item = cart.items.find(item => item.productId === productId);
    
    if (item) {
      if (quantity <= 0) {
        cart.items = cart.items.filter(item => item.productId !== productId);
      } else {
        item.quantity = quantity;
      }
      
      cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
