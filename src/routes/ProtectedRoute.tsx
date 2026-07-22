import {useContext} from "react";
import AuthContext from "../context/AuthContext.ts";
import {Navigate, Outlet, useLocation} from "react-router";

function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) return <div>Loading...</div>

    return isAuthenticated
        ? <Outlet />
        : <Navigate
            to="/login"
            replace
            state={{from: location}}
        />;
}

export default ProtectedRoute;