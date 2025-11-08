# Vibe Commerce - E-Commerce Shopping Cart

A full-stack shopping cart application built with React, Node.js, Express, and MongoDB.



## 🎥 Demo Video

[Watch Demo Video](YOUR_VIDEO_LINK_HERE)
<!-- Replace YOUR_VIDEO_LINK_HERE with your Loom or YouTube link -->

---

## Features

- Browse products with detailed information
- **Search products** by name or description
- **Filter by category** and sort by price or name
- Add items to cart with quantity management
- Update and remove cart items
- **Cart persistence** using localStorage (survives page refresh)
- Checkout with customer information
- **Download receipt** as text file after purchase
- **Order history** - view all past purchases
- Order confirmation with receipt
- Responsive design for mobile and desktop
- Database persistence with MongoDB
- Error handling and loading states

## Tech Stack

**Frontend:**
- React 18
- Axios for API calls
- CSS3 with modern responsive design

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Project Structure

```
Nexora Assignment/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── checkout.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ProductCard.js
    │   │   ├── ProductCard.css
    │   │   ├── CartItem.js
    │   │   ├── CartItem.css
    │   │   ├── CheckoutModal.js
    │   │   ├── CheckoutModal.css
    │   │   ├── ReceiptModal.js
    │   │   ├── ReceiptModal.css
    │   │   ├── OrderHistory.js
    │   │   ├── OrderHistory.css
    │   │   ├── SearchFilter.js
    │   │   └── SearchFilter.css
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── .gitignore
    └── package.json
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (auto-seeds on first request)

### Cart
- `GET /api/cart` - Get current cart
- `POST /api/cart` - Add item to cart
  ```json
  { "productId": 1, "quantity": 1 }
  ```
- `PUT /api/cart/update` - Update cart item quantity
  ```json
  { "productId": 1, "quantity": 2 }
  ```
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process order
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "cartItems": [...]
  }
  ```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The `.env` file is already configured for local MongoDB
   - Default: `mongodb://localhost:27017/ecommerce_cart`
   - To use MongoDB Atlas, update MONGODB_URI in `.env`

4. Start MongoDB (if using local):
```bash
mongod
```

5. Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

1. **Browse Products**: View the product catalog on the homepage
2. **Search & Filter**: Use the search bar to find products or filter by category
3. **Sort Products**: Sort by price (low to high, high to low) or name
4. **Add to Cart**: Click "Add to Cart" on any product
5. **View Cart**: Click the cart button in the header
6. **Manage Items**: Update quantities or remove items
7. **Checkout**: Click "Proceed to Checkout" and fill in your details
8. **Download Receipt**: After purchase, download a text receipt for your records
9. **Order History**: Click "Orders" button to view all past purchases
10. **Cart Persistence**: Your cart items are saved even if you refresh the page

## Screenshots

### 1. Homepage - Product Grid
The main landing page displaying all products in a responsive grid layout with modern card design.

<img width="1264" height="799" alt="image" src="https://github.com/user-attachments/assets/26fa01df-1bc4-4b24-aa8a-133621ac2df9" />
<!-- Screenshot: Show the full homepage with product grid, header with cart button, and search/filter bar -->

---

### 2. Search & Filter Functionality
Demonstrates the search bar, category filter dropdown, and sort options working together.

<img width="1198" height="613" alt="image" src="https://github.com/user-attachments/assets/7f3f7cfa-9e04-407d-b460-f56d67f092c2" />
<!-- Screenshot: Show search bar with a search term entered, category filter selected, and products filtered -->

---

### 3. Product Cards with Hover Effect
Close-up view of product cards showing the design details and hover state.

<img width="380" height="440" alt="image" src="https://github.com/user-attachments/assets/e49d207b-2952-4397-accd-14649e46d897" />
<!-- Screenshot: Capture 2-3 product cards with one showing hover effect -->

---

### 4. Shopping Cart View
The cart page showing added items with quantity controls, remove buttons, and total calculation.

<img width="938" height="807" alt="image" src="https://github.com/user-attachments/assets/dbde790e-a26c-4a94-ae17-6f9cac60f134" />
<!-- Screenshot: Cart with 3-4 items added, showing quantity controls and total price -->

---

### 5. Cart Quantity Management
Demonstrates the ability to update item quantities and remove items from cart.

<img width="756" height="106" alt="image" src="https://github.com/user-attachments/assets/7a1ec3db-d232-4875-9072-1ddc0b352a8f" />
<!-- Screenshot: Focus on quantity controls (+/-) buttons and remove button -->

