# PickUp
Web app created for helping students play and setup pick-up games easily!

# FRONTEND
**Frontend file structure**

pickup-frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/             # API calls (e.g., axios functions)
│   ├── components/      # Reusable UI components (Button, Navbar, etc.)
│   ├── features/        # Feature folders (Teams, Games, Auth, etc.)
│   │   ├── xxx/
│   │   │   ├── xxxx.jsx
│   │   │   ├── xxxx.jsx
│   │   │   └── xxxx.jsx
│   │   └── xxxx/
│   │       ├── xxxx.jsx
│   │       └── xxxx.jsx
│   ├── pages/           # Page-level components (Home, Profile, etc.)
│   │       ├── login.jsx
│   │       ├── signup.jsx
│   │       └── userProfile.jsx
│   │       ├── xxxx.jsx
│   │       └── xxxx.jsx
|   |-- test/            # testing files
│   ├── App.js
│   ├── index.js
│   └── styles/          # CSS or styled-components
├── package.json
└── README.md

**MOVE TO pickup_frontend DIRECTORY TO INSTALL**

1. Using Node.js and React Router for routing
- install npm "install npm", reference pickup_frontend/README.md
- install react router, using "npm install react-router-dom"
        *Benefits of using React Router:
            -Lets users navigate between pages without reloading the app.
            -Makes your app feel like a real website with browser navigation (back/forward).
            -Helps organize your code by separating page components.
- to run project -> "npm start"

2. Form Handling
Formik: Makes building and validating forms easier.

3. Validation
Yup: Works well with Formik or React Hook Form for schema-based validation.

4. Authentication
JWT (JSON Web Tokens): Common for handling authentication with a Django backend.
Axios: For making HTTP requests to your backend login endpoint.

5. UI Components
Material-UI (MUI) 
- run in terminal, npm install @mui/material @emotion/react @emotion/styled

Use React Hook Form + Yup for the login form and validation.
Use Axios to send login data to your Django backend.
Store the JWT token in localStorage or cookies after a successful login.
