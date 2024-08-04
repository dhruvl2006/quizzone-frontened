import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
    setLoading(false);
  }, []);

  console.log("Window location", window.location);

  if (loading) return null;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
