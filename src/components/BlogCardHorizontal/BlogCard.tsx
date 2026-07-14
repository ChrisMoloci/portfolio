import styles from "./BlogCard.module.css"

type Props = {
    url: string,
    title: string,
    author: string,
    date: string,
    description: string,
    thumbnail: {url: string, alt: string},
}

function BlogCard(props: Props) {
    const thumbnail = "/src/assets/images/" + props.thumbnail.url

    return (
        <a href={props.url} className={styles.blogCard}>
            <div className={styles.image}>
                <img src={thumbnail} alt={props.thumbnail.alt}/>
            </div>

            <div className={styles.content}>
                <h3>{props.title}</h3>

                <div className={styles.text}>
                    <span className={styles.authorDate}>
                        <span className={styles.date}>{props.date}</span>

                        &bull;

                        <span className={styles.author}>{props.author}</span>
                    </span>

                    <p className={styles.description}>{props.description}</p>
                </div>
            </div>
        </a>
    )
}

export default BlogCard;