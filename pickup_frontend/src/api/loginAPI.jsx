// src/api/loginAPI.jsx
export async function loginAPI(userData) {
  const response = await fetch("http://localhost:8000/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.username,   // backend expects username
      password: userData.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  // Save JWT token in localStorage if provided
  if (data.access) {
    localStorage.setItem("token", data.access);
    console.log("Login successful. JWT response:", data);
  } else {
    throw new Error("No token received from server");
  }

  return data;
}