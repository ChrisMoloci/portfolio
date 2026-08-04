import HeaderDesktop from "./HeaderDesktop.tsx";
import {useEffect, useState} from "react";
import styles from "./Header.module.css";
import HeaderMobile from "./HeaderMobile.tsx";

function Header() {
    const [ windowWidth, setWindowWidth ] = useState(() => window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [windowWidth])

    return (
        <>
            <header className={styles.header}>
                {windowWidth > 500 && <HeaderDesktop />}
                {windowWidth <= 500 && <HeaderMobile />}
            </header>
        </>
    )
}

export default Header