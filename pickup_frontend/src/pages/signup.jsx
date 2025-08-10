import React from 'react';
import { SignUpAPI } from '../api/signupAPI';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';

function SignUp() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    skillLevel: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await SignUpAPI(formData);
      console.log(res.data);
      alert("Registration successful!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField margin="normal" required fullWidth label="First Name" name="firstName" autoFocus value={formData.firstName} onChange={handleChange} />
          <TextField margin="normal" required fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Birthday"
            name="birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.birthday}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Skill Level"
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
            
          </TextField>
          <TextField margin="normal" required fullWidth label="Email Address" name="email" autoComplete="email" value={formData.email} onChange={handleChange} />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
