import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import sportsBg from '../assets/sports-bg.jpg';


function Login() {

const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login button clicked");
  };

  return (
    <div
        style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${sportsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}
        >
        <Container maxWidth="xs" sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography 
                component="h1"
                variant="h5"
                align="center" 
                sx={{ width: '100%' }} 
                >            
                Welcome to the Pickup Game App! <br /> 
                Login
            </Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleLogin}>
            <TextField margin="normal" required fullWidth label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" autoComplete="current-password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Sign In
            </Button>
            <MuiLink component={RouterLink} to="/signup" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
              Don't have an account? Sign Up
            </MuiLink>
            </Box>
        </Box>
        </Container>
    </div>

  );
}

export default Login;