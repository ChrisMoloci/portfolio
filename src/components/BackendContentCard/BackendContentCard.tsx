import styles from './BackendContentCard.module.css'
import {NavLink} from "react-router";
import {api} from "../../api/client.ts";

type Props = {
    title: string,
    date: Date,
    type: "project" | "post",
    slug: string
}

function BackendContentCard(props: Props) {
    const baseURL = import.meta.env.BASE_URL + "/" + props.type === "project" ? "projects" : "posts" + "/" + props.slug;

    const deleteContent = async () => {
        await api.delete(baseURL)
    }

    return (
        <div className={styles.contentCard}>
            <div className={styles.text}>
                <h1 className={styles.title}>{props.title}</h1>
                <span className={styles.date}>{props.date.toDateString()}</span>
            </div>
            <div className={styles.options}>
                <NavLink to={`admin/post/${props.slug}`} className={styles.edit}>Edit</NavLink>
                <span className={styles.publish}>Publish</span>
                <span onClick={() => deleteContent()} className={styles.delete}>Delete</span>
            </div>
        </div>
    )
}

export default BackendContentCard