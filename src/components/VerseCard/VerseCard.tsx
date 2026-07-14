import styles from "./VerseCard.module.css";

type Props = {
    verseRef: string,
    text: string,
    translation: string
}

function VerseCard(props: Props) {
    return (
        <div className={styles.verseCard}>
            <div className={styles.header}>
                <h4 className={styles.verseRef}>{props.verseRef}</h4>

                <span className={styles.translation}>{props.verseRef}</span>
            </div>
            <p className={styles.textContent}>{props.text}</p>
        </div>
    )
}

export default VerseCard;