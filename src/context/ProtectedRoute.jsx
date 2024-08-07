import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user } = useContext(UserContext);

  return user ? <Element {...rest} /> : <Navigate to="/login/studentlogin" />;
};

export default ProtectedRoute;
