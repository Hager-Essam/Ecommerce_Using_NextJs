# MongoDB Setup Guide

## ⚠️ Registration Requires MongoDB

The registration feature requires MongoDB to be running. Here's how to set it up:

---

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows:

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server for Windows
   - Run the installer

2. **Start MongoDB**
   ```bash
   # Open Command Prompt or PowerShell as Administrator
   mongod
   ```

3. **Verify it's running**
   - You should see: `Waiting for connections on port 27017`

4. **Update .env.local** (already configured)
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   ```

5. **Try registration again**
   - Go to: http://localhost:3001/auth/register
   - Fill the form and submit

---

## Option 2: Use MongoDB Atlas (Cloud - Free Tier)

### Steps:

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a region close to you
   - Click "Create"

3. **Setup Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Save credentials!

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Confirm

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`

6. **Update .env.local**
   ```env
   MONGODB_URI=mongodb+srv://username:yourpassword@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
   - Replace `username` with your database username
   - Replace `yourpassword` with your database password

7. **Restart the server**
   ```bash
   # Stop the current server (Ctrl+C)
   # Start again
   npm run dev
   ```

8. **Try registration**
   - Go to: http://localhost:3001/auth/register

---

## Option 3: Quick Test Without MongoDB

If you just want to test the UI without database:

### Temporary Solution:
The app will work for browsing, but registration/login won't work until MongoDB is set up.

**What works without MongoDB:**
- ✅ Homepage
- ✅ Products page (sample data)
- ✅ Product details
- ✅ Categories
- ✅ Cart (uses localStorage)
- ✅ Checkout UI
- ✅ Wishlist UI

**What needs MongoDB:**
- ❌ User registration
- ❌ User login
- ❌ Saving orders
- ❌ Creating products (sellers)
- ❌ Admin features

---

## Verify MongoDB Connection

### Test Connection:

1. **Check if MongoDB is running:**
   ```bash
   # For local MongoDB
   mongo
   # or
   mongosh
   ```

2. **Check server logs:**
   - Look for "MongoDB connected" message
   - Or check for connection errors

3. **Try registration:**
   - Go to: http://localhost:3001/auth/register
   - Fill the form
   - If MongoDB is connected, you'll see success message
   - If not, you'll see "Database connection failed"

---

## Common Issues

### Issue 1: "MongoDB connection failed"
**Solution**: Make sure MongoDB is running
```bash
mongod
```

### Issue 2: "Connection refused"
**Solution**: Check if MongoDB is on port 27017
```bash
netstat -an | findstr 27017
```

### Issue 3: "Authentication failed" (Atlas)
**Solution**: 
- Check username/password in connection string
- Make sure IP is whitelisted in Atlas

### Issue 4: Server won't start
**Solution**: Restart the development server
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## Quick Start Commands

### Local MongoDB:
```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Next.js
cd ecommerce-nextjs-js
npm run dev
```

### With MongoDB Atlas:
```bash
# Just start Next.js (MongoDB is in cloud)
cd ecommerce-nextjs-js
npm run dev
```

---

## Need Help?

1. **MongoDB Documentation**: https://docs.mongodb.com/
2. **MongoDB Atlas Guide**: https://docs.atlas.mongodb.com/
3. **Next.js + MongoDB**: https://nextjs.org/learn/dashboard-app/setting-up-your-database

---

## ✅ Once MongoDB is Running:

1. Registration will work
2. Login will work
3. Orders will be saved
4. All database features will be available

**Test registration at: http://localhost:3001/auth/register**
