import React from 'react';
import { Container, Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createGameAPI } from '../api/createGameAPI';
import { useState } from 'react'

const sportsOptions = ['Basketball', 'Soccer', 'Volleyball', 'Tennis'];
const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

function CreateGame() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    game_name: '',
    location: '',
    date: '',
    sport: '',
    skill_level: '',
    limit: '',
  })

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData};
      
      const response = await createGameAPI(payload);
      alert('Game Created!');
      setTimeout(() => navigate('/gamehub'), 1500)

      setSuccess('Game Creation successful!');
      setError('');
      // navigate to gamehub page
    }
    catch (err) {
      setError(err.message || 'Game creation failed.');
      setSuccess('');
      alert('Game Creation failed!');

    }
    
  };

 return (
  <Container maxWidth="md">
    <Box sx={{ mt: 4, p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create a Pickup Game
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Game Name"
          name='game_name'
          margin="normal"
          value={formData.game_name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Location"
          margin="normal"
          value={formData.location}
          name="location"
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Date & Time"
          type="datetime-local"
          margin="normal"
          name="date"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleChange}
          required
        />
        <TextField
          select
          fullWidth
          label="Sport"
          margin="normal"
          name="sport"
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
          margin="normal"
          name="limit"
          required
          value={formData.limit}
          onChange={(e) => {
            const value = e.target.value;
            if (
              value === '' ||
              (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 50)
            ) {
               setFormData({...formData, limit: parseInt(value)});
               
            }
          }}
          />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
        >
          Create Game
        </Button>
      </form>
    </Box>
  </Container>
);

}

export default CreateGame;
