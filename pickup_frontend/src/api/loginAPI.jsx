export async function loginAPI(userData) {
  const response = await fetch('http://localhost:8000/api/login/', { // put Django backend URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
}