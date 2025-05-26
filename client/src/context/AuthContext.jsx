import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (err) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [token]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      localStorage.setItem("role", currentUser.role);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    }
  }, [currentUser]);

  const login = (userData, authToken) => {
    if (!userData || !authToken) {
      console.warn("Login failed: userData or token missing");
      return;
    }
    setCurrentUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    navigate("/login");
  };
  // console.log(role)

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout ,   role: currentUser?.role || localStorage.getItem("role"), }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
