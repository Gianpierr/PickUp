// src/api/signupAPI.jsx
import { BASE_URL } from './config';

/**
 * signupAPI
 * ---------
 * Sends a POST request to the Django backend to create a new user.
 *
 * @param {Object} userData - User details in this format:
 *   {
 *     username: string,
 *     email: string,
 *     password: string,
 *     first_name: string,
 *     last_name: string
 *   }
 *
 * @returns {Object} - JSON response from the backend (success or error)
 *
 * TODO:
 * - Add error handling for specific backend validation errors (e.g., duplicate email).
 * - Integrate with frontend signup form UI for user feedback.
 */
export async function signupAPI(userData) {
  const response = await fetch(`${BASE_URL}/signup/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    // TODO: Add more descriptive error messages based on response
    throw new Error('Signup failed');
  }

  return response.json();
}