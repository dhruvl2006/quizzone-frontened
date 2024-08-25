import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = ({ element }) => {
  const isAuthenticatedAdmin = !!localStorage.getItem("token");
  return isAuthenticatedAdmin ? element : <Navigate to="/login/adminlogin" />;
};

export default ProtectedRouteAdmin;
