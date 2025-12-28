import { useState, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    return token
      ? { token, role, name, email }
      : null;
  });

  const login = (token, role, userData = {}) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    if (userData.name) {
      localStorage.setItem("name", userData.name);
    }
    if (userData.email) {
      localStorage.setItem("email", userData.email);
    }

    setUser({
      token,
      role,
      name: userData.name || null,
      email: userData.email || null,
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
