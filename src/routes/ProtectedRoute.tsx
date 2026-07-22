import {useContext} from "react";
import AuthContext from "../context/AuthContext.ts";
import {Navigate, Outlet} from "react-router";

function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) return <div>Loading...</div>

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/login" replace />;
}

export default ProtectedRoute;