---

### 6. Checkout Modal
The checkout form with customer information fields and order summary.

<img width="526" height="661" alt="image" src="https://github.com/user-attachments/assets/b208c220-5a0e-43fb-8f18-e36999a7b0fd" />
<!-- Screenshot: Checkout modal open with name/email fields and order summary visible -->

---

### 7. Order Confirmation Receipt
Success modal after checkout showing order details and action buttons.

<img width="512" height="845" alt="image" src="https://github.com/user-attachments/assets/146e5f10-54dd-42ff-b61a-3fbe7fb64564" />
<!-- Screenshot: Receipt modal with order ID, customer details, items list, total, and download/history buttons -->

---

### 8. Order History Page
Complete order history view showing all past purchases with expandable details.

<img width="929" height="560" alt="image" src="https://github.com/user-attachments/assets/3238b129-8e75-48f4-a89a-c25435f0db62" />
<!-- Screenshot: Order history page with 2-3 orders listed -->

---

### 9. Order Details Expanded
Expanded order view showing full details of a past purchase.

<img width="875" height="667" alt="image" src="https://github.com/user-attachments/assets/b3ad8c2f-c848-4de0-8c52-c5c6e85bcdad" />
<!-- Screenshot: One order expanded showing customer info, items with images, and download button -->

---

### 10. Downloaded Receipt File
Example of the downloadable text receipt opened in notepad.

<img width="471" height="500" alt="image" src="https://github.com/user-attachments/assets/f5a03e57-8c21-476b-9a82-a02d1b1f7d96" />
<!-- Screenshot: Text file opened showing the receipt format with order details -->

---

### 11. Mobile Responsive View
Demonstrates the responsive design on mobile devices.

<img width="459" height="796" alt="image" src="https://github.com/user-attachments/assets/d10728ab-1103-479d-8632-765f66bf3554" />
<!-- Screenshot: Browser in mobile view (360px width) showing homepage or cart -->

---

### 12. Backend API Running
Terminal showing the backend server running successfully.

<img width="490" height="246" alt="image" src="https://github.com/user-attachments/assets/d2bef2cb-e893-47da-aff0-cb338033e7fd" />
<!-- Screenshot: Terminal with "Server running on port 5000" and "MongoDB connected successfully" messages -->

---

## Key Features Implemented

✅ REST API with Express  
✅ MongoDB database integration  
✅ Product catalog with 8 mock items  
✅ Cart management (add/update/remove)  
✅ **Cart persistence with localStorage**  
✅ **Product search functionality**  
✅ **Category filtering**  
✅ **Price and name sorting**  
✅ Checkout process with validation  
✅ Order persistence  
✅ Mock receipt generation  
✅ **Downloadable receipt (text format)**  
✅ **Order history page**  
✅ Responsive design  
✅ Error handling  
✅ Loading states  

## Stand-Out Features

### 1. 📥 Downloadable Receipt
After completing a purchase, users can download a text receipt containing their order details, items purchased, and total amount. This provides a permanent record for the customer.

### 2. 📜 Order History
A complete order history page where users can:
- View all past purchases
- See detailed information for each order
- Download receipts for previous orders
- Track purchase patterns

### 3. 🔍 Smart Search & Filter
Enhanced product discovery with:
- Real-time search across product names and descriptions
- Category-based filtering (Electronics, Accessories)
- Multi-criteria sorting (price low-to-high, high-to-low, alphabetical)

### 4. 💾 Cart Persistence
Cart items are automatically saved to localStorage, ensuring:
- No lost items on page refresh
- Seamless shopping experience
- Better user retention

### 5. 🎨 Modern UI/UX
- Clean, professional design with smooth animations
- Intuitive navigation and clear visual hierarchy
- Responsive layout for all devices
- Loading states and error handling  

## Database Models

### Product
- id, name, price, image, category, description

### Cart
- userId (default: guest_user), items[], total

### Order
- orderId, customerName, customerEmail, items[], total, timestamp

## Development Notes

- Products are auto-seeded on first API call
- Cart uses a guest user system
- All images are from Unsplash
- Prices are in USD
- Order IDs are generated with timestamp and random suffix

## Future Enhancements

- User authentication and profiles
- Payment gateway integration
- Product ratings and reviews
- Wishlist functionality
- Email order confirmations
- Admin dashboard for inventory management
- Advanced analytics and reporting
- PDF receipt generation
- Multi-currency support

## License

This project is for educational purposes as part of an internship assignment.
