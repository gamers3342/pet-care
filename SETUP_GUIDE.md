# Pets & Care Hub - Complete Setup & Verification Guide

## ✅ Phase 1: Environment Setup

### Step 1: Verify `.env.local` file
Confirm file exists at project root with these values:
```
VITE_SUPABASE_URL=https://hqtwkyvoiwguuukgyrhx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxdHdreXZvaXdndXV1a2d5cmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDQ5MTcsImV4cCI6MjA4NTgyMDkxN30.DXLbjwXpWzt47Iupgz8nlq7IHqFWaAvPadZlzOTMzKc
VITE_USE_MOCK_BACKEND=false
```

### Step 2: Apply Database Schema
Run the SQL schema in Supabase Studio:
1. Open https://app.supabase.com → Select your project
2. Go to SQL Editor
3. Copy & paste contents of `supabase-schema.sql`
4. Click Execute
5. Verify all tables created: `app_user`, `clinic`, `pets`, `appointment`, `orders`, `community_post`, `service`, `admin`

### Step 3: Install Dependencies
```powershell
npm install
```

### Step 4: Start Development Server
```powershell
npm run dev
```
Visit http://localhost:5173 (or port shown in terminal)

---

## ✅ Phase 2: Feature Testing Checklist

### 1. **User Registration & Authentication**
- [ ] Click "Login/Register" on home
- [ ] Enter email (e.g., `user1@test.com`) and name
- [ ] Request OTP (check browser console for OTP code if EmailJS not configured)
- [ ] Enter OTP in the verification form
- [ ] Should redirect to home with "Welcome back" message
- [ ] Check **Admin Dashboard → Users tab** → New user should appear in list
- [ ] Verify in Supabase: `app_user` table should have new row

### 2. **Clinic Discovery & Booking**
- [ ] Click "Find Clinics" in navbar or home CTA
- [ ] See list of clinics (should show "Sneh Pet Hospital" and others)
- [ ] Filter by area (e.g., "Thaltej")
- [ ] Click clinic card and see details (ratings, hours, specialties)
- [ ] Click "Book Appointment" button
- [ ] Fill form: Pet Name, Pet Age, Appointment Date, Reason
- [ ] Submit booking
- [ ] Should see confirmation message with appointment ID
- [ ] Check **Admin Dashboard → Appointments tab** → New appointment should appear
- [ ] Verify in Supabase: `appointment` table should have new row

### 3. **Pet Health Records**
- [ ] After booking, go to Dashboard (click user profile or menu)
- [ ] Should see "My Health Records" section
- [ ] Should display pets created during bookings
- [ ] Verify in Supabase: `pets` table has pet records linked to user

### 4. **Shop & Cart**
- [ ] Click "Shop" in navbar
- [ ] See product listings
- [ ] Click "Add to Cart" on a product
- [ ] Click "View Cart"
- [ ] See items with quantity and total price
- [ ] Click "Checkout"
- [ ] Confirm order
- [ ] Should see order confirmation
- [ ] Check **Admin Dashboard → Orders tab** → New order should appear
- [ ] Verify in Supabase: `orders` table has new row

### 5. **Community Forum**
- [ ] Click "Community" in navbar
- [ ] See incident reports and posts
- [ ] Click "Report Incident" or "General Post"
- [ ] Fill form (title, description, location, etc.)
- [ ] Submit
- [ ] Should see post appear in list
- [ ] Check **Admin Dashboard → Community Posts tab** → New post should appear
- [ ] Admin can update status (open → resolved)

### 6. **Admin Dashboard**
- [ ] Go to `/admin/login`
- [ ] Login: Email = `admin@123`, Password = `admin123`
- [ ] See dashboard with stats (Total Users, Appointments, Orders, etc.)
- [ ] Navigate through all tabs:
  - [ ] **Dashboard** — Overview stats
  - [ ] **Users** — All registered users (click Refresh to reload)
  - [ ] **Appointments** — All bookings (can update status)
  - [ ] **Pets** — All pet records
  - [ ] **Clinics** — All clinics (can seed new ones)
  - [ ] **Community Posts** — All posts (can update status or delete)
- [ ] Click "Logout" and verify redirect to login

### 7. **Footer Links**
- [ ] Scroll to footer
- [ ] Quick Links section: Click each link (Home, About, Services, Shop, Find Clinics, Events, Contact)
- [ ] Each should navigate to correct page
- [ ] Services section: Click "Pet Insurance" → Should open HDFC ERGO in new tab
- [ ] Other service links should navigate correctly

