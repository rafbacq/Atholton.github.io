# Atholton Raider Time Management Website

A web application for managing raider time sessions at Atholton High School, built with Next.js and Django.
The website for managing raider time sessions at Atholton High School, built with Next.js for its access to shadcn and built in backend functionality and Django for backend

## Project Setup

### Prerequisites
- Node.js (for frontend)
    - Download Node.js: https://nodejs.org/en/download
- Python 3.8+ (for backend)
- PostgreSQL 17+
    - Download PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

** Make sure to git pull origin main periodically or else when you try to push your feature it'll get really messed up because if your local repo is too far behind it'll give you errors

## Frontend Setup

### Initial Setup
1. Make sure node.js is installed:
```bash
node -v  # Check Node.js version
npm -v   # Check npm version
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start localhost:
```bash
cd frontend
npm run dev
```
### Pages
- '/" - home login
- '/login/student' - student login
- '/login/teacher' - teacher login
- '/student' - student dashboard
- '/teacher' - teacher dashboard
- '/student/all' - student all page
- '/teacher/all' - teacher all page


## Backend Setup

### PostgreSQL Installation
1. Download PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
2. During installation:
   - Set a secure password for postgres user
   - Keep default port (5432)
   - Install all components when prompted

### Stack Builder Components
Install these additional components via Stack Builder:
1. psqlODBC (64 bit) - Database driver
2. pgAgent - For automated backups
3. pgBouncer - Connection pooling

### Environment Setup
1. Create a `.env` file in project root with required settings (see `.env.example`)
2. Never commit `.env` file to git (always add in .gitignore, if it's already there then don't change it pls)
3. Generate a new Django secret key:
```python
# Run this in terminal to generate secure access key:
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Database Setup
1. Open pgAdmin 4
2. Create new database named 'atholton_test'
3. Run migrations:
```bash
cd backend
python manage.py migrate
```

### Virtual Environment
```bash
python -m venv venv              # Create virtual environment
venv\Scripts\activate            # Activate (Windows) 
venv/bin/activate                # Activate (Mac)
pip install -r requirements.txt  # Install dependencies
```

### Django Commands
```bash
# Development
python manage.py runserver          # Start development server
python manage.py createsuperuser    # Create admin user
python manage.py makemigrations     # Create database migrations
python manage.py migrate           # Apply migrations

# Testing
python manage.py test              # Run all tests
python manage.py test backend.tests.test_env  # Run specific tests

# Static Files
python manage.py collectstatic     # Collect static files
```

## Project Structure

### Frontend (/frontend)
- `/pages` - Next.js pages and routing
- `/components` - Reusable React components
- `/styles` - CSS and styling
- `/public` - Static assets

### Backend (/backend)
- `/accounts` - User authentication and profiles
- `/attendance` - Attendance tracking system
- `/backend` - Main Django configuration
- `/tests` - Test cases and stuff

## Development Workflow
1. Start PostgreSQL service
2. Start Django backend:
```bash
cd backend
python manage.py runserver
```

4. Access:
   - Frontend: http://localhost:3000
   - Admin panel: http://localhost:8000/admin
   - API: http://localhost:8000/api/

## Roadmap

### Phase 1: Core Models 
- [x] Create RaiderTimeSession model
- [x] Create Attendance tracking model
- [x] Create Room management model
- [x] Add model relationships
- [x] Write model tests

### Phase 2: Authentication (In Progress)
- [x] Implement Google OAuth2 integration
- [x] Set up domain restriction (@inst.hcpss.org)
- [x] Create login UI with Google Sign-In
- [ ] Complete backend account verification
- [ ] Add admin notification system
- [ ] Set up role-based routing
- [ ] Add authentication tests

### Phase 3: Teacher Features
- [ ] Session management UI
- [ ] Student registration view
- [ ] Attendance taking interface
- [ ] Reporting dashboard
- [ ] Room assignment system

### Phase 4: Student Features
- [ ] Session browsing interface
- [ ] Registration system
- [ ] Schedule viewer
- [ ] Attendance history
- [ ] Room location information

### Phase 5: Admin Tools
- [ ] User management interface
- [ ] School-wide reporting
- [ ] Period configuration
- [ ] Bulk operations tools

### Phase 6: Optimization
- [ ] Performance testing
- [ ] Mobile responsiveness
- [ ] Accessibility improvements
- [ ] Documentation updates

## Testing
```bash
# Backend
cd backend
python manage.py test
```

