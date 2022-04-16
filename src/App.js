import { Routes, Route, Link, Navigate } from "react-router-dom";
import './App.css'
import { useDispatch, useSelector } from 'react-redux';

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';

import DashboardScreen from './screens/user/DashboardScreen';
import QuestionScreen from './screens/user/QuestionScreen';
import ResultsScreen from './screens/user/ResultsScreen';

import AdminDashboard from './screens/admin/AdminDashboard';
import ManagerUser from "./screens/admin/ManagerUser";

import RequireAuth from "./protected/RequireAuth";
import AdminAuth from "./protected/AdminAuth";
import UserAuth from "./protected/UserAuth";
import RestrictLoginAndRegister from "./protected/RestrictLoginAndRegister";
import { useEffect } from "react";
import { handleTokenExpired } from "./ultis/token";


function App() {
  //khai baos
  const {userInfo} = useSelector(state => state.user)
  const dispatch = useDispatch()

    const accesstoken = userInfo?.tokens.access
    const refreshtoken = userInfo?.tokens.refresh
  
  useEffect(() => {
    if( userInfo != null){      
      handleTokenExpired(accesstoken, dispatch, refreshtoken)
    }
  }, [accesstoken])
  return (
    <div className="App">
      <Routes>
        <Route element={<RestrictLoginAndRegister />}>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Route>

        <Route element={<RequireAuth />}>

          <Route element={<UserAuth />}>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/question" element={<QuestionScreen />} />
            <Route path="/results" element={<ResultsScreen />} />
          </Route>

          <Route element={<AdminAuth />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/manager-user" element={<ManagerUser />} />
          </Route>

        </Route>

      </Routes>
    </div>
  );
}

export default App;

