/**
 * GameHub.jsx
 *
 * Main hub for displaying games in the Pickup Game App.
 * Users can join games, create games, and view details.
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

function GameHub() {
  const navigate = useNavigate();

  // State variables
  const [games, setGames] = useState([]);
  const [joinedGames, setJoinedGames] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");

  const filteredGames = games.filter((game) => {
    const matchesSport = selectedSport === "All" || game.sport === selectedSport;
    const matchesSkill =
      selectedSkill === "All" || game.skill === selectedSkill;
    return matchesSport && matchesSkill;
  });

  // Ensure user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to access the Game Hub.");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch games from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/games/")
      .then((res) => {
        if (res.data.length > 0) {
          setGames(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching games:", err);
        setError("Could not load games. Showing demo games.");
      });
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    window.location.href = "/";
  };

  // Join game
  const handleJoin = (gameId, index) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to join a game.");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/participations/",
        { game_id: gameId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("Join request succeeded");
        setJoinedGames((prev) => [...prev, index]);
        alert("Successfully joined the game!");
      })
      .catch((err) => {
        console.error(
          "Error joining game:",
          err.response ? err.response.data : err.message
        );
        alert(
          `Could not join game: ${
            err.response?.data?.detail || err.message
          }`
        );
      });
  };

  // Show game details
  const handleDetails = (game) => {
    alert(`
    Game Details
    ---------------------
    Sport: ${game.sport}
    Date: ${game.date}
    Time: ${game.time}
    Location: ${game.location}
    Skill: ${game.skill}
    Participants: ${
      game.participants && game.participants.length > 0
        ? game.participants.join(", ")
        : "None"
    }
    `);
  };

  // Toggle drawer
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };


  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4, maxHeight: "80vh", overflowY: "auto" }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton onClick={toggleDrawer(true)}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 40, height: 40, fontSize: 18 }}>U</Avatar>
        </IconButton>
        <Typography variant="h4" gutterBottom>
          GameHub
        </Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="My Games" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/report")}>
                  <ListItemText primary="Report Player" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>

      {/* Error display */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Filter controls */}
<Box display="flex" justifyContent="center" gap={2} mb={3}>
  <FormControl size="small" sx={{ minWidth: 140 }}>
    <InputLabel>Sport</InputLabel>
    <Select
      value={selectedSport}
      label="Sport"
      onChange={(e) => setSelectedSport(e.target.value)}
    >
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Soccer">Soccer</MenuItem>
      <MenuItem value="Volleyball">Volleyball</MenuItem>
      <MenuItem value="Basketball">Basketball</MenuItem>
      <MenuItem value="Tennis">Tennis</MenuItem>
    </Select>
  </FormControl>

  <FormControl size="small" sx={{ minWidth: 140 }}>
    <InputLabel>Skill</InputLabel>
    <Select
      value={selectedSkill}
      label="Skill"
      onChange={(e) => setSelectedSkill(e.target.value)}
    >
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Beginner">Beginner</MenuItem>
      <MenuItem value="Intermediate">Intermediate</MenuItem>
      <MenuItem value="Advanced">Advanced</MenuItem>
    </Select>
  </FormControl>
</Box>

      {/* Render games */}
      {filteredGames.map((game, index) => {
        const full = game.currentPlayers >= game.maxPlayers;
        const joined = joinedGames.includes(index);

        return (
          <Box
            key={index}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              p: 2,
              mb: 3,
              boxShadow: 3,
              border: "1px solid #ccc",
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <Typography
                  color={full ? "error" : "success.main"}
                  fontWeight="bold"
                >
                  {full
                    ? "Full Game"
                    : `${game.currentPlayers || 0}/${game.maxPlayers || 10} Players`}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography fontWeight="bold">
                  {game.sport || "Unknown Sport"}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  📅 {game.date} | {game.time}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>📍 {game.location}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>🎯 {game.skill}</Typography>
              </Grid>

              {/* Join & Details buttons */}
              <Grid item xs={12} mt={1} textAlign="center">
                <Button
                  variant="contained"
                  disabled={full || joined}
                  sx={{ mr: 2 }}
                  onClick={() => handleJoin(game.id, index)}
                >
                  Join
                </Button>
                <Button variant="outlined" onClick={() => handleDetails(game)}>
                  Details
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      })}

      {/* Create new game button */}
      <Box textAlign="center" mt={4}>
        <Button variant="outlined" onClick={() => navigate("/create")}>
          ➕ Create New Game
        </Button>
      </Box>
    </Container>
  );
}

export default GameHub;