## Security Notes
- Keep `.env` file secure and never commit it PLEASE DONT
- Use environment variables for sensitive data
- Regular security audits (npm audit)
- Keep dependencies updated:
```bash
# Update frontend dependencies
npm update        # Update packages within allowed ranges
npm outdated      # Check for outdated packages
npm audit fix     # Fix security vulnerabilities

# Update backend dependencies
pip list --outdated              # Check for outdated packages
pip install --upgrade -r requirements.txt  # Update all packages
```

## How it works

### The custom user model
- Created a custom User model that extends Django's AbstractUser
- Added role-based authentication with three roles:
  - ADMIN: School administrators
  - TEACHER: Teachers who manage raider times
  - STUDENT: Students who attend raider times
- Added school-specific fields for user profiles

### The attendance system
- Implemented a raider time attendance system
- Added functionality to track attendance for each raider time session
- Added functionality to view attendance for each raider time session

### Database Configuration
- Set up PostgreSQL as the database backend
- Database name: atholton_test
- Configured for:
  - Up to 2000 users (scalable)
  - Secure connections
  - Connection pooling via pgBouncer

### Testing Framework
- Environment variable tests:
  - Secret key length verification
  - Database connection testing
  - Security settings validation
- Test database configuration:
  - Automatic test database creation
  - Isolation from production data

### Authentication System
- Google OAuth2 integration with NextAuth.js in frontend
- Domain restriction to @inst.hcpss.org emails
- JWT-based session management with 30-day persistence
- Secure error handling with custom error pages
- Admin notification system for unrecognized logins

### OAuth Integration
- Frontend (Next.js):
  - NextAuth.js handles Google OAuth flow
  - JWT strategy for session management
  - Custom callbacks for domain verification
  - Automatic token refresh handling
  - Session persistence for 30 days

- Backend (Django):
  - Django OAuth Toolkit for token validation
  - Custom middleware for JWT verification
  - Role-based permission system
  - Session synchronization with frontend
  - Secure token storage in PostgreSQL

- Security Features:
  - CORS configuration for API endpoints
  - CSRF protection on all routes
  - Secure cookie handling
  - Environment-based credentials
  - Rate limiting on auth endpoints

### OAuth Client Flow (How it works and how i set it up)
## Required Google OAuth Credentials
For development, we use a shared set of Google OAuth credentials for the team.

1. Create a `.env.local` file in your frontend directory:
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

2. Get the credentials:
   - **Team Members**: Message Tiffany for the OAuth credentials
   - These are already set up and working with the HCPSS domain

3. Security Rules:
   - Keep credentials in `.env.local` only
   - Never commit them to git
   - Don't share outside the team
   - Each developer uses the same credentials locally

Alternative: Setting up your own credentials (only if needed):
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google OAuth2 API
4. Create OAuth 2.0 Client ID credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-production-url/api/auth/callback/google` (production)

## I included the OAuth Client ID and Client Secret environment variables in an env file, let me know if you need to see it.
1. **Initial Setup**:
   ```typescript
   GoogleProvider({
     clientId: process.env.CLIENT_ID!,
     clientSecret: process.env.CLIENT_SECRET!,
   })
   ```
   - Configured in `/app/api/auth/[...nextauth]/route.ts`
   - Uses environment variables for credentials
   - Handles OAuth2 protocol automatically

2. **Authentication Flow**:
   - User clicks "Sign in with Google"
   - Redirects to Google consent screen
   - Google returns auth code
   - NextAuth exchanges code for tokens
   - Verifies @inst.hcpss.org domain

3. **Token Management**:
   ```typescript
   async jwt({ token, account }) {
     if (account) {
       token.userRole = "pending";
     }
     return token;
   }
   ```
   - Creates JWT with custom claims
   - Stores user role information
   - Manages token refresh
   - 30-day session persistence

4. **Session Handling**:
   ```typescript
   async session({ session, token }) {
     session.user.role = token.userRole;
     return session;
   }
   ```
   - Syncs JWT data with session
   - Provides role-based access
   - Maintains user context
   - Handles session expiry

5. **Security Features**:
   - Domain verification
   - CSRF protection
   - Secure cookie storage
   - HTTP-only cookies
   - Automatic token rotation

### Backend Integration
- Django OAuth Toolkit for token validation
- Custom middleware for JWT verification
- Role-based permission system
- Session synchronization with frontend
- Secure token storage in PostgreSQL