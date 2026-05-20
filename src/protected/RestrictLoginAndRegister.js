import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RestrictLoginAndRegister() {
    const userInfo = useSelector((state) => state.userInfo);
    if (userInfo != null) {
      return <Navigate to="/"  />;
    }
  
    return <Outlet />;
}

export default RestrictLoginAndRegister