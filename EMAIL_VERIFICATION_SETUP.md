# 📧 Email Verification Setup Guide

## ✅ What's Been Implemented

### 1. Email Verification System
- ✅ User model updated with verification fields
- ✅ Email utility for sending emails
- ✅ Registration sends verification email
- ✅ Verification API endpoint
- ✅ Verification page UI

---

## 🚀 Quick Setup

### Option 1: Development (Console Logging)

**No setup required!** Emails will be logged to console.

1. Register a new user
2. Check the terminal/console for the verification link
3. Copy the link and open it in your browser

### Option 2: Production (Real Emails with Gmail)

1. **Enable 2-Factor Authentication on Gmail**
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update .env.local**
```env
# Email Configuration
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
```

4. **Restart Server**
```bash
npm run dev
```

---

## 📝 How It Works

### Registration Flow:

1. **User Registers** → `/auth/register`
   - User fills registration form
   - Submits email, name, password

2. **Server Creates User** → `/api/auth/register`
   - Validates input
   - Creates user with `isEmailVerified: false`
   - Generates verification token (expires in 24 hours)
   - Sends verification email

3. **User Receives Email**
   - Email contains verification link
   - Link format: `http://localhost:3001/auth/verify-email?token=...`

4. **User Clicks Link** → `/auth/verify-email`
   - Page calls `/api/auth/verify-email?token=...`
   - Server verifies token
   - Updates `isEmailVerified: true`
   - Redirects to sign in

5. **User Can Sign In**
   - Email is now verified
   - User can access all features

---

## 🔧 Configuration Options

### Gmail (Recommended for Testing)
```env
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### SendGrid (Recommended for Production)
```env
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com
```

### Mailgun
```env
EMAIL_SERVER_HOST=smtp.mailgun.org
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=postmaster@your-domain.mailgun.org
EMAIL_SERVER_PASSWORD=your-mailgun-password
EMAIL_FROM=noreply@yourdomain.com
```

### AWS SES
```env
EMAIL_SERVER_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-aws-access-key
EMAIL_SERVER_PASSWORD=your-aws-secret-key
EMAIL_FROM=noreply@yourdomain.com
```

---

## 🧪 Testing

### Test in Development:

1. **Start Server**
```bash
npm run dev
```

2. **Register New User**
   - Go to http://localhost:3001/auth/register
   - Fill the form
   - Submit

3. **Check Console**
   - Look for "📧 Email would be sent:"
   - Copy the verification URL
   - Example: `http://localhost:3001/auth/verify-email?token=abc123...`

4. **Verify Email**
   - Paste URL in browser
   - Should see "Email Verified!" message
   - Auto-redirects to sign in

5. **Sign In**
   - Use your credentials
   - Should work now!

---

## 📧 Email Templates

### Verification Email
- **Subject:** "Verify Your Email - E-Commerce Platform"
- **Content:** Welcome message + verification button
- **Expiry:** 24 hours

### Password Reset Email
- **Subject:** "Reset Your Password - E-Commerce Platform"
- **Content:** Reset instructions + reset button
- **Expiry:** 1 hour

### Order Confirmation Email
- **Subject:** "Order Confirmation #12345 - E-Commerce Platform"
- **Content:** Order details + tracking info

---

## 🔒 Security Features

### Token Security:
- ✅ Cryptographically secure random tokens
- ✅ 24-hour expiration
- ✅ One-time use (deleted after verification)
- ✅ Stored hashed in database

### Email Security:
- ✅ TLS/SSL encryption
- ✅ No sensitive data in emails
- ✅ Verification links expire
- ✅ Rate limiting (recommended)

---

## 🐛 Troubleshooting

### Issue: "Failed to send verification email"

**Solution 1: Check Gmail App Password**
```bash
# Make sure you're using App Password, not regular password
# App Password format: xxxx xxxx xxxx xxxx (16 characters)
```

**Solution 2: Check .env.local**
```bash
# Verify all email variables are set
cat .env.local | grep EMAIL
```

**Solution 3: Test SMTP Connection**
```javascript
// Add this to test email sending
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Error:', error);
  } else {
    console.log('✅ SMTP Ready');
  }
});
```

### Issue: "Verification token expired"

**Solution:**
- Token expires after 24 hours
- User needs to register again
- Or implement "Resend Verification Email" feature

### Issue: "Email not received"

**Check:**
1. Spam/Junk folder
2. Email address is correct
3. SMTP credentials are valid
4. Check server logs for errors

---

## 📦 Required Packages

Already installed in your project:
```json
{
  "nodemailer": "^6.9.0"
}
```

If not installed:
```bash
npm install nodemailer
```

---

## 🎯 Next Steps

### Optional Enhancements:

1. **Resend Verification Email**
   - Add button on sign-in page
   - Generate new token
   - Send new email

2. **Email Verification Reminder**
   - Send reminder after 24 hours
   - If user hasn't verified

3. **Rate Limiting**
   - Limit verification emails per user
   - Prevent spam

4. **Email Templates**
   - Use HTML email templates
   - Add company branding
   - Responsive design

---

## 📚 Files Created/Modified

### New Files:
- ✅ `lib/email.js` - Email utility functions
- ✅ `app/api/auth/verify-email/route.js` - Verification API
- ✅ `app/auth/verify-email/page.js` - Verification page

### Modified Files:
- ✅ `models/User.js` - Added verification fields
- ✅ `app/api/auth/register/route.js` - Sends verification email

---

## ✅ Verification Checklist

- [ ] Email configuration in `.env.local`
- [ ] Server restarted after config
- [ ] Registration creates user
- [ ] Verification email sent (check console or inbox)
- [ ] Verification link works
- [ ] User can sign in after verification
- [ ] Expired tokens are rejected

---

**Email verification is now set up! 🎉**

For payment integration, see `PAYMENT_INTEGRATION_GUIDE.md`
