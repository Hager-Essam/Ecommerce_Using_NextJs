# 🔧 Add Product Troubleshooting Guide

## ✅ Latest Fixes Applied (May 7, 2026)

### Fixed Issues:
1. ✅ **Image URL Validation** - Now properly validates URLs
2. ✅ **Compare at Price** - Handles empty values correctly
3. ✅ **Better Error Messages** - Shows specific field errors
4. ✅ **Client-side Validation** - Validates before sending to server
5. ✅ **Detailed Logging** - Console logs for debugging

---

## 📝 Required Fields

### Must Fill:
1. **Product Name** - At least 3 characters
2. **Description** - At least 10 characters
3. **Category** - Select from dropdown
4. **Price** - Must be a positive number (e.g., 99.99)
5. **Stock** - Must be a positive integer (e.g., 50)
6. **At least 1 Image** - Valid URL

### Optional:
- Compare at Price (for discounts)
- Additional images
- Specifications

---

## 🐛 Common Errors & Solutions

### Error: "Name must be at least 3 characters"
**Solution:**
```
✅ Good: "Wireless Headphones"
❌ Bad: "WH"
```

### Error: "Description must be at least 10 characters"
**Solution:**
```
✅ Good: "High-quality wireless headphones with noise cancellation"
❌ Bad: "Headphones"
```

### Error: "Price must be positive"
**Solution:**
```
✅ Good: 99.99
❌ Bad: 0, -10, empty
```

### Error: "Category is required"
**Solution:**
```
1. Make sure categories are seeded (http://localhost:3001/seed)
2. Select a category from the dropdown
3. Don't leave it as "Select a category"
```

### Error: "At least one image is required" or "Each image must be a valid URL"
**Solution:**
```
✅ Good: 
- https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500
- https://via.placeholder.com/500
- https://picsum.photos/500

❌ Bad: 
- Empty field
- "image.jpg" (must start with http:// or https://)
- "www.example.com/image.jpg" (missing protocol)
- Invalid URL format
```

**Quick Fix:**
- Make sure URL starts with `https://` or `http://`
- Use placeholder images for testing: `https://via.placeholder.com/500`
- Use free image services: Unsplash, Placeholder.com, Lorem Picsum

### Error: "Stock must be a positive integer"
**Solution:**
```
✅ Good: 50, 100, 0
❌ Bad: -5, 10.5, empty
```

---

## 📋 Sample Valid Product Data

### Example 1: Electronics
```
Name: Wireless Bluetooth Headphones
Description: Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.
Category: Electronics
Price: 99.99
Compare at Price: 149.99 (optional)
Stock: 50
Image: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500

Specifications (optional):
- Brand: Sony
- Color: Black
- Weight: 250g
- Battery Life: 30 hours
```

### Example 2: Fashion
```
Name: Men's Running Shoes
Description: Lightweight and comfortable running shoes with breathable mesh upper and cushioned sole. Ideal for daily runs and workouts.
Category: Fashion
Price: 79.99
Compare at Price: 120.00
Stock: 100
Image: https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500

Specifications:
- Brand: Nike
- Size: 10
- Color: Blue/White
- Material: Mesh
```

### Example 3: Home & Garden
```
Name: Stainless Steel Coffee Maker
Description: 12-cup programmable coffee maker with thermal carafe, auto-shutoff, and brew strength control. Makes perfect coffee every time.
Category: Home & Garden
Price: 89.99
Stock: 30
Image: https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500

Specifications:
- Capacity: 12 cups
- Material: Stainless Steel
- Features: Programmable, Auto-shutoff
```

---

## 🔍 Debugging Steps

### Step 1: Check Browser Console
```
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to submit the form
4. Look for error messages
5. Check what data is being sent
```

### Step 2: Check Server Logs
```
1. Look at your terminal where npm run dev is running
2. Check for error messages
3. Look for "Create product error:" messages
```

### Step 3: Verify Data Types
```javascript
// Check in browser console before submitting:
console.log({
  name: typeof formData.name, // should be "string"
  price: typeof parseFloat(formData.price), // should be "number"
  stock: typeof parseInt(formData.stock), // should be "number"
  category: typeof formData.category, // should be "string"
  images: Array.isArray(formData.images), // should be true
});
```

---

## ✅ Pre-Submit Checklist

Before clicking "Create Product":

- [ ] Product name is at least 3 characters
- [ ] Description is at least 10 characters
- [ ] Category is selected (not "Select a category")
- [ ] Price is filled and is a positive number
- [ ] Stock is filled and is a positive number
- [ ] At least one image URL is filled
- [ ] Image URL starts with http:// or https://
- [ ] All required fields have values

---

## 🎯 Quick Test

### Minimal Valid Product:
```
Name: Test Product
Description: This is a test product with a description longer than 10 characters.
Category: Electronics (select from dropdown)
Price: 10
Stock: 5
Image: https://via.placeholder.com/500
```

Click "Create Product" - should work!

---

## 🔧 Still Having Issues?

### Check These:

1. **MongoDB Running?**
```bash
mongosh
# Should connect without errors
```

2. **Categories Seeded?**
```
Go to http://localhost:3001/seed
Click "Check Categories"
Should show 8 categories
```

3. **Signed in as Seller?**
```
Check your account role is "Seller"
Sign out and sign back in if needed
```

4. **Server Running?**
```bash
npm run dev
# Should be running on port 3001
```

5. **Check .env.local**
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
```

---

## 📊 Validation Rules Summary

| Field | Type | Min | Max | Required |
|-------|------|-----|-----|----------|
| Name | String | 3 chars | - | ✅ Yes |
| Description | String | 10 chars | - | ✅ Yes |
| Category | String | - | - | ✅ Yes |
| Price | Number | > 0 | - | ✅ Yes |
| Compare Price | Number | > 0 | - | ❌ No |
| Stock | Integer | ≥ 0 | - | ✅ Yes |
| Images | Array | 1 item | - | ✅ Yes |
| Specifications | Object | - | - | ❌ No |

---

## 🎉 Success Indicators

You'll know it worked when:
- ✅ See "Product created successfully!" message
- ✅ Redirected to products list page
- ✅ Your product appears in the table
- ✅ No error messages

---

## 📞 Need More Help?

### Check These Files:
- **API Route:** `app/api/seller/products/route.js`
- **Add Product Page:** `app/seller/products/new/page.js`
- **Product Model:** `models/Product.js`

### Check Server Logs:
```bash
# Look for these messages:
"Create product error:"
"Validation error:"
"Sending product data:"
```

### Check Browser Console:
```
F12 → Console tab
Look for red error messages
Check Network tab for API responses
```

---

**Quick Links:**
- Seed Categories: http://localhost:3001/seed
- Add Product: http://localhost:3001/seller/products/new
- Manage Products: http://localhost:3001/seller/products

**Still stuck? Check the browser console and server logs for specific error messages!**
