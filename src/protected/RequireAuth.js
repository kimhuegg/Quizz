import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth() {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo)
  let location = useLocation();
  if (userInfo == null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}