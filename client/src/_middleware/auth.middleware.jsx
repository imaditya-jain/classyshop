import { Navigate, useLocation } from 'react-router-dom'

/* eslint-disable react/prop-types */

const AuthMiddleware = ({ isAuthenticated, user, children }) => {
    const location = useLocation()

    if (!isAuthenticated && !location.pathname.startsWith('/auth')) {
        return <Navigate to="/auth/login" />
    }

    if (isAuthenticated && user && location.pathname.startsWith('/auth')) {
        return user?.role === "admin" ? (
            <Navigate to="/admin/dashboard" />
        ) : (
            <Navigate to="/" />
        )
    }

    if (isAuthenticated && user && location.pathname.startsWith('/admin')) {
        return user?.role === "admin" ? (
            children
        ) : (
            <Navigate to="/" />
        )
    }

    if (isAuthenticated && user && !location.pathname.startsWith('/admin')) {
        return user?.role === "admin" ? (
            <Navigate to="/admin/dashboard" />
        ) : (
            children
        )
    }


    return <>{children}</>
}

export default AuthMiddleware
