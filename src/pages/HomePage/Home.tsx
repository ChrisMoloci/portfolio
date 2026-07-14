import styles from "./Home.module.css"
import ContactLinks from "../../components/ContactLinks/ContactLinks.tsx";
import profilePic from "./../../assets/images/christianmoloci.png";
import LinkButton from "../../components/LinkButton/LinkButton.tsx";
import {NavLink} from "react-router";
import ProjectCard from "../../components/ProjectCard/ProjectCard.tsx";
import BlogCard from "../../components/BlogCard/BlogCard.tsx";

function Home() {
    return (
        <>
            <main className={styles.main}>
                {/* Hero Section */}
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

                {/* Page Content */}
                <div className={styles.homeContent}>
                    {/* Featured Projects */}
                    <section className={styles.featuredProjects + " " + styles.section}>
                        <div className={styles.content}>
                            <h1>Featured Projects:</h1>

                            <div className={styles.cards}>
                                <ProjectCard
                                    url={"#"}
                                    thumbnail={{
                                        url: "placeholder.png",
                                        alt: ""
                                    }}
                                    title={"Project Card"}
                                    date={"2026"}
                                    description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                                    languages={["html", "css", "js", "react"]}
                                />
                            </div>

                            <div className={styles.cards}>
                                <ProjectCard
                                    url={"#"}
                                    thumbnail={{
                                        url: "placeholder.png",
                                        alt: ""
                                    }}
                                    title={"Project Card"}
                                    date={"2026"}
                                    description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                                    languages={["html", "css", "js", "react"]}
                                />
                            </div>

                            <div className={styles.cards}>
                                <ProjectCard
                                    url={"#"}
                                    thumbnail={{
                                        url: "placeholder.png",
                                        alt: ""
                                    }}
                                    title={"Project Card"}
                                    date={"2026"}
                                    description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                                    languages={["html", "css", "js", "react"]}
                                />
                            </div>

                            <NavLink to={"/projects"}>All Projects</NavLink>
                        </div>
                    </section>

                    <hr/>

                    {/* Elevator Pitch */}
                    <section className={styles.elevatorPitch + " " + styles.section}>
                        <h1>Who am I?</h1>
                        <div className={styles.content}>
                            <div className={styles.text}>
                                <p>
                                    Computer Programming graduate with a 4.0 GPA, recognized as the top-performing student in the program. Experienced in [developing React and Angular web applications using TypeScript, Node.js, and SQL databases]. Developed LLQR, a TypeScript QR Code generator library built from scratch, cleanly implementing low-level concepts including data encoding, Reed-Solomon error correction, data masking, and datastream optimization algorithms.
                                </p>
                            </div>

                            <div className={styles.video}>
                                <iframe
                                    src="https://www.youtube.com/embed/LDU_Txk06tM?si=2q8GF-q_ZgVDGPW8"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen></iframe>
                            </div>
                        </div>

                        <NavLink to={"/about"}>Vist About Page</NavLink>
                    </section>

                    <hr/>

                    {/* Latest Blog Posts */}
                    <section className={styles.latestPosts + " " + styles.section}>
                        <div className={styles.content}>
                            <h1>Latest Blog Posts:</h1>

                            <div className={styles.cards}>
                                <BlogCard
                                    url={"#"}
                                    title={"Blog Card Card"}
                                    author={"First Last"}
                                    date={"July 14, 2026"}
                                    description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                                    thumbnail={{url: "placeholder.png", alt: ""}}
                                />

                                <BlogCard
                                    url={"#"}
                                    title={"Blog Card"}
                                    author={"First Last"}
                                    date={"July 14, 2026"}
                                    description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                                    thumbnail={{url: "placeholder.png", alt: ""}}
                                />

                                <BlogCard
                                    url={"#"}
                                    title={"Blog Card"}
                                    author={"First Last"}
                                    date={"July 14, 2026"}
                                    description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                                    thumbnail={{url: "placeholder.png", alt: ""}}
                                />
                            </div>

                            <NavLink to={"/blog"}>More Posts</NavLink>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Home