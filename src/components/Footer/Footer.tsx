import styles from "./Footer.module.css"
import ContactLinks from "../ContactLinks/ContactLinks.tsx";
import {useState} from "react";
import {api} from "../../api/client.ts";

function Footer() {
    const [ successText, setSuccesText ] = useState<string>("");
    const [ errorText, setErrorText ] = useState<string>("")

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        try {
            const formData = new FormData(e.target);

            const email = formData.get('email') as string;
            const name = formData.get('name') as string;
            const message = formData.get('message') as string;

            if (!name || !email || !message) throw Error("Missing required fields");

            if (name.length > 100) throw Error("Name too long");
            if (!emailRegex.test(email)) throw Error("email invalid");
            if (message.length > 2000) throw Error("Message too long (max length: 2000 characters)");

            const data = {
                email, name, message
            }

            await api.post("contact", data);

            setErrorText("");
            setSuccesText("Message successfully sent! Keep an eye on your email and I'll get back to you as soon as I can.")
        } catch (error: any) {
            setErrorText(error.response?.data.message ?? error.message);
            setSuccesText("")
        }
    }

    return (
        <>
            <footer id="footer" className={styles.footer}>
                <div className={styles.footerContent}>
                    <h1>Contact</h1>
                    <h2>Learn more or get in touch with me:</h2>
                    <span>
                        <ContactLinks />
                    </span>

                    <span className={styles.divider}>
                        <span>or</span>
                    </span>

                    <p className={styles.successText}>{successText}</p>

                    <form className={styles.contactForm} onSubmit={onSubmit}>
                        <label htmlFor="name">Name:
                            <input type="text" name="name" id="name" placeholder="John Smith..." required />
                        </label>

                        <label htmlFor="email">email
                            <input type="email" name="email" id="email" placeholder="example@example.com..." required />
                        </label>

                        <label htmlFor="message">Message:
                            <textarea name="message" id="message" rows={5} placeholder="message..." required />
                        </label>

                        <button type="submit">Submit</button>
                    </form>

                    {errorText &&
                        <p className={"errorText"}>{errorText}</p>
                    }
                </div>

                <div className={styles.copyrightSection}>
                    <small>&copy; 2026 Christian Moloci</small>
                </div>
            </footer>
        </>
    )
}

export default Footer;