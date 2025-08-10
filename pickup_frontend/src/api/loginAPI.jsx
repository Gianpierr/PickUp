export async function loginAPI(userData) {
  const response = await fetch('http://localhost:8000/api/auth/login/', { // put Django backend URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  const errorData = await response.json();

  if (!response.ok) {
    throw new Error(errorData.data || 'Login failed!');
  }

  return await response.json();
}