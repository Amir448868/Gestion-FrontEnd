/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || null;
  });

  const login = (username, token) => {
    const newUser = { username, token };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", token); // Guarda el token también
    setIsAuthenticated(newUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // También elimina el token
    setIsAuthenticated(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
