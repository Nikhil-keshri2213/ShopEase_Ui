import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'authToken'; // keep the key consistent

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const logOut = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime; // true if not expired
  } catch (error) {
    console.error('Invalid Token', error);
    return false;
  }
};
