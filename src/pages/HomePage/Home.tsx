import styles from "./Home.module.css"
import ContactLinks from "../../components/ContactLinks/ContactLinks.tsx";
import profilePic from "./../../assets/images/christianmoloci.png";
import LinkButton from "../../components/LinkButton/LinkButton.tsx";

function Home() {
    return (
        <>
            <main>
                <section className={styles.hero}>
                    <div className={styles.heroText}>
                        <ContactLinks />
                        <h3>Web Developer</h3>
                        <h1>Christian<br/>Moloci</h1>
                        <p className={styles.desc}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aut blanditiis consequuntur, dicta facilis fugit illo nemo obcaecati qui suscipit temporibus ullam veritatis. Aspernatur atque explicabo hic non quos rem!
                        </p>
                        <div className={styles.buttonLinks}>
                            <LinkButton link="#" text="Resume" />
                            <LinkButton link="#footer" text="Contact" />
                        </div>
                    </div>
                    
                    <div className={styles.heroImage}>
                        <img src={profilePic} alt="Picture of Christian Moloci"/>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home