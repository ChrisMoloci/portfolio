import styles from "./HeaderDesktop.module.css"
import {NavLink} from "react-router";

function HeaderDesktop() {
    return (
        <>
            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }>Home</NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }
                >Projects</NavLink>
                <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }>Blog</NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }
                >About</NavLink>
            </nav>
        </>
    )
}

export default HeaderDesktop