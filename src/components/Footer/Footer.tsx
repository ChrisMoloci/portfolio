import styles from "./Footer.module.css"
import ContactLinks from "../ContactLinks/ContactLinks.tsx";

function Footer() {
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

                    <form className={styles.contactForm} action="">
                        <label htmlFor="name">Name:
                            <input type="text" name="name" id="name" placeholder="John Smith..." />
                        </label>

                        <label htmlFor="email">email
                            <input type="email" name="email" id="email" placeholder="example@example.com..." />
                        </label>

                        <label htmlFor="message">Message:
                            <textarea name="message" id="message" rows={5} placeholder="message..." />
                        </label>

                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className={styles.copyrightSection}>
                    <small>&copy; 2026 Christian Moloci</small>
                </div>
            </footer>
        </>
    )
}

export default Footer;