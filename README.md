<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# CampusFind - Smart Campus Lost & Found System 🎯

## Basic Details

### Team Name: DuoLogic

### Team Members
- Ishitha Benny - Christ College of Engineering
- Janet Jiju - Christ College of Engineering

### Hosted Project Link
https://campusfindcce.vercel.app/

### Project Description
CampusFind is a web-based application designed to streamline the process of recovering lost items within a college campus. Unlike traditional lost-and-found systems that rely on physical notice boards or cluttered social media groups, CampusFind provides a centralized, searchable, and secure platform. The system enables quick item recovery with minimal human intervention and includes built-in security verification to prevent false claims.

### Problem Statement
College campuses are high-traffic environments where students frequently lose essentials like ID cards, electronics, and keys. Current solutions (WhatsApp/Telegram groups) suffer from:
- **Information Overload**: Posts get buried quickly, making items impossible to find
- **Lack of Privacy**: Personal contact info and item details are shared publicly
- **Inefficiency**: No automated way to match a "found" report with a "lost" inquiry
- **No verification**: Anyone can claim lost items

### The Solution
CampusFind provides a secure, intelligent platform that automates lost & found matching while protecting user privacy through security verification questions and encrypted data storage.


---

## Technical Details

### Technologies/Components Used

**Frontend:**
- **Language**: TypeScript, JavaScript
- **Framework**: Next.js 16.1.6
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4, PostCSS
- **Fonts**: Geist (Google Fonts)

**Backend:**
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: bcryptjs (password hashing)

**Database & Services:**
- **Database**: Supabase (PostgreSQL)
- **ORM**: Supabase JavaScript Client
- **AI Integration**: Google Generative AI (for chatbot assistance)

**Development Tools:**
- **Version Control**: Git
- **Code Editor**: VS Code
- **Linting**: ESLint
- **Package Manager**: npm/yarn

---

## Features

- **Report Lost Items**: Upload photos with security questions to verify ownership
- **Report Found Items**: Document found items with location details for easy recovery
- **Smart Search**: Browse and search through categorized lost and found reports
- **AI-Powered Chatbot**: Get intelligent assistance navigating the platform
- **Security Verification**: Ownership verification through custom security questions
- **User Authentication**: Secure signup and login system with encrypted passwords
- **Category Selection**: Organize items by category for better searchability
- **Responsive Design**: Fully mobile-responsive interface for on-campus access
- **Results Matching**: Find matching lost/found items efficiently

---

## Implementation

### For Software:

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account with configured PostgreSQL database
- Google Generative AI API key

#### Installation
```bash
# Clone the repository
git clone <repository-url>
cd tink-her-hack-temp

# Install dependencies
npm install
```

#### Environment Setup
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_API_KEY=your_google_generative_ai_key
```

#### Run
```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The application will be available at `http://localhost:3000`

---

## Project Structure

```
app/
├── api/                          # API routes
│   ├── admin/init-schema/       # Database schema initialization
│   ├── auth/                     # Authentication endpoints
│   │   ├── register/
│   │   ├── simple-login/
│   │   └── simple-register/
│   ├── chat/                     # AI chatbot endpoints
│   ├── debug/                    # Debug utilities
│   └── diagnostic/               # Schema status diagnostics
├── category-selection/           # Category selection page
├── components/                   # Reusable components
│   └── Chatbot.tsx              # AI-powered chatbot component
├── login/                        # Login page
├── report-found/                # Report found items page
├── report-lost/                 # Report lost items page
├── results/                      # Search results page
├── signup/                       # User signup page
├── layout.tsx                    # Root layout with chatbot
├── page.tsx                      # Homepage
└── globals.css                   # Global styles

lib/
├── db.ts                         # Database utilities
├── schema-init.ts                # Schema initialization logic
├── schema.sql                    # Database schema definition
└── supabase.ts                   # Supabase client configuration
```

## Database Schema

The application uses Supabase PostgreSQL. See [SUPABASE_SCHEMA.sql](SUPABASE_SCHEMA.sql) for the complete schema definition.

Key tables:
- **users**: User accounts with authentication
- **lost_items**: Reports of lost items with images and security verification
- **found_items**: Reports of found items with storage locations
- **categories**: Item categorization

For schema setup instructions, see [SCHEMA_AUTO_INIT.md](SCHEMA_AUTO_INIT.md)

---

## API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account
- **Request Body:**
```json
{
  "email": "student@campus.com",
  "password": "securepassword",
  "name": "Student Name"
}
```
- **Response:** `{ "user_id": "...", "token": "..." }`

#### POST `/api/auth/simple-login`
Login with email and password
- **Request Body:**
```json
{
  "email": "student@campus.com",
  "password": "securepassword"
}
```
- **Response:** `{ "session": "...", "user": {...} }`

### Item Management Endpoints

#### POST `/api/chat`
Get AI-powered assistance via chatbot
- **Request Body:**
```json
{
  "message": "I lost my ID card"
}
```
- **Response:** `{ "reply": "..." }`

#### GET `/api/diagnostic/schema-status`
Check database schema status
- **Response:** `{ "status": "ready" | "initializing" | "error", "message": "..." }`

---

## Additional Resources

- [Supabase Setup Guide](SUPABASE_SETUP.md) - Database configuration
- [Schema Initialization Guide](SCHEMA_AUTO_INIT.md) - Setting up database tables
- [Integration Guide](INTEGRATION_GUIDE.md) - Integrating with external services
- [Simple Auth Setup](SIMPLE_AUTH_SETUP.md) - Basic authentication setup
- [Email Rate Limit Fix](EMAIL_RATE_LIMIT_FIX.md) - Handling email service limits
- [RLS Fix Guide](RLS_FIX.md) - Row-level security configuration

---

## User Workflow

1. **Home Page**: User lands on CampusFind homepage
2. **Authentication**: Sign up or login to create an account
3. **Report Lost Item**: 
   - Upload item photo
   - Create security question
   - Select category
   - Submit report
4. **Report Found Item**: 
   - Upload item photo
   - Provide location details
   - Submit to help others
5. **Search Results**: Browse matching items and contact finders/losers
6. **AI Chatbot Support**: Get help navigating the platform 24/7

---

## Deployment

The application is deployed on [Vercel](https://vercel.com/) with automatic deployments from the main branch.

**Live URL:** https://campusfindcce.vercel.app/

### Environment Variables Required for Deployment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`
- `GOOGLE_API_KEY`

---

## Future Enhancements

- Advanced image recognition using OpenAI Vision API
- GPS-based item location tracking
- Mobile app (React Native)
- Push notifications for item matches
- Integration with campus facilities
- Item value estimation
- Reward system for finders

---

## License

[Add your license information here]

---

## Support & Contact

For support or questions, contact the development team at [your-email@campus.com]
1. Place LEDs on breadboard
2. Connect resistors in series with LEDs
3. Connect LED cathodes to GND
4. Connect LED anodes to Arduino digital pins (2-6)
![Step 3](images/assembly-step3.jpg)
*Caption: LED circuit assembled*

**Step 4: [Continue for all steps...]**---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

---

## Team Contributions

- **Ishitha Benny**: Frontend development, UI/UX design, React components
- **Janet Jiju**: Backend development, Supabase integration, API implementation

---

## AI Tools Used

**Tools Used:** GitHub Copilot, ChatGPT, v0.dev

**Purposes:**
- Component boilerplate generation
- API endpoint implementation assistance
- Database schema design suggestions
- Debugging and optimization recommendations

---

## License

This project is open source and available under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by **Team DuoLogic** at TinkerHub
