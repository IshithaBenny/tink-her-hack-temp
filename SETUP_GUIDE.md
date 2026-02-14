# CampusFind Database Setup Guide

## Quick Start: One-Time Schema Setup

Your CampusFind app is ready to run, but the Supabase database schema needs to be set up **once**. This is a one-time process that takes 2 minutes.

### Option 1: Supabase Dashboard (Easiest) ⭐

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Sign in with your Supabase account

2. **Select Your Project**
   - Project name: `gbrzpzegvagjtvvwuwbv`
   - Or find it in your project list

3. **Open SQL Editor**
   - In the left sidebar, click **"SQL Editor"**
   - Click **"New Query"** button

4. **Copy and Paste Schema SQL**
   - Copy the entire contents of: `lib/schema.sql`
   - Paste into the SQL Editor

5. **Execute the Schema**
   - Click the **"Run"** button (or press Ctrl+Enter)
   - Wait for the query to complete
   - You should see ✅ success indicators

6. **Verify Success**
   - Look for the following tables in **"Table Editor"**:
     - `users`
     - `lost_items`
     - `found_items`
     - `matches`

### Option 2: Supabase CLI (For developers)

If you have the Supabase CLI installed:

```bash
# Install Supabase CLI if you don't have it
npm install -g supabase

# Link your project (one-time)
supabase link --project-ref gbrzpzegvagjtvvwuwbv

# Push schema to database
supabase db push
```

### Option 3: cURL/API (Advanced)

If you have a Supabase **service role token** (not your anon key), you can use:

```bash
curl -X POST https://gbrzpzegvagjtvvwuwbv.supabase.co/rest/v1/rpc/exec_sql \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"sql":"<SQL_HERE>"}'
```

**Note:** You need a **service role key** (not anon key) for this to work.

---

## What Gets Created

When you run the schema SQL, it creates:

### Database Tables

| Table | Purpose |
|-------|---------|
| `users` | User accounts with password hashing |
| `lost_items` | Items reported as lost |
| `found_items` | Items reported as found |
| `matches` | Matching pairs between lost/found |

### User Table Structure

```
id              → UUID (unique identifier)
username        → Unique username
full_name       → User's full name
reg_number      → Student registration number (unique)
password_hash   → Hashed password (bcryptjs)
created_at      → Timestamp of account creation
updated_at      → Last update timestamp
```

### Security Features

- **Row-level security (RLS)** enabled on all tables
- **Password hashing** using bcryptjs (10 salt rounds)
- **Unique constraints** on username and reg_number
- **Policies** for user authentication and data access

---

## Verify Setup is Working

### Step 1: Start the App

```bash
npm run dev
```

Server should start at `http://localhost:3000`

### Step 2: Check Schema Endpoint

Open in your browser:
```
http://localhost:3000/api/admin/init-schema
```

Expected response:
```json
{
  "success": true,
  "schemaExists": true,
  "message": "Schema is properly configured",
  "tables": {
    "users": "OK",
    "lost_items": "OK",
    "found_items": "OK",
    "matches": "OK"
  }
}
```

### Step 3: Test Registration

1. Visit: http://localhost:3000/signup
2. Fill in the form:
   - Username: `testuser1`
   - Registration Number: `REG123456`
   - Full Name: `Test User`
   - Password: `password123`

3. Click **"Sign Up"**

4. If successful, you'll see a confirmation message

### Step 4: Test Login

1. Visit: http://localhost:3000/login
2. Enter:
   - Username: `testuser1`
   - Password: `password123`
3. Click **"Login"**

---

## Troubleshooting

### Issue: "Could not find the 'password_hash' column"

**Cause:** Schema hasn't been set up yet

**Fix:**
- Follow Option 1 (Supabase Dashboard) above
- Verify all SQL statements executed successfully
- Refresh the app and try again

### Issue: Schema verification shows "MISSING" tables

**Cause:** Only some tables were created

**Fix:**
- Check the SQL Editor for error messages
- Scroll through the SQL and look for lines that failed
- Delete partially created tables and re-run the full schema

### Issue: Cannot connect to Supabase

**Cause:** Environment variables not set correctly

**Fix:**
- Check `.env.local` contains:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://gbrzpzegvagjtvvwuwbv.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_tZ_p4Z131QEG1b_5uccOMg_NLWG047s
  ```
- If missing, add them and restart the dev server

### Issue: "Operation not permitted" during build

**Cause:** File lock on Windows (OneDrive)

**Fix:**
```bash
# Kill any running Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clean build cache
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force .turbo

# Rebuild
npm run build
```

---

## Files Reference

### Important Files

| File | Purpose |
|------|---------|
| `lib/schema.sql` | Database schema definition (copy paste this) |
| `app/api/admin/init-schema/route.ts` | Schema verification endpoint |
| `app/api/auth/simple-register/route.ts` | User registration API |
| `app/api/auth/simple-login/route.ts` | User login API |
| `app/signup/page.tsx` | Signup form UI |
| `app/login/page.tsx` | Login form UI |
| `.env.local` | Supabase credentials (never commit!) |

### Database Helpers

| File | Purpose |
|------|---------|
| `lib/supabase.ts` | Supabase client initialization |
| `app/api/debug/test-supabase/route.ts` | Test Supabase connection |

---

## Next Steps

After setup is complete:

1. ✅ **User Registration** - Users can create accounts
2. ✅ **User Authentication** - Users can login with credentials
3. 🔄 **Lost Items** - Implement lost item form and upload (in progress)
4. 🔄 **Found Items** - Implement found item form and upload (in progress)
5. 🔄 **AI Matching** - Use Chatbot for item matching suggestions
6. 🔄 **Notifications** - Send alerts when matches found
7. 🔄 **Deployment** - Deploy to production

---

## Support

### API Endpoints Available

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/init-schema` | GET/POST | Verify schema is set up |
| `/api/auth/simple-register` | POST | Register new user |
| `/api/auth/simple-login` | POST | Login user |
| `/api/debug/test-supabase` | POST | Test Supabase connection |
| `/api/chat` | POST | Chatbot Q&A |

### Quick Test Curl Commands

```bash
# Check schema
curl http://localhost:3000/api/admin/init-schema

# Test Supabase
curl -X POST http://localhost:3000/api/debug/test-supabase

# Register user (example)
curl -X POST http://localhost:3000/api/auth/simple-register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "regNumber": "REG123",
    "fullName": "Test User",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login user (example)
curl -X POST http://localhost:3000/api/auth/simple-login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

---

## Architecture Overview

```
CampusFind App
│
├── Frontend (Next.js/React)
│   ├── /signup - Registration form
│   ├── /login - Login form
│   ├── / - Home page
│   └── /report-lost, /report-found - Item forms
│
├── API Routes (/api)
│   ├── /auth/simple-register - Create user
│   ├── /auth/simple-login - Authenticate user
│   ├── /admin/init-schema - Verify schema
│   ├── /debug/test-supabase - Test connection
│   └── /chat - Chatbot endpoint
│
└── Database (Supabase PostgreSQL)
    ├── users - User accounts
    ├── lost_items - Lost items
    ├── found_items - Found items
    └── matches - Item matches
```

---

**Built with:** Next.js 16 + React 19 + Supabase PostgreSQL + TypeScript 5

Last updated: February 2026
