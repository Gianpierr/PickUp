# Code Milestone 3

## What's Changed
- Extended **Player model** with:
  - `preferred_sports` (ManyToMany with Sport)
  - `age` (calculated from birthday)
  - `gender` (validated against defined choices)
- Updated **SignupSerializer**:
  - Handles birthday → auto‑calculate age
  - Validates gender input
  - Links preferred sports to Player profile
- Added **PlayerSerializer** for editing skill level, age, gender, and sports.
- Enhanced **UserSerializer** with support for full name and additional fields.
- Implemented **signup logic** to create both a User and Player record.
- Improved backend responses with clear success/error messages.
- Updated **GameSerializer** to:
  - Return `currentPlayers` count
  - Include participant usernames
- **Frontend updates**:
  - Signup form integrated with Django backend
  - Login API wired with backend JWT endpoints
  - Material‑UI components for improved UX
  - Error/success handling for signup and login
  - Routing for `/signup`, `/login`, `/profile`, `/create`, `/report`, `/gamehub`

## Unit Tests
### Backend (Django)
- ✅ User signup creates both User and Player profile
- ✅ Joining a game creates a Participation record
- ✅ GameSerializer returns correct currentPlayers and participant list
- ✅ SignupSerializer rejects invalid gender input

### Frontend (React)
- ✅ Signup form renders all required fields
- ✅ Successful signup form submission hits backend `/signup/`
- ✅ Error handling tested for backend 400 responses
- ✅ Navigation tested for `/signup`, `/login`, `/gamehub`

## Full Changelog
v0.2.0 → v0.3.0
