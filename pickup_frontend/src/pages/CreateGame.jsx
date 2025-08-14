// src/pages/CreateGame.jsx

import React from 'react';
import { Container, Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Uncomment when backend is ready

const sportsOptions = ['Basketball', 'Soccer', 'Volleyball', 'Tennis'];

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

function CreateGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingGame = location.state?.game;

  const [gameName, setGameName] = React.useState(editingGame?.gameName || '');
  const [locationField, setLocationField] = React.useState(editingGame?.location || '');
  const [date, setDate] = React.useState(editingGame?.date || '');
  const [sport, setSport] = React.useState(editingGame?.sport || '');
  const [skill, setSkill] = React.useState(editingGame?.skill || '');
  const [limit, setLimit] = React.useState(editingGame?.limit?.toString() || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gameData = {
      ...editingGame,
      id: editingGame?.id || Date.now(), // keep ID if editing, otherwise generate new
      gameName,
      location: locationField,
      date,
      sport,
      skill,
      limit: parseInt(limit),
      maxPlayers: parseInt(limit),
      currentPlayers: editingGame?.currentPlayers ?? 1,
      host: { id: 1, username: "mauricio" },
      isJoined: true,
    };

    const storedGames = JSON.parse(localStorage.getItem("mygames") || "[]");

    if (editingGame) {
      // Update existing game
      const updated = storedGames.map((g) =>
        g.id === editingGame.id ? gameData : g
      );
      localStorage.setItem("mygames", JSON.stringify(updated));
      alert("Game updated");
    } else {
      // Add new game
      storedGames.push(gameData);
      localStorage.setItem("mygames", JSON.stringify(storedGames));
      alert("Game created");
    }

    navigate("/mygames");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {editingGame ? 'Edit Game' : 'Create a Pickup Game'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Game Name"
            margin="normal"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Location"
            margin="normal"
            value={locationField}
            onChange={(e) => setLocationField(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Date & Time"
            type="datetime-local"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <TextField
            select
            fullWidth
            label="Sport"
            margin="normal"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          >
            {sportsOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Skill Level"
            margin="normal"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            required
          >
            {skillLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Player Limit"
            type="text"
            margin="normal"
            required
            value={limit}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === '' ||
                (/^\d+$/.test(value) &&
                  parseInt(value) >= 1 &&
                  parseInt(value) <= 50)
              ) {
                setLimit(value);
              }
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            {editingGame ? 'Update Game' : 'Create Game'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default CreateGame;
