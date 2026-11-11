// Central place for the backend URL.
// Local:  set VITE_API_URL in the .env file
// Render: set VITE_API_URL in Environment Variables (the friend's backend link)
const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// remove any trailing "/" so we never get "//" in a request URL
export const API_URL = rawUrl.replace(/\/+$/, '');

// Small wrapper around fetch. Use it inside src/services/*.js, e.g.
//   import { apiRequest } from '../config/api';
//   const res = await apiRequest('/api/donors');
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // response had no JSON body
  }

  if (!response.ok) {
    const message = (data && data.message) || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}
