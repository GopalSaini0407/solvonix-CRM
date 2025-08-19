import React, { createContext, useState, useEffect } from "react";

// Context create
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Mount hone par localStorage se token nikal lo
  useEffect(() => {
    const savedToken = localStorage.getItem("login_token"); // yahan tumhare login page ka key
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false); // token check hone ke baad loading complete
  }, []);

  // Login function
  const login = (newToken) => {
    localStorage.setItem("login_token", newToken.token);
    console.log(newToken.token)
    setToken(newToken.token);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("login_token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
