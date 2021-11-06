import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "GW", isLogin: false });
  const handleLogin = () => setUser({ ...user, isLogin: true });
  return <UserContext.Provider value={{ user, handleLogin }}>{children}</UserContext.Provider>;
};
