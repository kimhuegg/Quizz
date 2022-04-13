import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminAuth() {
  const role = useSelector((state) => state.user.userInfo.user.role);
  let location = useLocation();

  if (role == "user") {
    return <Navigate to="/"  state={{ from: location }}/>;
  }
  return (
    <>
      <Outlet />;
    </>
  );
}