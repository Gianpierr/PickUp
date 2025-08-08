import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import sportsBg from '../assets/sports-bg.jpg';
import { loginAPI } from '../api/loginAPI';

function Login() {
  const [username, setUsername] = React.useState(''); 
  const [password, setPassword] = React.useState('');

  const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const data = await loginAPI({ username, password });

    // Save token & redirect
    if (data.access) {
      localStorage.setItem("token", data.access);
      alert('Login successful!');
      window.location.replace('/gamehub'); // redirect correctly
    } else {
      alert('No token received, login may not have worked');
    }
  } catch (error) {
    alert('Login failed!');
    console.error('Login error:', error);
  }
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
          <Typography component="h1" variant="h5" align="center" sx={{ width: '100%' }}>
            Welcome to the Pickup Game App! <br />
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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