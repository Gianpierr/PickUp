import React from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';

function SignUp() {
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="First Name" name="firstName" autoFocus />
          <TextField margin="normal" required fullWidth label="Last Name" name="lastName" />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Birthday"
            name="birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Gender"
            name="gender"
            defaultValue=""
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
          </TextField>
          <TextField margin="normal" required fullWidth label="Email Address" name="email" autoComplete="email" />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" autoComplete="new-password" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;