// src/pages/MyGames.jsx
/**
 * MyGames.jsx
 *
 * Displays games that the user has either joined or is hosting.
 * This is a UI-only version using demo data
 */

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
  Chip,
  Stack,
} from "@mui/material";

// ----- DEMO DATA (replace later with backend API results) -----
const ME = { id: 1, username: "mauricio" }; // current logged-in user

const demoGames = [
  {
    id: 101,
    gameName: "Evening Hoops",
    sport: "Basketball",
    date: "Thu, Aug 14",
    time: "6:00 PM – 7:30 PM",
    location: "Campus Rec Court 2",
    currentPlayers: 7,
    maxPlayers: 10,
    skill: "intermediate",
    host: { id: 1, username: "mauricio" }, // hosted by me
  },
  {
    id: 102,
    sport: "Soccer",
    date: "Fri, Aug 15",
    time: "5:00 PM – 6:30 PM",
    location: "Trago Field",
    currentPlayers: 10,
    maxPlayers: 10,
    skill: "Advanced",
    host: { id: 3, username: "alex" },
    isJoined: true, // joined by me
  },
  {
    id: 103,
    sport: "Volleyball",
    date: "Sat, Aug 16",
    time: "2:00 PM – 3:30 PM",
    location: "Woods Park",
    currentPlayers: 2,
    maxPlayers: 8,
    skill: "Beginner",
    host: { id: 4, username: "sydney" },
  },
];

// Utility: check if current user is hosting the game
const isHostedByMe = (g) => g.host?.id === ME.id || g.host?.username === ME.username;

// Utility: check if current user has joined the game
const isJoinedByMe = (g) => !!g.isJoined || isHostedByMe(g);

export default function MyGames() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0); // 0 = All, 1 = Joined, 2 = Hosting

  // Tab-specific game lists
  const hosting = useMemo(() => demoGames.filter(isHostedByMe), []);
  const joined = useMemo(() => demoGames.filter(isJoinedByMe), []);
  const all = useMemo(() => {
    const map = new Map();
    [...joined, ...hosting].forEach((g) => map.set(g.id, g));
    return Array.from(map.values());
  }, [joined, hosting]);

  const lists = [all, joined, hosting];
  const labels = ["All", "Joined", "Hosting"];
  const current = lists[tab];

  // UI Component for Game Card
  const Card = ({ g }) => {
    const full = (g.currentPlayers ?? 0) >= (g.maxPlayers ?? 10);
    const hostedByMe = isHostedByMe(g);

    return (
      <Box
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
          <Grid item xs={8}>
            <Typography fontWeight="bold">
              {g.sport || "Unknown Sport"}{" "}
              {hostedByMe && <Chip size="small" label="Hosted by me" sx={{ ml: 1 }} />}
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography color={full ? "error" : "success.main"} fontWeight="bold">
              {full ? "Full Game" : `${g.currentPlayers ?? 0}/${g.maxPlayers ?? 10} Players`}
            </Typography>
          </Grid>
          <Grid item xs={12}><Typography>📅 {g.date ?? "TBD"} | {g.time ?? "TBD"}</Typography></Grid>
          <Grid item xs={12}><Typography>📍 {g.location ?? "TBD"}</Typography></Grid>
          <Grid item xs={12}><Typography>🎯 Skill: {g.skill ?? "N/A"}</Typography></Grid>

          {/* Admin-only buttons (visible only if user is host) */}
          {hostedByMe && (
            <Grid item xs={12} mt={1} textAlign="center">
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  color="primary"
                  // TODO: Implement edit logic (e.g., open edit form or route)
                  onClick={() => navigate('/create', { state: { game: g } })}                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  // TODO: Implement delete API call
                  onClick={() => alert(`Delete game #${g.id} (TODO)`)}
                >
                  Delete
                </Button>
              </Stack>
            </Grid>
          )}

          {/* Universal Details Button */}
          <Grid item xs={12} mt={1} textAlign="center">
            <Button variant="outlined" onClick={() => alert(JSON.stringify(g, null, 2))}>
              Details
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, maxHeight: "80vh", overflowY: "auto" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">My Games</Typography>
        <Button variant="outlined" onClick={() => navigate("/gamehub")}>
          Back to Hub
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        {labels.map((lbl) => (
          <Tab key={lbl} label={lbl} />
        ))}
      </Tabs>

      {/* No Games State */}
      {current.length === 0 ? (
        <Box textAlign="center" mt={6}>
          <Typography sx={{ mb: 2 }}>
            {tab === 1
              ? "You haven’t joined any games yet."
              : tab === 2
              ? "You aren’t hosting any games."
              : "No games yet."}
          </Typography>
          <Button variant="contained" onClick={() => navigate("/gamehub")}>
            Find or Create a Game
          </Button>
        </Box>
      ) : (
        // Render cards
        current.map((g) => <Card key={g.id} g={g} />)
      )}
    </Container>
  );
}
