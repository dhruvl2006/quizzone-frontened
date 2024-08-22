import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const [student, setStudent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const studentToken = localStorage.getItem("student");

    if (token) {
      setAdmin(true);
    } else if (studentToken) {
      setStudent(true);
    }

    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <UserContext.Provider value={{ admin, setAdmin, student, setStudent }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
