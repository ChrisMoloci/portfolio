import styles from "./EducationCard.module.css"

type Props = {
    institution: string,
    course: string,
    type: string,
    timeSpan: string
}

function EducationCard(props: Props) {
    return (
        <div className={styles.educationCard}>
            <div className={styles.header}>
                <span className={styles.type}>{props.type}</span>

                <span className={styles.timeSpan}>{props.timeSpan}</span>
            </div>
            <h3>{props.institution}</h3>
            <h5>{props.course}</h5>
        </div>
    )
}

export default EducationCard;