# 🛍️ E-Commerce Platform - Next.js

A full-featured e-commerce platform built with Next.js 15, MongoDB, and NextAuth.js. Features include product browsing, shopping cart, checkout, user authentication, seller dashboard, and more.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ Features

### 🛒 Shopping Features
- ✅ Product browsing with real-time filters
- ✅ Advanced search (by name, category, price, rating)
- ✅ Product categories with detail pages
- ✅ Shopping cart with localStorage persistence
- ✅ Wishlist functionality
- ✅ Two-step checkout process
- ✅ Multiple payment methods (Card, Cash on Delivery)

### 👤 User Features
- ✅ User registration and authentication
- ✅ User profile management
- ✅ Order history with tracking
- ✅ Saved addresses
- ✅ Payment methods management

### 🏪 Seller Features
- ✅ Seller dashboard with statistics
- ✅ Product management
- ✅ Order management
- ✅ Sales analytics

### 🎨 UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern, clean interface
- ✅ Smooth animations and transitions
- ✅ Loading states and error handling
- ✅ Accessible components

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB installed (local or Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-nextjs.git
cd ecommerce-nextjs
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your values
```

4. **Set up MongoDB**
- See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed instructions
- Update `MONGODB_URI` in `.env.local`

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
ecommerce-nextjs-js/
├── app/                      # Next.js 15 App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   └── products/        # Product endpoints
│   ├── auth/                # Auth pages (signin, register)
│   ├── cart/                # Shopping cart page
│   ├── categories/          # Category pages
│   ├── checkout/            # Checkout flow
│   ├── orders/              # Order history
│   ├── products/            # Product pages
│   ├── profile/             # User profile
│   ├── seller/              # Seller dashboard
│   └── wishlist/            # Wishlist page
├── components/              # React components
│   └── layout/             # Layout components (Navbar, Footer)
├── lib/                     # Utility functions
│   ├── auth.ts             # NextAuth configuration
│   ├── cart-context.tsx    # Cart state management
│   ├── mongodb.ts          # MongoDB connection
│   └── utils.ts            # Helper functions
├── models/                  # MongoDB models
│   ├── User.js             # User model
│   ├── Product.js          # Product model
│   ├── Order.js            # Order model
│   └── Category.js         # Category model
├── public/                  # Static assets
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
└── README.md               # This file
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with these variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Optional: OAuth providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: Email
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# Optional: Payment
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

See `.env.example` for all available options.

---

## 📖 Documentation

- [Getting Started Guide](./GETTING_STARTED.md) - Quick start guide
- [MongoDB Setup](./MONGODB_SETUP.md) - Database setup instructions
- [Current Status](./CURRENT_STATUS.md) - Project status and features
- [Features Working](./FEATURES_WORKING.md) - Complete feature list
- [GitHub Push Guide](./GITHUB_PUSH_GUIDE.md) - How to push to GitHub

---

## 🎯 Usage

### For Customers:
1. Browse products at `/products`
2. Filter by category, price, rating
3. Add items to cart
4. Proceed to checkout
5. Create account or continue as guest
6. Complete order

### For Sellers:
1. Register as a seller
2. Access seller dashboard at `/seller/dashboard`
3. Add products
4. Manage orders
5. View sales analytics

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TailwindCSS** - Utility-first CSS
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **NextAuth.js** - Authentication

### Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

---

## 🌟 Key Features Explained

### Real-Time Product Filters
- Search by product name
- Filter by multiple categories
- Set price range (min/max)
- Filter by rating (1-5 stars)
- Sort by price, rating, newest
- Clear all filters with one click

### Shopping Cart
- Add/remove items
- Update quantities
- Persists with localStorage
- Real-time total calculation
- Cart counter in navbar

### Checkout Process
1. **Shipping Information**
   - Full name, email, phone
   - Complete address
   - Form validation

2. **Payment Method**
   - Credit/Debit card
   - Cash on Delivery
   - Order summary

### User Dashboard
- View profile information
- Order history with tracking
- Saved addresses
- Payment methods
- Wishlist management

### Seller Dashboard
- Sales statistics
- Product management
- Order management
- Revenue tracking
- Recent orders list

---

## 🔒 Security

- ✅ Environment variables for secrets
- ✅ Password hashing with bcrypt
- ✅ JWT tokens for authentication
- ✅ CSRF protection
- ✅ Input validation
- ✅ SQL injection prevention (NoSQL)
- ✅ XSS protection

---

## 🚧 Roadmap

### Planned Features
- [ ] Product reviews and ratings
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] Payment gateway integration (Stripe)
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Discount codes and promotions
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database
- TailwindCSS for the styling system
- All contributors and users

---

## 📞 Support

If you have any questions or need help:

1. Check the [documentation](./GETTING_STARTED.md)
2. Open an [issue](https://github.com/YOUR_USERNAME/ecommerce-nextjs/issues)
3. Contact via email

---

## 📊 Project Status

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** January 2025

### What's Working:
- ✅ 13/13 pages (100%)
- ✅ All shopping features
- ✅ User authentication UI
- ✅ Seller dashboard
- ✅ Responsive design

### Requires MongoDB:
- ⚠️ User registration/login
- ⚠️ Order persistence
- ⚠️ Product management

---

**Made with ❤️ using Next.js**
