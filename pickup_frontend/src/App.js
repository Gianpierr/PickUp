// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/userProfile';
import Login from './pages/login';
import SignUp from './pages/signup';
import CreateGame from './pages/CreateGame';
import Report from './pages/Report';
import GameHub from './pages/GameHub';
import './styles/App.css';

/**
 * The main App component that sets up routing for the Pickup Game application.
 * Uses React Router DOM to define routes for login, signup, user profile,
 * creating games, reporting, and accessing the game hub.
 *
 * TODO:
 * - Add authentication guards (e.g., protect routes like /profile, /create, /report, /gamehub).
 * - Connect each route with backend API endpoints (login, signup, game creation, etc.).
 * - Handle loading states and error messages for failed API calls.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Default route - login page */}
        <Route 
          path="/login" 
          element={<Login />} 
          // TODO: Redirect to /gamehub if user is already authenticated
        />

        {/* Route for user signup */}
        <Route 
          path="/signup" 
          element={<SignUp />} 
          // TODO: Integrate signup form with backend API
        />

        {/* Route for viewing and editing the user profile */}
        <Route 
          path="/profile" 
          element={<Profile />} 
          // TODO: Fetch user profile data from backend after login
        />

        {/* Route for creating a new game */}
        <Route 
          path="/create" 
          element={<CreateGame />} 
          // TODO: Connect to backend endpoint for game creation
        />

        {/* Route for reporting (e.g., issues or game feedback) */}
        <Route 
          path="/report" 
          element={<Report />} 
          // TODO: Send report data to backend API
        />

        {/* Route for accessing the central game hub */}
        <Route 
          path="/gamehub" 
          element={<GameHub />} 
          // TODO: Fetch list of available games from backend
        />
      </Routes>
    </Router>
  );
}

export default App;