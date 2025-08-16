// src/pages/MyGames.jsx
/**
 * MyGames.jsx
 *
 * Displays games that the user has either joined or is hosting.
 * This is a UI-only version using localstorage
 */

import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import axios from "axios"; // for backend


// ----- DEMO DATA (replace later with backend API results) -----
const ME = { id: 1, username: "gterry@unomaha.edu" }; // current logged-in user

const initialDemoGames = [
  {
    id: 101,
    gameName: "Evening Hoops",
    sport: "Basketball",
    date: "Thu, Aug 14",
    time: "6:00 PM – 7:30 PM",
    location: "Campus Rec Court 2",
    currentPlayers: 7,
    maxPlayers: 10,
    skill: "Intermediate",
    host: { id: 1, username: "mauricio" },
  },
  {
    id: 102,
    gameName: "Friday Night Soccer",
    sport: "Soccer",
    date: "Fri, Aug 15",
    time: "5:00 PM – 6:30 PM",
    location: "Trago Field",
    currentPlayers: 10,
    maxPlayers: 10,
    skill: "Advanced",
    host: { id: 3, username: "alex" },
    isJoined: true,
  },
];

const storedGames = JSON.parse(localStorage.getItem("mygames") || "[]");
const demoGames = storedGames.length > 0 ? storedGames : initialDemoGames;

const isHostedByMe = (g) => g.host?.id === ME.id || g.host?.username === ME.username;
const isJoinedByMe = (g) => !!g.isJoined || isHostedByMe(g);

export default function MyGames() {
  const navigate = useNavigate();
  const location = useLocation();
  const [games, setGames] = useState(demoGames);
  // const [games, setGames] = useState(() =>
  //   JSON.parse(localStorage.getItem("mygames") || "[]")
  // );
  const [tab, setTab] = useState(0); // 0 = All, 1 = Joined, 2 = Hosting

  // Update game list when redirected after edit
  useEffect(() => {
    if (location.state?.gameJustEdited) {
      const updated = JSON.parse(localStorage.getItem("mygames") || "[]");
      setGames(updated);
      window.history.replaceState({}, document.title); // Clear state
    }
  }, [location.state]);

  // Tab-specific game lists
  const hosting = useMemo(() => games.filter(isHostedByMe), [games]);
  const joined = useMemo(() => games.filter(isJoinedByMe), [games]);
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

    // backend delete logic?
    /*
    const handleDelete = async () => {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://127.0.0.1:8000/games/${g.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        alert("Game deleted!");
        // TODO: refresh list here
      } catch (err) {
        console.error("Delete failed", err);
        alert("Could not delete game.");
      }
    };
    */

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
          <Grid item xs={12}>{(() => {
          const dt = new Date(g.date);
          const formattedDate = dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
          const formattedTime = dt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
          return <Typography>📅 {formattedDate} | {formattedTime}</Typography>;
        })()}</Grid>
          <Grid item xs={12}><Typography>📍 {g.location ?? "TBD"}</Typography></Grid>
          <Grid item xs={12}><Typography>🎯 Skill: {g.skill ?? "N/A"}</Typography></Grid>

          {/* Admin-only buttons (visible only if user is host) */}
          {hostedByMe && (
            <Grid item xs={12} mt={1} textAlign="center">
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    navigate("/create", {
                      state: {
                        game: {
                          ...g,
                          skill: g.skill?.toLowerCase(),
                          limit: g.maxPlayers?.toString(),
                        },
                      },
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                  const confirmDelete = window.confirm("Are you sure you want to delete this game?");
                  if (confirmDelete) {
                    const storedGames = JSON.parse(localStorage.getItem("mygames") || "[]");
                    const updatedGames = storedGames.filter((game) => game.id !== g.id);
                    localStorage.setItem("mygames", JSON.stringify(updatedGames));
                    alert("Game deleted!");
                    window.location.reload();
                  }
                }}

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
