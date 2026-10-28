
import { useState } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || savedUser === "undefined") {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid saved user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (data) => {
    setUser(data.user);

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.access_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

