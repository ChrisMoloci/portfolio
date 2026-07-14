import styles from "./ProjectCard.module.css"
import languageImages from "../../constants/languageImages.ts";

type Props = {
    thumbnail: {url: string, alt: string},
    title: string,
    description: string,
    date: string,
    url: string,
    languages: string[],
}

function ProjectCard(props: Props) {
    const thumbnailURL = "src/assets/images/" + props.thumbnail.url;

    return (
        <a href={props.url} className={styles.projectCard}>
            {/* Image */}
            <div className={styles.image}>
                <img src={thumbnailURL} alt={props.thumbnail.alt}/>
            </div>

            {/* Card content */}
            <div className={styles.text}>
                <div className={styles.textContainer}>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>

                {/* Card Footer */}
                <div className={styles.footer}>
                    <span>{props.date}</span>

                    {/* Display all languages/tools*/}
                    <span className={styles.languages}>
                        {
                            props.languages.map(language => <img src={languageImages[language]} alt={language} />)
                        }
                    </span>
                </div>
            </div>
        </a>
    )
}

export default ProjectCard;