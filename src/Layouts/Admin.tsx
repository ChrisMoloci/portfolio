import styles from "./Admin.module.css"
import {Outlet} from "react-router";
import Header from "../components/Header/Header.tsx";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar.tsx";

function Admin() {
    return (
        <>
            <Header />

            <div className={styles.adminLayout}>
                <AdminSidebar />
                <Outlet/>
            </div>
        </>
    )
}

export default Admin
