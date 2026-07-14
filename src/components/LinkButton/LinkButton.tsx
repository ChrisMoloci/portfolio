import styles from "./LinkButton.module.css"

type Props = {
    link: string,
    text: string
}

function LinkButton(props: Props) {
    return (
        <a className={styles.linkButton} href={props.link}>{props.text.trim()}</a>
    )
}

export default LinkButton;