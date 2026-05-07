# 🏪 Seller Product Management Guide

## ✅ What's Been Implemented

### Complete Product Management System for Sellers:
- ✅ Add new products
- ✅ View all products
- ✅ Edit products
- ✅ Delete products
- ✅ Product images (multiple)
- ✅ Product specifications
- ✅ Category selection
- ✅ Stock management
- ✅ Pricing with discounts
- ✅ Role-based access (sellers only)

---

## 🚀 Quick Start

### Step 1: Register as Seller
```
1. Go to http://localhost:3001/auth/register
2. Fill registration form
3. Select "Seller" as Account Type
4. Complete registration
5. Verify email (if configured)
6. Sign in
```

### Step 2: Access Seller Dashboard
```
1. Sign in as seller
2. Go to http://localhost:3001/seller/dashboard
3. Click "Add Product" or "Manage Products"
```

### Step 3: Add Your First Product
```
1. Go to http://localhost:3001/seller/products/new
2. Fill product details
3. Add images (URLs)
4. Set price and stock
5. Click "Create Product"
```

---

## 📁 Files Created

### API Routes:
- ✅ `app/api/seller/products/route.js` - List & create products
- ✅ `app/api/seller/products/[id]/route.js` - Get, update, delete product
- ✅ `app/api/categories/route.js` - Get categories

### Pages:
- ✅ `app/seller/products/page.js` - Manage products (list view)
- ✅ `app/seller/products/new/page.js` - Add new product
- ✅ `app/seller/dashboard/page.js` - Updated with product links

---

## 🎯 Features Explained

### 1. Add Product
**URL:** http://localhost:3001/seller/products/new

**Features:**
- Product name and description
- Category selection
- Price and compare-at price (for discounts)
- Stock quantity
- Multiple product images
- Custom specifications (key-value pairs)
- Form validation
- Success/error messages

**Required Fields:**
- ✅ Product Name (min 3 characters)
- ✅ Description (min 10 characters)
- ✅ Category
- ✅ Price (must be positive)
- ✅ Stock quantity
- ✅ At least one image URL

**Optional Fields:**
- Compare-at price (for showing discounts)
- Additional images
- Specifications (Brand, Color, Weight, etc.)

---

### 2. Manage Products
**URL:** http://localhost:3001/seller/products

**Features:**
- View all your products in a table
- Product thumbnail
- Category, price, stock info
- Active/Inactive status
- Quick actions:
  - 👁️ View product (customer view)
  - ✏️ Edit product
  - 🗑️ Delete product
- Empty state with "Add First Product" button

**Table Columns:**
- Product (image + name + slug)
- Category
- Price (with compare-at price if set)
- Stock (color-coded: green if in stock, red if out)
- Status (Active/Inactive badge)
- Actions (View, Edit, Delete)

---

### 3. Edit Product
**URL:** http://localhost:3001/seller/products/edit/[id]

**Features:**
- Pre-filled form with existing data
- Update any field
- Same validation as add product
- Success/error messages
- Cancel button to go back

---

### 4. Delete Product
**Features:**
- Confirmation dialog
- Permanent deletion
- Removes from database
- Updates list immediately

---

## 🧪 Testing

### Test Flow:

#### 1. Register as Seller
```
URL: http://localhost:3001/auth/register
Name: Test Seller
Email: seller@test.com
Password: password123
Role: Seller
```

#### 2. Sign In
```
URL: http://localhost:3001/auth/signin
Email: seller@test.com
Password: password123
```

#### 3. Add Product
```
URL: http://localhost:3001/seller/products/new

Product Name: Wireless Bluetooth Headphones
Description: High-quality wireless headphones with noise cancellation
Category: Electronics
Price: 99.99
Compare at Price: 149.99
Stock: 50
Image: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500

Specifications:
- Brand: Sony
- Color: Black
- Weight: 250g
- Battery Life: 30 hours
```

#### 4. View Products
```
URL: http://localhost:3001/seller/products
Should see your product in the table
```

#### 5. Edit Product
```
Click Edit icon
Update price to 89.99
Click "Update Product"
```

#### 6. View as Customer
```
Click View icon
See product detail page
```

#### 7. Delete Product
```
Click Delete icon
Confirm deletion
Product removed from list
```

---

## 📊 Product Data Structure

### Product Object:
```javascript
{
  name: "Wireless Headphones",
  slug: "wireless-headphones",
  description: "High-quality wireless headphones...",
  price: 99.99,
  compareAtPrice: 149.99,
  category: "ObjectId",
  images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  stock: 50,
  seller: "ObjectId",
  specifications: {
    "Brand": "Sony",
    "Color": "Black",
    "Weight": "250g"
  },
  ratings: {
    average: 4.5,
    count: 128
  },
  isActive: true,
  isFeatured: false,
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z"
}
```

---

## 🔒 Security Features

### Role-Based Access:
- ✅ Only sellers and admins can access
- ✅ Sellers can only manage their own products
- ✅ Session validation on every request
- ✅ Unauthorized users redirected

### Data Validation:
- ✅ Server-side validation with Zod
- ✅ Client-side validation
- ✅ Required field checks
- ✅ Type validation (numbers, URLs, etc.)

