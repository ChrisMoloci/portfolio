import styles from "./PageNotFound.module.css"

import {NavLink} from "react-router";

function PageNotFound() {
    return (
        <>
            <title>404 Page Not Found</title>

            <main className={styles.main}>
                <h1>Page Not Found</h1>
                <h2>Oh no! Looks like the page your looking for doesn’t exist.</h2>
                <p>This is likely due to the following:</p>
                <ul>
                    <li>The page was removed</li>
                    <li>The url is incorrect</li>
                    <li>The web server is temporarily experiencing technical difficulties </li>
                </ul>

                <NavLink className={"linkButton"} to="/">Home</NavLink>
            </main>
        </>
    )
}

export default PageNotFound;