# Fix: Email Rate Limit Exceeded

## Problem
When trying to sign up, you get: `email rate limit exceeded`

This happens because Supabase limits confirmation emails (usually 1 per hour per email address) to prevent abuse.

## Solution: Disable Email Confirmation (Development)

### Step 1: Go to Supabase Settings

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Click **Email**

### Step 2: Disable Email Confirmation

Look for these settings and toggle them OFF:

- ✅ **Confirm email** → Turn OFF
- ✅ **Secure email change** → Turn OFF (optional)

### Step 3: Test Again

1. Stop dev server (Ctrl+C)
2. Run: `npm run dev`
3. Try signing up with a new email
4. Should work immediately without rate limit!

---

## Alternative Solutions

### If you want email confirmation for production:

**Option A: Use different test emails**
- Test 1: `test1@college.edu`
- Test 2: `test2@college.edu`
- Wait 1 hour between sign-ups with same email

**Option B: Use Supabase test mode**
- Go to **Authentication** → **Settings**
- Enable **Disable Captcha** (for testing)

**Option C: Update rate limits**
- Go to **Authentication** → **Settings**
- Look for rate limiting options (if available in your plan)

---

## Environment-Specific Setup

For production vs development, you might want different settings:

### Development (.env.local):
```env
NEXT_PUBLIC_SUPABASE_URL=https://gbrzpzegvagjtvvwuwbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_tZ_p4Z131QEG1b_5uccOMg_NLWG047s
SUPABASE_SERVICE_ROLE_KEY=your_key
NEXT_PUBLIC_GEMINI_API_KEY=key
# Email confirmation disabled in Supabase settings
```

### Production:
- Enable email confirmation
- Keep rate limits enabled
- Use custom email templates

---

## Quick Checklist

- [ ] Go to Supabase Dashboard
- [ ] Navigate to Authentication → Providers → Email
- [ ] Toggle "Confirm email" OFF
- [ ] Save changes
- [ ] Restart dev server
- [ ] Try signing up again
