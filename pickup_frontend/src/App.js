import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/userProfile';
import Login from './pages/login';
import SignUp from './pages/signup';
import CreateGame from './pages/CreateGame';
import Report from './pages/Report';
import GameHub from './pages/GameHub';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/report" element={<Report />} />
        <Route path="/gamehub" element={<GameHub />} />
      </Routes>
    </Router>
  );
}

export default App;
