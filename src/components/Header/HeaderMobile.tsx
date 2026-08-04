import styles from "./HeaderMobile.module.css"
import {useContext, useState} from "react";
import {NavLink} from "react-router";
import AuthContext from "../../context/AuthContext.ts";

type HamburgerProps = {
    setIsOpen: (isOpen: boolean) => void;
}

function HamburgerMenu(props: HamburgerProps) {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className={styles.hamburgerMenu}>
            <div className={styles.closeContainer} onClick={() => props.setIsOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                    <path d="M2.80702 20L0 17.193L7.21805 9.97494L0 2.80702L2.80702 0L10.0251 7.21805L17.193 0L20 2.80702L12.782 9.97494L20 17.193L17.193 20L10.0251 12.782L2.80702 20Z" fill="#F7F6ED"/>
                </svg>
            </div>
            <h1>Menu</h1>
            <nav onClick={() => props.setIsOpen(false)}>
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

                {isAuthenticated &&
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            isActive ? styles.active : undefined
                        }
                    >Admin</NavLink>
                }
            </nav>
        </div>
    )
}

function HeaderMobile() {
    const [hamburgerShown, setHamburgerShown] = useState(false)

    return (
        <>
            <div className={styles.nav}>
                <div onClick={() => {
                    setHamburgerShown(!hamburgerShown)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20" fill="none">
                        <path d="M2.17993 20C1.58016 20 1.0669 19.7866 0.640138 19.3599C0.213379 18.9331 0 18.4198 0 17.8201C0 17.2203 0.213379 16.707 0.640138 16.2803C1.0669 15.8535 1.58016 15.6401 2.17993 15.6401H25.0865C25.6863 15.6401 26.1995 15.8535 26.6263 16.2803C27.0531 16.707 27.2664 17.2203 27.2664 17.8201C27.2664 18.4198 27.0531 18.9331 26.6263 19.3599C26.1995 19.7866 25.6863 20 25.0865 20H2.17993ZM2.17993 12.1799C1.58016 12.1799 1.0669 11.9666 0.640138 11.5398C0.213379 11.113 0 10.5998 0 10C0 9.40023 0.213379 8.88697 0.640138 8.46021C1.0669 8.03345 1.58016 7.82007 2.17993 7.82007H25.0865C25.6863 7.82007 26.1995 8.03345 26.6263 8.46021C27.0531 8.88697 27.2664 9.40023 27.2664 10C27.2664 10.5998 27.0531 11.113 26.6263 11.5398C26.1995 11.9666 25.6863 12.1799 25.0865 12.1799H2.17993ZM2.17993 4.35986C1.58016 4.35986 1.0669 4.14648 0.640138 3.71972C0.213379 3.29296 0 2.7797 0 2.17993C0 1.58016 0.213379 1.0669 0.640138 0.640138C1.0669 0.213379 1.58016 0 2.17993 0H25.0865C25.6863 0 26.1995 0.213379 26.6263 0.640138C27.0531 1.0669 27.2664 1.58016 27.2664 2.17993C27.2664 2.7797 27.0531 3.29296 26.6263 3.71972C26.1995 4.14648 25.6863 4.35986 25.0865 4.35986H2.17993Z"/>
                    </svg>
                </div>
            </div>

            {hamburgerShown && <HamburgerMenu setIsOpen={setHamburgerShown} />}
        </>
    )
}

export default HeaderMobile;