### 8. **Contact Form**
- [ ] Click "Contact" in navbar or footer
- [ ] Fill contact form (name, email, message)
- [ ] Submit
- [ ] Should see success message

### 9. **Responsive Design**
- [ ] Test on desktop (full width)
- [ ] Test on tablet (medium width)
- [ ] Test on mobile (small width)
- [ ] All navigation and buttons should work on all sizes

### 10. **Error Handling**
- [ ] Try registering with existing email → Should show error
- [ ] Try invalid OTP → Should show error
- [ ] Try booking without login → Should prompt login
- [ ] Try accessing admin without login → Should redirect to login

---

## ✅ Phase 3: Data Flow Verification

### User Registration Data Flow
```
1. User enters email/name in UI
2. Frontend calls authService.sendOTP()
3. OTP sent via EmailJS (or logged in dev)
4. User enters OTP
5. Frontend calls authService.verifyOTP()
6. User saved to localStorage
7. upsertAppUser() called → User synced to Supabase app_user table
8. Admin Dashboard refreshes → User appears in Users tab
✅ Complete when: User appears in Admin → Users tab after registration
```

### Booking Data Flow
```
1. User clicks Book Appointment
2. Frontend calls bookingService.bookAppointment()
3. Service ensures user exists in app_user (creates if missing)
4. Service creates pet record in pets table (if new)
5. Service creates clinic record if needed
6. Service inserts appointment in appointment table
7. Confirmation shown to user
8. Admin Dashboard → Appointments tab shows new booking
✅ Complete when: Appointment appears in Admin → Appointments tab
```

### Order Data Flow
```
1. User adds items to cart (CartContext)
2. User clicks Checkout
3. Frontend calls orderService.createPaidOrder()
4. Service finds or creates user in app_user
5. Service inserts row in orders table
6. Order confirmation shown
7. Admin Dashboard → Orders tab shows new order
✅ Complete when: Order appears in Admin → Orders tab
```

---

## ✅ Phase 4: Troubleshooting

### Issue: Users don't show in Admin Dashboard
**Solution:**
1. Check browser console (F12) for errors
2. Verify `.env.local` has correct Supabase URL and anon key
3. Check Supabase Studio → RLS policies on `app_user` table
4. Click "Refresh" button in Admin Users tab
5. Check Supabase Table Editor → `app_user` table has rows

### Issue: Bookings don't save
**Solution:**
1. Check browser console for Supabase errors
2. Verify `appointment` table exists in Supabase
3. Ensure user is logged in before booking
4. Check if clinic and pet tables have data

### Issue: Orders not appearing
**Solution:**
1. Verify `orders` table exists in Supabase
2. Check CartContext is storing items
3. Verify user is logged in during checkout
4. Check Supabase logs for insert errors

### Issue: EmailJS OTP not sending
**Solution:**
1. If you have EmailJS configured, check credentials in `.env.local`
2. In development, OTP is logged to browser console
3. Use the console-logged OTP for testing

---

## ✅ Phase 5: Production Checklist

Before deploying:
- [ ] Remove all `console.log()` statements (optional, kept for debugging)
- [ ] Set `VITE_USE_MOCK_BACKEND=false` (use real backend API)
- [ ] Configure EmailJS for real email delivery
- [ ] Set up Supabase RLS policies (currently permissive for dev)
- [ ] Enable HTTPS on hosting
- [ ] Set up custom domain
- [ ] Test all forms on production URL
- [ ] Set up error monitoring (Sentry, etc.)

---

## ✅ Features Summary

### User-Facing Features
✅ User Registration & Login (OTP)
✅ Clinic Discovery & Booking
✅ Pet Health Records Management
✅ Shop & Cart
✅ Order Management
✅ Community Forum (Incidents, Posts)
✅ Contact Form
✅ Responsive Design
✅ Pet Insurance External Link

### Admin Features
✅ Dashboard Overview
✅ User Management (view all registered users)
✅ Appointment Management (view, update status)
✅ Pet Records View
✅ Clinic Management (seed, view)
✅ Service Management (seed, view)
✅ Order Management (view)
✅ Community Post Management (view, update status, delete)

---

## Quick Commands

```powershell
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## Support

If you encounter any issues:
1. Check browser console (F12 → Console tab)
2. Check Supabase Studio for table data
3. Verify `.env.local` is configured
4. Restart dev server
5. Clear browser cache and localStorage

---

**Last Updated:** February 7, 2026
**Project:** Pets & Care Hub v1.0
