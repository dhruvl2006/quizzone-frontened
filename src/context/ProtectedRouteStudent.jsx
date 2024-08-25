import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteStudent = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("student");

  return isAuthenticated ? element : <Navigate to="/login/studentlogin" />;
};

export default ProtectedRouteStudent;
