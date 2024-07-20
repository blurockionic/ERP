import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Lead_Management/auth/Login';

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Login/>;
}

export default PrivateRoute