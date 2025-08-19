import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contextAPI/contextAuth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useContext(AuthContext);

  // Token load hone tak wait karo
  if (isLoading) return null; // ya loader component use kar sakte ho

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
