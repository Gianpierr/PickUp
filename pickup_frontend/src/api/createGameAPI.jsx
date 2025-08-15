export async function createGameAPI(gameData) {
    const response = await fetch("http://localhost:8000/games/", {
        // replace localhost:8000 with $BASE_URL
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
    });
    if (!response.ok) {
        throw new Error("Game Creation failed in API");
    }

    const data = await response.json();
    return data;
    
}