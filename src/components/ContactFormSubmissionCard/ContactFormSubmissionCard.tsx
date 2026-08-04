import styles from "./ContactFormSubmissionCard.module.css"
import LinkButton from "../LinkButton/LinkButton.tsx";
import {useState} from "react";

type Props = {
    id: number,
    name: string,
    email: string,
    message: string,
    date: Date,
    onDelete: (id: number) => Promise<boolean>,
}

function ContactFormSubmissionCard(props: Props) {
    const [ errorText, setErrorText ] = useState<string>("");

    const deleteMessage = async() => {
        const deleted = await props.onDelete(props.id);

        console.log(deleted);

        if (!deleted) setErrorText("Unable to delete message");
    }

    return (
        <div className={styles.contactFormSubmissionCard}>
            <div className={styles.contactInfo}>
                <h1>{props.name}</h1>

                <div className={styles.emailDate}>
                    <span>{props.email}</span>
                    &bull;
                    <span>{props.date.toDateString()}</span>
                </div>
            </div>

            <p className={styles.textContent}>
                {props.message}
            </p>

            {errorText &&
                <p className={"errorText"}>{errorText}</p>
            }

            <div className={styles.buttons}>
                <LinkButton link={`mailto:${props.email}`} text={"email back"} newTab={false} />
                <button className={"errorText"} onClick={deleteMessage}>Delete</button>
            </div>
        </div>
    )
}

export default ContactFormSubmissionCard;