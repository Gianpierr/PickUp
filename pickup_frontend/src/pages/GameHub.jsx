import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";



const initialGames = [
  {
    currentPlayers: 4,
    maxPlayers: 10,
    sport: "Soccer",
    date: "Wed, Jul 17",
    time: "6:00 PM – 8:00 PM",
    location: "Trago Field",
    host: "Jordan"
  },
  {
    currentPlayers: 2,
    maxPlayers: 8,
    sport: "Volleyball",
    date: "Today",
    time: "5:30 PM – 6:30 PM",
    location: "Woods Park",
    host: "Barack"
  },
  {
    currentPlayers: 8,
    maxPlayers: 8,
    sport: "Flag Football",
    date: "Thu, Jul 18",
    time: "7:00 PM – 9:00 PM",
    location: "Oak Lake",
    host: "Mauricio"
  }
];

function GameHub() {
  const navigate = useNavigate();

  const [games, setGames] = useState(initialGames);
  const [joinedGames, setJoinedGames] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const parseTimeRange = (timeRange) => {
    const [start, end] = timeRange.split("–").map((t) => t.trim());
    const parse = (timeStr) => {
      const [hourMin, modifier] = timeStr.split(" ");
      let [hour, min] = hourMin.split(":" ).map(Number);
      if (modifier === "PM" && hour !== 12) hour += 12;
      if (modifier === "AM" && hour === 12) hour = 0;
      return hour * 60 + min;
    };
    return [parse(start), parse(end)];
  };

  const overlaps = (aStart, aEnd, bStart, bEnd) => {
    return aStart < bEnd && bStart < aEnd;
  };

  const handleJoin = (index) => {
    if (joinedGames.includes(index)) return;

    const [newStart, newEnd] = parseTimeRange(games[index].time);

    for (let i of joinedGames) {
      const [start, end] = parseTimeRange(games[i].time);
      if (overlaps(start, end, newStart, newEnd)) {
        alert("This game overlaps with one you've already joined.");
        return;
      }
    }

    setGames((prevGames) =>
      prevGames.map((game, i) =>
        i === index && game.currentPlayers < game.maxPlayers
          ? { ...game, currentPlayers: game.currentPlayers + 1 }
          : game
      )
    );

    setJoinedGames((prev) => [...prev, index]);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, maxHeight: '80vh', overflowY: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton onClick={toggleDrawer(true)}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 40, height: 40, fontSize: 18 }}>U</Avatar>
        </IconButton>
        <Typography variant="h4" gutterBottom>
          GameHub
        </Typography>
        <Box width={40} height={40} /> {/* Placeholder to balance spacing */}
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

      <Box mb={2} textAlign="center">
        <Typography variant="subtitle1">Filters: [ All Sports ] [ This Week ] [ Nearby ]</Typography>
      </Box>

      {games.map((game, index) => {
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
              border: "1px solid #ccc"
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <Typography color={full ? "error" : "success.main"} fontWeight="bold">
                  {full ? "Full Game" : `${game.currentPlayers}/${game.maxPlayers} Players`}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography fontWeight="bold">{game.sport}</Typography>
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
                <Typography>👤 Host: {game.host}</Typography>
              </Grid>

              <Grid item xs={12} mt={1} textAlign="center">
                <Button
                  variant="contained"
                  disabled={full || joined}
                  sx={{ mr: 2 }}
                  onClick={() => handleJoin(index)}
                >
                  Join
                </Button>
                <Button variant="outlined">Details</Button>
              </Grid>
            </Grid>
          </Box>
        );
      })}

      <Box textAlign="center" mt={4}>
        <Button variant="outlined" onClick={() => navigate("/create")}>
          ➕ Create New Game
        </Button>
      </Box>
    </Container>
  );
}

export default GameHub;
