# RLS Policy Fix for User Registration

## Issue
When users try to sign up, they get: `new row violates row-level security policy for table "users"`

This happens because the `users` table didn't have an INSERT policy for new users.

## Solution

### Step 1: Update Your Supabase Database

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** → **New query**
4. Run this SQL to add the missing INSERT policy:

```sql
-- Add INSERT policy for users table to allow sign-ups
CREATE POLICY "Users can create their own profile"
  ON users FOR INSERT WITH CHECK (auth.uid() = id);
```

### Step 2: Get Your Service Role Key (Optional but Recommended)

For a more secure server-side registration flow:

1. Go to **Settings** → **API**
2. Copy your **Service Role Key** (with full database access)
3. Add it to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gbrzpzegvagjtvvwuwbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_tZ_p4Z131QEG1b_5uccOMg_NLWG047s
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

**⚠️ WARNING**: Never expose the Service Role Key in your client code or GitHub. Only use in `.env.local` (server-side only).

### Step 3: Test Registration

1. Stop the dev server (Ctrl+C)
2. Run: `npm run dev`
3. Go to `/signup` and create an account
4. You should now be able to register without RLS errors

---

## How It Works

**Before (Broken):**
- User signs up → Auth user created ✓
- Try to insert profile → **RLS Policy blocks it ✗**

**After (Fixed):**
- User signs up → Auth user created ✓
- Server-side API creates profile with proper permissions ✓
- User profile stored in database ✓

---

## Files Updated

- `SUPABASE_SCHEMA.sql` - Added INSERT policy
- `app/api/auth/register/route.ts` - Server-side registration API
- `app/signup/page.tsx` - Uses new API instead of client-side signup

---

## Troubleshooting

### Still getting RLS errors?
1. Run the SQL policy above in Supabase SQL Editor
2. Wait 30 seconds for changes to propagate
3. Clear browser cache and try again

### Service Role Key not working?
1. Verify it's in `.env.local` (not `.env.local.example`)
2. Restart dev server after adding the key
3. Check key is copied completely without spaces

### Can't find Service Role Key?
- Go to Supabase dashboard → Project → Settings → API
- It's under "Service Role Key" (different from Anon Key)
