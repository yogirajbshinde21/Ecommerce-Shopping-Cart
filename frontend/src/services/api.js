import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getCart = async () => {
  const response = await axios.get(`${API_URL}/cart`);
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post(`${API_URL}/cart`, { productId, quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await axios.delete(`${API_URL}/cart/${productId}`);
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await axios.put(`${API_URL}/cart/update`, { productId, quantity });
  return response.data;
};

export const checkout = async (name, email, cartItems) => {
  const response = await axios.post(`${API_URL}/checkout`, { name, email, cartItems });
  return response.data;
};
