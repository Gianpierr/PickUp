const loadGames = async () => {
    setLoading(true);
    try {
      // Try backend first
      const response = await axios.get('/api/games/my-games/', { // what to connect to?
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setGames(response.data.games);
      
      // Check for any local games and offer to sync them
      const localGames = JSON.parse(localStorage.getItem('mygames') || '[]');
      if (localGames.length > 0) {
        setLocalGamesCount(localGames.length);
        setShowMigrationOption(true);
      }
    } catch (error) {
      console.error('Backend unavailable, using localStorage');
      // Fallback to localStorage
      const localGames = JSON.parse(localStorage.getItem('mygames') || '[]');
      setGames(localGames);
    } finally {
      setLoading(false);
    }
  };