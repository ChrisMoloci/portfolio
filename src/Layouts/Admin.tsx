import './Admin.css'
import {Outlet} from "react-router";
import Header from "../components/Header/Header.tsx";

function Admin() {
    return (
        <>
            <Header />
            <Outlet/>
        </>
    )
}

export default Admin
