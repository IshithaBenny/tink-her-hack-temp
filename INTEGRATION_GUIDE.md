# CampusFind - API Integration & Database Setup

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://gbrzpzegvagjtvvwuwbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_tZ_p4Z131QEG1b_5uccOMg_NLWG047s

# Gemini AI Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Set Up Database Schema

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **SQL Editor** → Click **New query**
4. Open and copy the contents of `SUPABASE_SCHEMA.sql` file in this project
5. Paste into the SQL editor and click **Run**

This will create:
- `users` table (for user profiles)
- `lost_items` table (for lost item reports)
- `found_items` table (for found item reports)
- `matches` table (for matching records)
- Row-level security (RLS) policies

### 4. Enable Authentication

In Supabase Dashboard:
1. Go to **Authentication** → **Providers**
2. Enable **Email/Password** provider
3. (Optional) Configure email templates in **Email Templates**

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Project Structure

```
app/
├── api/
│   └── chat/
│       └── route.ts          # Gemini chatbot API
├── components/
│   └── Chatbot.tsx           # Q&A chatbot UI
├── login/
│   └── page.tsx              # Login page (uses Supabase auth)
├── report-lost/
│   └── page.tsx              # Report lost item form
├── report-found/
│   └── page.tsx              # Report found item form
└── layout.tsx                # Root layout with Chatbot

lib/
├── supabase.ts               # Supabase client initialization
└── db.ts                     # Database helper functions

SUPABASE_SCHEMA.sql           # Database schema (run in Supabase)
```

---

## Available Database Functions

### Authentication

```typescript
import { loginUser, registerUser, logoutUser, getCurrentUser } from '@/lib/db';

// Login
const { session, success } = await loginUser('user@college.edu', 'password');

// Logout
await logoutUser();

// Get current user
const { user, success } = await getCurrentUser();
```

### Lost Items

```typescript
import { createLostItem, getLostItems } from '@/lib/db';

// Create lost item report
await createLostItem(
  userId,
  'iPhone 13',
  'Lost near library',
  'Electronics',
  'Library',
  'What color is it?',
  'Blue',
  imageUrl
);

// Get all lost items
const { items } = await getLostItems();
```

### Found Items

```typescript
import { createFoundItem, getFoundItems } from '@/lib/db';

// Create found item report
await createFoundItem(
  userId,
  'Blue iPhone',
  'Found at main gate',
  'Electronics',
  'Main Gate',
  'Contact: 555-1234'
);

// Get all found items
const { items } = await getFoundItems();
```

### Matches

```typescript
import { getMatches, createMatch } from '@/lib/db';

// Get matches for a lost item
const { matches } = await getMatches(lostItemId);

// Create a match
await createMatch(lostItemId, foundItemId, confidenceScore);
```

---

## Features

✅ **Supabase Authentication** - Email/password login
✅ **Database** - Lost items, found items, user profiles, matches
✅ **Gemini Chatbot** - Q&A assistant on every page
✅ **Row-Level Security** - Data access controlled by user
✅ **Real-time Updates** - Subscribe to data changes (optional)

---

## Important Notes

- The **Publishable Key** is used for client-side operations
- For secure server operations, store the **Service Role Key** in `.env` (not `.env.local`)
- All user data is protected by Row-Level Security policies
- Users can only see/edit their own lost and found items

---

## Troubleshooting

### "Failed to authenticate user"
- Check email is valid with `.edu` domain
- Verify password is at least 6 characters
- Ensure database tables are created

### "Cannot connect to Supabase"
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Ensure `.env.local` file exists

### "Missing permissions"
- Verify RLS policies in Supabase dashboard
- Check user is authenticated
- Ensure tables have correct policies

---

## Next Steps

1. Create signup page using `registerUser()` from `lib/db`
2. Add image upload functionality to report pages
3. Implement real-time match notifications
4. Add user profile page
