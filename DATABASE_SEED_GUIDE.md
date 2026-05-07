# 🌱 Database Seed Guide

## Problem: No Categories Found

When adding a product, you need categories to exist in the database first.

---

## ✅ Quick Solution (2 Steps)

### Step 1: Go to Seed Page
```
http://localhost:3001/seed
```

### Step 2: Click "Seed Categories"
- Wait for success message
- 8 categories will be created
- You can now add products!

---

## 📝 What Gets Created

### 8 Product Categories:

1. **Electronics**
   - Gadgets and electronic devices
   - Slug: `electronics`

2. **Fashion**
   - Clothing and accessories
   - Slug: `fashion`

3. **Home & Garden**
   - Home and garden items
   - Slug: `home-garden`

4. **Sports**
   - Sports equipment and fitness
   - Slug: `sports`

5. **Books**
   - Books and magazines
   - Slug: `books`

6. **Toys & Games**
   - Toys and games
   - Slug: `toys-games`

7. **Beauty & Health**
   - Beauty and health products
   - Slug: `beauty-health`

8. **Automotive**
   - Car accessories and parts
   - Slug: `automotive`

---

## 🚀 Alternative Methods

### Method 1: Using the Seed Page (Easiest)
```
1. Go to http://localhost:3001/seed
2. Click "Seed Categories"
3. Done!
```

### Method 2: Using API Directly
```bash
# Using curl
curl -X POST http://localhost:3001/api/seed/categories

# Using browser console
fetch('/api/seed/categories', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```

### Method 3: Using MongoDB Compass
```javascript
// Connect to MongoDB
// Select 'ecommerce' database
// Create 'categories' collection
// Insert documents manually
```

---

## 🔍 Check if Categories Exist

### Using Seed Page:
```
1. Go to http://localhost:3001/seed
2. Click "Check Categories"
3. See count and list
```

### Using API:
```bash
curl http://localhost:3001/api/seed/categories
```

### Using MongoDB:
```bash
# Connect to MongoDB
mongosh

# Switch to database
use ecommerce

# Count categories
db.categories.countDocuments()

# List categories
db.categories.find()
```

---

## 🐛 Troubleshooting

### Issue: "Failed to seed categories"

**Solution 1: Check MongoDB is Running**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod

# Or check if running
mongosh
```

**Solution 2: Check Connection String**
```env
# In .env.local
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

**Solution 3: Check Database Name**
```
Make sure database name is 'ecommerce'
Or update MONGODB_URI to match your database
```

### Issue: "Categories already exist"

**This is normal!** It means categories are already in the database.

**To verify:**
```
1. Go to http://localhost:3001/seed
2. Click "Check Categories"
3. Should show 8 categories
```

### Issue: "No categories found" when adding product

**Solution:**
```
1. Go to http://localhost:3001/seed
2. Click "Seed Categories"
3. Wait for success message
4. Go back to Add Product page
5. Refresh the page
6. Categories should now appear
```

---

## 📊 Category Data Structure

```javascript
{
  _id: ObjectId("..."),
  name: "Electronics",
  slug: "electronics",
  description: "Latest gadgets and electronic devices",
  image: "https://images.unsplash.com/...",
  isActive: true,
  createdAt: ISODate("2025-01-01T00:00:00.000Z"),
  updatedAt: ISODate("2025-01-01T00:00:00.000Z")
}
```

---

## 🔄 Re-seeding Categories

### To Delete and Re-seed:

**Method 1: Using MongoDB**
```bash
mongosh
use ecommerce
db.categories.deleteMany({})
# Then go to http://localhost:3001/seed and click "Seed Categories"
```

**Method 2: Using MongoDB Compass**
```
1. Connect to MongoDB
2. Select 'ecommerce' database
3. Select 'categories' collection
4. Delete all documents
5. Go to seed page and seed again
```

---

## ✅ Verification Checklist

After seeding, verify:

- [ ] Seed page shows "Categories seeded successfully"
- [ ] Count shows 8 categories
- [ ] Categories list shows all 8 names
- [ ] Add Product page shows categories in dropdown
- [ ] Can select a category when adding product

---

## 🎯 Quick Commands

### Seed Categories:
```bash
# Browser
http://localhost:3001/seed

# API
curl -X POST http://localhost:3001/api/seed/categories
```

### Check Categories:
```bash
# Browser
http://localhost:3001/seed

# API
curl http://localhost:3001/api/seed/categories

# MongoDB
mongosh
use ecommerce
db.categories.find()
```

### Delete Categories:
```bash
mongosh
use ecommerce
db.categories.deleteMany({})
```

---

## 📚 Related Files

- **Seed API:** `app/api/seed/categories/route.js`
- **Seed Page:** `app/seed/page.js`
- **Category Model:** `models/Category.js`
- **Categories API:** `app/api/categories/route.js`

---

## 🎉 You're Ready!

Once categories are seeded:
1. ✅ Go to Add Product page
2. ✅ Select a category from dropdown
3. ✅ Fill other product details
4. ✅ Create your first product!

---

**Quick Links:**
- Seed Page: http://localhost:3001/seed
- Add Product: http://localhost:3001/seller/products/new
- Seller Dashboard: http://localhost:3001/seller/dashboard

**Need Help?**
- Check MongoDB is running
- Check .env.local has correct MONGODB_URI
- Check server logs for errors