### Ownership Verification:
- ✅ Sellers can only edit/delete their products
- ✅ Product ownership checked on every operation
- ✅ 404 error if product not found or unauthorized

---

## 🎨 Image Guidelines

### Recommended Image Specifications:
- **Format:** JPG, PNG, WebP
- **Size:** 500x500px minimum
- **Aspect Ratio:** Square (1:1) preferred
- **File Size:** Under 1MB
- **Quality:** High resolution

### Free Image Sources:
- **Unsplash:** https://unsplash.com
- **Pexels:** https://pexels.com
- **Pixabay:** https://pixabay.com

### Example Image URLs:
```
Electronics:
https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500

Fashion:
https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500

Home & Garden:
https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500
```

---

## 📝 Best Practices

### Product Names:
- ✅ Clear and descriptive
- ✅ Include key features
- ✅ 3-100 characters
- ❌ Avoid ALL CAPS
- ❌ Avoid special characters

**Good Examples:**
- "Wireless Bluetooth Headphones with Noise Cancellation"
- "Men's Running Shoes - Size 10"
- "Stainless Steel Coffee Maker - 12 Cup"

**Bad Examples:**
- "BEST HEADPHONES EVER!!!"
- "Product #12345"
- "Item"

### Descriptions:
- ✅ Detailed and informative
- ✅ Highlight key features
- ✅ Include use cases
- ✅ Mention materials/specifications
- ✅ 50-500 words

### Pricing:
- ✅ Competitive pricing
- ✅ Use compare-at price for discounts
- ✅ Include shipping in calculations
- ✅ Round to .99 for psychology

### Images:
- ✅ Multiple angles
- ✅ High quality
- ✅ Good lighting
- ✅ Show product in use
- ✅ Include size reference

### Stock Management:
- ✅ Keep stock updated
- ✅ Set realistic quantities
- ✅ Update after sales
- ✅ Mark as inactive when out of stock

---

## 🐛 Troubleshooting

### Issue: "Unauthorized" Error

**Solution:**
```
1. Make sure you're signed in
2. Check your account role is "Seller"
3. Try signing out and back in
4. Check browser console for errors
```

### Issue: "Category not found"

**Solution:**
```
1. Make sure MongoDB is running
2. Check categories exist in database
3. Run seed script to create categories
4. Refresh the page
```

### Issue: "Failed to create product"

**Solution:**
```
1. Check all required fields are filled
2. Verify image URLs are valid
3. Check price is a positive number
4. Check stock is a positive integer
5. Look at browser console for errors
```

### Issue: "Product not showing on products page"

**Solution:**
```
1. Check product is marked as "Active"
2. Verify product has valid category
3. Check product has at least one image
4. Refresh the products page
```

---

## 🔄 API Endpoints

### Get All Seller Products
```
GET /api/seller/products
Authorization: Required (Seller/Admin)
Response: { products: [...] }
```

### Create Product
```
POST /api/seller/products
Authorization: Required (Seller/Admin)
Body: {
  name, description, price, category,
  images, stock, specifications
}
Response: { message, product }
```

### Get Single Product
```
GET /api/seller/products/[id]
Authorization: Required (Seller/Admin)
Response: { product }
```

### Update Product
```
PUT /api/seller/products/[id]
Authorization: Required (Seller/Admin)
Body: { ...fields to update }
Response: { message, product }
```

### Delete Product
```
DELETE /api/seller/products/[id]
Authorization: Required (Seller/Admin)
Response: { message }
```

### Get Categories
```
GET /api/categories
Authorization: Not required
Response: { categories: [...] }
```

---

## ✅ Feature Checklist

### Seller Can:
- [ ] Register as seller
- [ ] Sign in
- [ ] Access seller dashboard
- [ ] Add new products
- [ ] View all their products
- [ ] Edit their products
- [ ] Delete their products
- [ ] Add multiple images
- [ ] Add specifications
- [ ] Set prices and discounts
- [ ] Manage stock
- [ ] View products as customers see them

### System Features:
- [ ] Role-based access control
- [ ] Form validation
- [ ] Error handling
- [ ] Success messages
- [ ] Loading states
- [ ] Responsive design
- [ ] Image preview
- [ ] Slug generation
- [ ] Category selection
- [ ] Stock tracking

---

## 🎉 You're Ready!

**Sellers can now:**
1. ✅ Add products with full details
2. ✅ Manage their product inventory
3. ✅ Edit product information
4. ✅ Delete products
5. ✅ View products as customers see them

**Next Steps:**
1. Register as seller
2. Add your first product
3. Test all features
4. Start selling!

---

## 📚 Related Documentation

- **Email Verification:** `EMAIL_VERIFICATION_SETUP.md`
- **Payment Integration:** `PAYMENT_INTEGRATION_GUIDE.md`
- **MongoDB Setup:** `MONGODB_SETUP.md`
- **Project README:** `README.md`

---

**Happy Selling! 🚀**

**Quick Links:**
- Seller Dashboard: http://localhost:3001/seller/dashboard
- Add Product: http://localhost:3001/seller/products/new
- Manage Products: http://localhost:3001/seller/products
