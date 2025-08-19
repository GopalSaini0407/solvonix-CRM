import axios from "axios";

const token = localStorage.getItem("login_token");

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // 👈 env se le raha hai
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// agar token badalta hai to update karne ke liye ek helper
export const setAuthToken = (newToken) => {
  localStorage.setItem("login_token", newToken);
  api.defaults.headers["Authorization"] = `Bearer ${newToken}`;
};

export default api;
