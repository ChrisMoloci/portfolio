import styles from "./Posts.module.css"
import BackendContentCard from "../../../components/BackendContentCard/BackendContentCard.tsx";

function Posts() {
    return (
        <main className={styles.main}>
            <BackendContentCard title={"Test Project"} date={new Date()} type={"post"} slug={"test-project"} />
        </main>
    )
}

export default Posts;