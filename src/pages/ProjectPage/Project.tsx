import styles from "./Projects.module.css";
import {useParams} from "react-router";

function Project() {
    const { slug } = useParams();

    return (
        <main className={styles.main}>
            {slug}
        </main>
    )
}

export default Project;