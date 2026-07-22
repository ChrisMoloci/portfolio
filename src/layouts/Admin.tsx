import styles from "./Admin.module.css"
import {Outlet} from "react-router";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar.tsx";

function Admin() {
    return (
        <>
            <div className={styles.adminLayout}>
                <AdminSidebar />
                <Outlet/>
            </div>
        </>
    )
}

export default Admin
