const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    let products = await Product.find();
    
    if (products.length === 0) {
      const mockProducts = [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
          category: "Electronics",
          description: "Premium wireless headphones with noise cancellation"
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
          category: "Electronics",
          description: "Feature-rich smartwatch with health tracking"
        },
        {
          id: 3,
          name: "Laptop Backpack",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
          category: "Accessories",
          description: "Durable backpack with laptop compartment"
        },
        {
          id: 4,
          name: "Bluetooth Speaker",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
          category: "Electronics",
          description: "Portable speaker with excellent sound quality"
        },
        {
          id: 5,
          name: "USB-C Hub",
          price: 39.99,
          image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
          category: "Accessories",
          description: "Multi-port USB-C hub for connectivity"
        },
        {
          id: 6,
          name: "Wireless Mouse",
          price: 29.99,
          image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
          category: "Electronics",
          description: "Ergonomic wireless mouse with precision"
        },
        {
          id: 7,
          name: "Phone Stand",
          price: 19.99,
          image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400",
          category: "Accessories",
          description: "Adjustable stand for phones and tablets"
        },
        {
          id: 8,
          name: "Mechanical Keyboard",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
          category: "Electronics",
          description: "RGB mechanical keyboard for gaming"
        }
      ];
      
      await Product.insertMany(mockProducts);
      products = await Product.find();
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
