import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const ProtectedRoute = ({ element: Element }) => {
  const { student, admin } = useContext(UserContext);

  if (student || admin) {
    return <Element />;
  } else {
    return <Navigate to="/login/studentlogin" replace />;
  }
};

export default ProtectedRoute;
