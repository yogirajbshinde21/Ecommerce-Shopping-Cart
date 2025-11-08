const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  name: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'guest_user'
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
