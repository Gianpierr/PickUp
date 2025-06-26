import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';


function Login() {

const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login button clicked");
  };

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5', // Optional: add a background color or image
      }}
      >
        <Container maxWidth="xs" sx={{ backgroundColor: 'grey', padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" autoComplete="current-password" />
            <Button onClick={handleLogin}>
                Sign In
            </Button>
            </Box>
        </Box>
        </Container>
    </div>

  );
}

export default Login;