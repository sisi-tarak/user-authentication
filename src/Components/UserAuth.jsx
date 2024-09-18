import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUsername = localStorage.getItem("username");
    if (storedAuth === "true" && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const login = async (username, password) => {
    // In a real app, you'd make an API call here
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setUsername(username);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};
