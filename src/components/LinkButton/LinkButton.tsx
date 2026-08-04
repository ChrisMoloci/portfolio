import styles from "./LinkButton.module.css"

type Props = {
    link: string,
    text: string,
    newTab: boolean,
}

function LinkButton(props: Props) {
    return (
        <a className={styles.linkButton} href={props.link} target={props.newTab ? "_blank" : "_self"}>{props.text.trim()}</a>
    )
}

export default LinkButton;