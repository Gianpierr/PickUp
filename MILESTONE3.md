# Code Milestone 3 Release Notes

## What's Changed
- Extended **Player Model**
  - Added support for `preferred_sports` (ManyToMany with Sport).
  - Added `age` (calculated from birthday) and `gender` fields.
  - Added inline docstrings for clarity.
- Updated **Serializers**
  - Extended `SignupSerializer` to handle birthday, gender, and sports preferences.
  - Added `PlayerSerializer` for skill level, age, gender, and sports updates.
  - Improved `GameSerializer` to show:
    - Current number of players
    - Participant usernames
    - Host username
    - Sport name
- Enhanced **Views**
  - Signup logic creates both a User and linked Player.
  - Endpoints now return clear success/error messages.
- Database / Migrations
  - Resolved conflicting migrations and applied successfully.
- Frontend Updates
  - Login API (`loginAPI.jsx`) and Signup API (`signupAPI.jsx`) connected to backend.
  - Signup Form integrated with Material UI fields: First Name, Last Name, Birthday, Gender, Email, Password.
  - Success and error messages shown dynamically.

## Unit Tests
### Backend (Django)
Added test cases in `/pickup_backend/tests/`:
- **test_signup.py** → verifies user + player creation.
- **test_game.py** → verifies game creation and field correctness.
- **test_participation.py** → verifies joining games and participant count updates.

✅ All tests passed successfully with `python manage.py test`.

## Contributors
- @ctheisen606  
- @swells8  
- @Mauricioaguileraortiz8  
- @Gianpierr
