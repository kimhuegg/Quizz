import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserAuth() {
  const role = useSelector((state) => state.user.userInfo.user.role);

  if (role === "admin") {
    return <Navigate to="/admin-dashboard" />;
  }
  return (
    <>
      <Outlet />;
    </>
  );
}