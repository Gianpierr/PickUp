/**
 * LoginForm Component
 * -------------------
 * Renders a login form that interacts with the backend login endpoint.
 * 
 * - Uses the loginAPI function to authenticate users.
 * - Stores JWT token in localStorage if login is successful.
 * - Displays error message if login fails.
 * - Redirects the user after a successful login.
 */

import React, { useState } from "react";
import { loginAPI } from "../api/loginAPI"; // Imports backend login API call

function LoginForm() {
  // Local state variables for form inputs and error handling
  const [email, setEmail] = useState("");       // Stores the entered email/username
  const [password, setPassword] = useState(""); // Stores the entered password
  const [error, setError] = useState("");       // Stores any error messages

  /**
   * handleSubmit
   * ------------
   * Called when the user submits the login form.
   * Prevents default form behavior, calls backend login API, 
   * and handles success or failure responses.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Construct the user data payload
      const userData = { username: email, password: password };

      // Call the backend login API
      const response = await loginAPI(userData);

      // If the backend returns a JWT token, save it in localStorage
      if (response.access) {
        localStorage.setItem("token", response.access);
      }

      alert("Login successful!");
      console.log("Login Response:", response);

      // Redirect to dashboard (or another protected route)
      window.location.href = "/dashboard"; 
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials, please try again."); // Show error message to user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Conditionally render an error message if login fails */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Login form with controlled inputs */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginForm;