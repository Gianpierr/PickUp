import React from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Snackbar, Alert } from "@mui/material";


const mockPlayers = [
  { id: 1, name: "John D." },
  { id: 2, name: "Mauricio O." },
  { id: 3, name: "Gianpierre T." },
  { id: 4, name: "Sydney W."},
];

function Report(){
    const [selectedPlayer, setSelectedPlayer] = React.useState('');
    const [description, setDescription] = React.useState('');
    const[snackOpen, setSnackOpen] = React.useState(false);
    const[players, setPlayers] = React.useState(mockPlayers); //This uses the hardcoded names until backended is added in. 

    const handleSubmit = (e) => {
        e.preventDefault();
        //backend
        setSelectedPlayer('');
        setDescription('');
        setSnackOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackOpen(false);
    };


    return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Report a Player
      </Typography>

      <form onSubmit={handleSubmit} style={{ background: '#f0f0f0', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="player-select-label">Choose who to report</InputLabel>
          <Select
            labelId="player-select-label"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            required
          >
            {players.map((player) => (
              <MenuItem key={player.id} value={player.name}>
                {player.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Describe what happened"
          multiline
          fullWidth
          minRows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            borderRadius: '50px',
            height: '60px',
            fontSize: '1.2rem',
            mt: 3
          }}
        >
          Submit Report
        </Button>
      </form>

      <Snackbar open={snackOpen}  onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Report submitted.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Report;