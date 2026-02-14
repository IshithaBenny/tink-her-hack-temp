# Simple Auth Implementation - Setup Guide

## What Changed

Removed Supabase email-based authentication and implemented a simple **username/password** authentication system with:
- ✅ Username-based signup and login
- ✅ Bcryptjs password hashing  
- ✅ Local database storage (no Supabase Auth)
- ✅ Session management via localStorage

---

## Database Setup

### Run this SQL in Supabase:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. **SQL Editor** → **New query**
3. Copy-paste from [`SUPABASE_SCHEMA.sql`](SUPABASE_SCHEMA.sql)
4. Click **Run**

**Key changes in schema:**
- `users` table: `id` (UUID), `username` (unique), `reg_number` (unique), `password_hash`, `full_name`
- No email field required
- RLS policies simplified for local auth

---

## Test the App

### 1. Install dependencies:
```bash
npm install
```

### 2. Run dev server:
```bash
npm run dev
```

### 3. Visit:
- **Sign Up:** `http://localhost:3000/signup`
- **Login:** `http://localhost:3000/login`

### 4. Test account:
```
Username: testuser
Password: password123456
Reg Number: REG001
Full Name: Test User
```

---

## How It Works

### Signup Flow:
1. User enters: username, full name, registration number, password
2. Form validates locally
3. API `/api/auth/simple-register`:
   - Hashes password using bcryptjs
   - Stores user in database
   - Returns success/error

### Login Flow:
1. User enters: username, password
2. Form submits to `/api/auth/simple-login`
3. API:
   - Looks up user by username
   - Compares password with hash using bcrypt.compare()
   - Stores user session in localStorage
   - Redirects to next page

---

## API Endpoints

### POST `/api/auth/simple-register`
```json
{
  "username": "john_doe123",
  "fullName": "John Doe",
  "regNumber": "REG001",
  "password": "password123456",
  "confirmPassword": "password123456"
}
```

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "username": "john_doe123",
    "full_name": "John Doe",
    "reg_number": "REG001"
  }
}
```

### POST `/api/auth/simple-login`
```json
{
  "username": "john_doe123",
  "password": "password123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "username": "john_doe123",
    "full_name": "John Doe",
    "reg_number": "REG001"
  }
}
```

---

## Files Changed

### Created:
- `app/api/auth/simple-register/route.ts` - Registration endpoint with bcrypt
- `app/api/auth/simple-login/route.ts` - Login endpoint with password verification

### Updated:
- `app/signup/page.tsx` - Changed from email to username signup
- `app/login/page.tsx` - Changed to username/password login
- `SUPABASE_SCHEMA.sql` - Updated users table schema
- `package.json` - Added bcryptjs and @types/bcryptjs

### Removed:
- Email-based Supabase auth flows
- Email validation logic

---

## Security Notes

✅ **Passwords are hashed** using bcryptjs (10 salt rounds)  
✅ **No plain-text passwords** stored in database  
✅ **Username must be unique**  
✅ **Registration number must be unique**  

⚠️ For production, add:
- Rate limiting on signup/login
- CSRF protection
- Secure session cookies (HTTPOnly)
- Email verification (optional)
- Password reset functionality

---

## Troubleshooting

### "Username already taken"
- Choose a different username (3+ characters)

### "Invalid username or password"
- Double-check both username AND password
- Ensure account exists

### Build error: "Could not find declaration file for bcryptjs"
- Run: `npm install --save-dev @types/bcryptjs`
- Already done in setup!

---

## Next Steps

1. ✅ Test signup and login
2. ✅ Verify user data stored in Supabase
3. Add password reset functionality
4. Add user profile page
5. Implement admin dashboard
