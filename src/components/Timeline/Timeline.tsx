import styles from "./Timeline.module.css"

type Props = {
    entries: Array<{title: string, subtitle: string, timeSpan: string}>
}

function Timeline(props: Props) {
    return (
        <div className={styles.timeline}>
            {props.entries.map(entry => (
                <div className={styles.timelineEntry}>
                    <div className={styles.timelineMeta}>
                        <div className={styles.line}>
                            <div className={styles.indicator}></div>
                        </div>
                    </div>

                    <div className={styles.timelineContent}>
                        <span className={styles.timeSpan}>{entry.timeSpan}</span>

                        <h3>{entry.title}</h3>

                        <p className={styles.subtitle}>{entry.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Timeline;