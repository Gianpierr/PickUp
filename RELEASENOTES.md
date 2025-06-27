## What's Changed
* initial merge from Feature/user profile page by @swells8 in https://github.com/Gianpierr/PickUp/pull/1
* Add signup endpoint + Sport, Game, Participation models by @ctheisen606 in https://github.com/Gianpierr/PickUp/pull/2
* Login Endpoint with JWT Token Auth by @ctheisen606 in https://github.com/Gianpierr/PickUp/pull/3
* Feature/frontend login api by @swells8 in https://github.com/Gianpierr/PickUp/pull/4

## New Contributors
* @swells8 made their first contribution in https://github.com/Gianpierr/PickUp/pull/1
* @ctheisen606 made their first contribution in https://github.com/Gianpierr/PickUp/pull/2

**Full Changelog**: https://github.com/Gianpierr/PickUp/commits/v.0.1.1


**Features**

1. User Authentication:
- Login and Sign Up pages with Material-UI components.
- Form validation for required fields.
- Login connects to backend /api/login endpoint.

2. User Profile:
- Profile page with fields for name, personal info, photo upload, skill level, and preferred sports.
- Multi-select for preferred sports and skill level dropdown.

3. UI/UX:
- Sports-themed background on login page.
- Custom favicon and logo support.
- Responsive, centered forms for a clean look.

4. Routing:
- Navigation between Login, Sign Up, and Profile pages using React Router.

**Tech Stack**
JSX with React 
Python with Django

**Extras**
Material-UI 7
React Router 7

**Setup**
Install dependencies: npm install, pip install django
Start the app: npm start
Connects to backend at http://localhost:8000/api/

**Milestone 1 Completion Notes**
Our project plan outline the following as tasks to be completed during milestone 1:

- [ ] User signup and login (using email/password or OAuth) 
- [ ] Basic profile creation (fields for name, photo, skill level, and preferred sports) 
- [ ] Game creation and browsing interface
- [ ] RSVP functionality to join or cancel participation in games 
- [ ] Database schema setup with basic API endpoints for users and games 
- [ ] Initial UI for game listing and game creation (no filters yet) 

As milestone 1 closes, we did not finish all of the tasks, but we did complete most of them.
We successfully create login, signup, profile, and game creation (on feature branch) UI pages. 
Additionally, we partially completed the database schema setup for API endpoints and started the RSVP feature. 
The inconsistent feature completions for this milestone aren't alarming to our group because we did complete other
non-listed tasks like api creation and integration and routing. We believe that we can successfully complete the 
remaining milestone 1 tasks during the upcoming milestone without setting us back further.
