import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo && userInfo.data.isAdmin ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
}
