import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import { signupAPI } from '../api/signupAPI';
import { useNavigate } from 'react-router-dom';

/**
 * SignUp Component
 * ----------------
 * Signup form where `email` is automatically used as the `username`.
 */
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    skill_level: '',
    gender: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Automatically map email to username
      const payload = { ...formData, username: formData.email };
      const response = await signupAPI(payload);
      
      setSuccess('Signup successful! You may now log in.');
      setError('');
      console.log('Signup Response:', response);
      setTimeout(() => navigate('/login'), 1500);

      // TODO: Redirect to login page after signup
    } catch (err) {
      setError(err.message || 'Signup failed. Please check your details and try again.');
      setSuccess('');
      console.error('Signup Error:', err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}

        <TextField margin="normal" required fullWidth label="First Name" name="first_name" onChange={handleChange} />
        <TextField margin="normal" required fullWidth label="Last Name" name="last_name" onChange={handleChange} />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Birthday"
          name="birthday"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField margin="normal" required fullWidth select label="Gender" name="gender" onChange={handleChange}>
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
          <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
        </TextField>
        <TextField margin="normal" required fullWidth select label="Skill Level" name="skill_level" onChange={handleChange}>
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="beginner">Beginner</MenuItem>
          <MenuItem value="intermediate">Intermediate</MenuItem>
          <MenuItem value="advanced">Advanced</MenuItem>
          
        </TextField>
        
        <TextField margin="normal" required fullWidth label="Email Address" name="email" onChange={handleChange} />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default SignUp;