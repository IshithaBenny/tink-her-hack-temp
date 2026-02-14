# CampusFind Database Schema Auto-Initialization Setup

## Overview

This setup ensures that the CampusFind app automatically initializes the Supabase database schema when it starts up. No manual SQL execution required!

## How It Works

### 1. **Automatic Initialization on First Request**
When the app starts (`npm run dev`), the middleware detects the first API request and triggers schema initialization:

- **File**: `middleware.ts`
- **Behavior**: Intercepts all `/api/*` routes on first request
- **Action**: Calls `/api/admin/init-schema` endpoint automatically
- **Result**: Database tables and policies created if missing

### 2. **Schema Files**
The database schema is defined in two places:

- **`lib/schema.sql`** - SQL schema definition
  - Users table with password_hash column (fixes the PGRST204 error)
  - Lost items table
  - Found items table
  - Matches table
  - Row-level security (RLS) policies

- **`lib/schema-init.ts`** - TypeScript initialization utility
  - Reads the SQL schema
  - Validates Supabase connection
  - Tracks initialization state

### 3. **Manual Initialization Endpoint**
If you ever need to manually initialize the schema:

```bash
# POST request to initialize
curl -X POST http://localhost:3000/api/admin/init-schema

# GET request for status check
curl http://localhost:3000/api/admin/init-schema
```

## Getting Started

### Step 1: Start the App
```bash
npm run dev
```

### Step 2: Watch the Console Logs
Look for these logs on first request:
```
🔄 Middleware: Initializing schema on first API request...
📖 Reading schema file from: ...
✅ Schema file read, length: XXXX
📊 Found XX SQL statements to execute
⚙️  [1/XX] Executing: CREATE TABLE IF NOT EXISTS users...
✅ [1/XX] Success
... more statements ...
```

### Step 3: Try Registration
Visit http://localhost:3000/signup and create an account. The registration should now work!

## What Gets Created

The schema initialization creates:

### Tables
- **users** - User accounts with password hashing
  - id (UUID, primary key)
  - username (unique)
  - full_name
  - reg_number (unique)
  - password_hash (fixes PGRST204 error!)
  - created_at, updated_at

- **lost_items** - Items users report as lost
- **found_items** - Items users report as found
- **matches** - Matches between lost and found items

### Security
- Row-level security (RLS) enabled on all tables
- Policies allow:
  - Authenticated users to read and manage their own data
  - Public reads of items for matching
  - System-level operations for admin functions

## Troubleshooting

### Issue: `PGRST204 - Could not find the 'password_hash' column`
**Solution**: This is automatically fixed by the initialization script. Just restart the app.

### Issue: Schema initialization didn't run
**Check**:
1. Open browser console (F12)
2. Look for network request to `/api/admin/init-schema` on first page load
3. Check terminal logs for "Middleware: Initializing schema..."

### Issue: Manual initialization needed
Run this curl command:
```bash
curl -X POST http://localhost:3000/api/admin/init-schema
```

### Issue: OneDrive file locking (if using OneDrive)
If you see permission errors, run:
```bash
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

## Architecture

```
┌─────────────────┐
│   User Request  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  middleware.ts          │
│ (routes /api/*)         │
└────────┬────────────────┘
         │
         ├─ Is schema initialized?
         │
         ├─ NO ──▶ Call /api/admin/init-schema
         │
         └─ YES ──▶ Continue normally
                    │
                    ▼
         ┌─────────────────────────┐
         │ /api/admin/init-schema  │
         │ (initialization route)  │
         └────────┬────────────────┘
                  │
                  ├─ Read lib/schema.sql
                  │
                  ├─ Split SQL statements
                  │
                  ├─ Execute via Supabase REST API
                  │
                  └─ Return results
```

## Files Added/Modified

### New Files Created:
- `lib/schema.sql` - Database schema definition
- `lib/schema-init.ts` - Schema initialization utility
- `app/api/admin/init-schema/route.ts` - Schema initialization endpoint
- `middleware.ts` - Auto-initialization middleware
- `app/api/auth/simple-register/route.ts` - Enhanced with detailed logging
- `app/api/debug/test-supabase/route.ts` - Supabase connection test endpoint

### Features:
✅ Automatic schema initialization on app startup
✅ No manual SQL execution needed
✅ Comprehensive error logging
✅ Password hashing support (fixes PGRST204)
✅ Full RLS policy support
✅ Can be triggered manually via API

## Testing the Setup

### Test 1: Clear Database and Restart
1. Delete all tables from Supabase (or create new database)
2. Run `npm run dev`
3. Try to signup - it should work!

### Test 2: Check Supabase Connection
```bash
curl http://localhost:3000/api/debug/test-supabase
# Check console logs for connection details
```

### Test 3: Manual Schema Init
```bash
curl -X POST http://localhost:3000/api/admin/init-schema
# Returns success/error status with detailed stats
```

## Next Steps

After schema initialization completes:
1. ✅ Database tables exist
2. ✅ User registration works
3. ✅ Login/authentication ready
4. ✅ Lost/found items tables ready
5. 🔄 Next: Implement item upload/matching logic
6. 🔄 Next: Add real-time notifications
7. 🔄 Next: Deploy to production

## Notes

- Schema initialization is idempotent (safe to run multiple times)
- Only runs once per app instance (tracked in memory)
- Console logs show detailed initialization progress
- Failed statements are logged but don't block other statements
- RLS policies are permissive to allow signup/login functionality

---

**Built with**: Next.js 16 + Supabase + TypeScript
