import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { createGameAPI } from '../api/createGameAPI';

const sportsOptions = ['Basketball', 'Soccer', 'Volleyball', 'Tennis'];

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

function CreateGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingGame = location.state?.game;

  const [formData, setFormData] = useState({
    game_name: '',
    location: '',
    date: '',
    sport: '',
    skill_level: '',
    limit: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Populate form if editing
  useEffect(() => {
  if (editingGame) {
    setFormData({
      game_name: editingGame.game_name || editingGame.gameName || '',
      location: editingGame.location || '',
      date: editingGame.date || '',
      sport: editingGame.sport || '',
      skill_level: editingGame.skill_level || editingGame.skill || '',
      limit: editingGame.limit?.toString() || '',
    });
  }
}, [editingGame]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData };

      // This currently only handles creation via backend
      // For editing the API needs to be patched in here. 
      await createGameAPI(payload);

      alert(editingGame ? 'Game Updated!' : 'Game Created!');
      setSuccess('Success!');
      setError('');
      setTimeout(() => navigate('/mygames'), 1000);
    } catch (err) {
      setError(err.message || 'Submission failed.');
      setSuccess('');
      alert('Submission failed.');
    }
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
            name="game_name"
            margin="normal"
            value={formData.game_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            margin="normal"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Date & Time"
            type="datetime-local"
            name="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
            required
          />
          <TextField
            select
            fullWidth
            label="Sport"
            name="sport"
            margin="normal"
            value={formData.sport}
            onChange={handleChange}
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
            name="skill_level"
            margin="normal"
            value={formData.skill_level}
            onChange={handleChange}
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
            name="limit"
            margin="normal"
            value={formData.limit}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === '' ||
                (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 50)
              ) {
                setFormData({ ...formData, limit: parseInt(value) });
              }
            }}
            required
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
