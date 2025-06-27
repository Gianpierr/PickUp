import React from 'react';
import { Container, Button, Box, Typography, Avatar, TextField, MenuItem, Chip, Stack } from '@mui/material';

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const sportsOptions = [
  'Basketball', 'Soccer', 'Volleyball', 'Tennis', 'Baseball', 'Other'
];

function UserProfile() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [personalInfo, setPersonalInfo] = React.useState('');

  const [skill, setSkill] = React.useState('');
  const [sports, setSports] = React.useState([]);
  const [photo, setPhoto] = React.useState(null);
  const [sportsOpen, setSportsOpen] = React.useState(false);

  const handleSkillChange = (e) => setSkill(e.target.value);
  const handleSportsChange = (e) => setSports(e.target.value);
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };
 const handleSave = (e) => {
    e.preventDefault();
    // send the data to  backend o
    alert('Profile saved!');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          User Profile
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar src={photo} sx={{ width: 100, height: 100, mb: 2 }} />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-photo-upload"
            type="file"
            onChange={handlePhotoChange}
          />
          <label htmlFor="profile-photo-upload">
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
              Upload Photo
            </Typography>
          </label>
        </Box>
        <form onSubmit={handleSave}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            sx={{ mb: 2 }}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            sx={{ mb: 2 }}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        <TextField
            fullWidth
            label="Personal Info"
            margin="normal"
            multiline
            rows={3}
            value={personalInfo}
            onChange={e => setPersonalInfo(e.target.value)}
          />
          <TextField
            select
            fullWidth
            label="Skill Level"
            value={skill}
            onChange={handleSkillChange}
            margin="normal"
          >
            {skillLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
        <TextField
            select
            fullWidth
            label="Preferred Sports"
            value={sports}
            onChange={handleSportsChange}
            SelectProps={{
              multiple: true,
              open: sportsOpen,
              onClose: () => setSportsOpen(false),
              onOpen: () => setSportsOpen(true),
              renderValue: (selected) => (
                <Stack direction="row" spacing={1}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Stack>
              ),
              MenuProps: {
                onClick: () => setSportsOpen(false),
              }
            }}
            margin="normal"
          >
            {sportsOptions.map((sport) => (
              <MenuItem key={sport} value={sport}>
                {sport}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default UserProfile;