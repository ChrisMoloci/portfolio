import styles from './BackendContentCard.module.css'
import {NavLink} from "react-router";

type Props = {
    title: string,
    date: Date,
    slug: string,
    isPublic: boolean,
    publish: (slug: string, state: boolean) => void,
    delete: (slug: string) => void,

}

function BackendContentCard(props: Props) {
    return (
        <div className={styles.contentCard}>
            <div className={styles.text}>
                <h1 className={styles.title}>{props.title}</h1>
                <span className={styles.date}>{props.date.toDateString()}</span>
            </div>
            <div className={styles.options}>
                <NavLink to={`admin/post/${props.slug}`} className={styles.edit}>Edit</NavLink>
                <span onClick={() => props.publish(props.slug, !props.isPublic)} className={styles.publish}>{props.isPublic ? "Unpublish" : "Publish"}</span>
                <span onClick={() => props.delete(props.slug)} className={styles.delete}>Delete</span>
            </div>
        </div>
    )
}

export default BackendContentCard