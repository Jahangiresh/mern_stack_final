import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? children : <Navigate to="/signin" />;
}
