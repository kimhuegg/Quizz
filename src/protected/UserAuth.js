import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserAuth() {
  const role = useSelector((state) => state.user.userInfo.user.role);
  let location = useLocation();

  if (role == "admin") {
    return <Navigate to="/admin-dashboard" />;
  }
  return (
    <>
      <Outlet />;
    </>
  );
}