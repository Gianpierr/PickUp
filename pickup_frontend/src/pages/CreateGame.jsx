import React from 'react';
import { Container, Box, Typography, TextField, MenuItem, Button } from '@mui/material';

const sportsOptions = ['Basketball', 'Soccer', 'Volleyball', 'Tennis'];
const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

function CreateGame() {
  const [gameName, setGameName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [date, setDate] = React.useState('');
  const [sport, setSport] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [limit, setLimit] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend Stuff
    alert('Game Created!');
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
          margin="normal"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Location"
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
              (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 50)
            ) {
              setLimit(value);
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
