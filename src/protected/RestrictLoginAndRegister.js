import React from 'react'
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RestrictLoginAndRegister() {
    const userInfo = useSelector((state) => state.userInfo);
    let location = useLocation();
    if (userInfo != null) {
      return <Navigate to="/"  />;
    }
  
    return <Outlet />;
}

export default RestrictLoginAndRegister