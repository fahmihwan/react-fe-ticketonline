import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
// import Cookies from 'js-cookie';

export const ProtectedRouteUser = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('auth'))
    return user ? element : <Navigate to="/" />
}

export const ProtectedRouteAdmin = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('auth'))
    return user && user.role == 'ADMIN' ? element : <Navigate to="/admin/login" />
}

export const ProtectedRouteChecker = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('auth'))
    return user && user.role == 'CHECKER' ? element : <Navigate to="/admin/login" />
}