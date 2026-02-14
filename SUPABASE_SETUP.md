# Supabase Integration Setup Guide

## 1. Create `.env.local` file with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gbrzpzegvagjtvvwuwbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_tZ_p4Z131QEG1b_5uccOMg_NLWG047s
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
```

## 2. Set up Supabase Database Schema

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **SQL Editor** → **New query**
4. Copy and paste the contents of `SUPABASE_SCHEMA.sql`
5. Run the query to create all tables and policies

Or use the SQL editor directly:
- Copy the SQL from `SUPABASE_SCHEMA.sql`
- Paste into SQL Editor in Supabase dashboard
- Click **Run**

## 3. Enable Authentication Methods

1. Go to **Authentication** → **Providers**
2. Enable **Email/Password** auth
3. Go to **Email Templates** and customize if needed

## 4. Install Dependencies

```bash
npm install
```

## 5. Run Development Server

```bash
npm run dev
```

## Database Tables Created

- **users**: Stores user profiles (email, registration number, full name)
- **lost_items**: Reports of lost items with security questions
- **found_items**: Reports of found items with contact info
- **matches**: Stores potential matches between lost and found items

## Helper Functions Available

Import from `lib/db.ts`:

### Auth
- `registerUser(email, password, regNumber, fullName)`
- `loginUser(email, password)`
- `logoutUser()`
- `getCurrentUser()`

### Lost Items
- `createLostItem(...)`
- `getLostItems()`

### Found Items
- `createFoundItem(...)`
- `getFoundItems()`

### Matches
- `getMatches(lostItemId)`
- `createMatch(lostItemId, foundItemId, confidenceScore)`

## Usage Example

```typescript
import { loginUser, getLostItems } from '@/lib/db';

// Login user
const { session, success } = await loginUser(email, password);

// Get all lost items
const { items } = await getLostItems();
```
