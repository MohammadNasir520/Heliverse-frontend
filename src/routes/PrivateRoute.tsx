import { Navigate, useLocation } from "react-router-dom";
import { getUserInfo } from "../utils/jwt";
import React from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userId } = getUserInfo() as any;
  const location = useLocation();

  if (userId) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
