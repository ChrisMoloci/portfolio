import styles from "./Blog.module.css"
import LinkButton from "../../components/LinkButton/LinkButton.tsx";
import BlogCard from "../../components/BlogCard/BlogCard.tsx";

function About() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Blog</h1>

                        <LinkButton link={"#"} text={"GitHub"} />
                    </div>
                </div>

                <div className={styles.content}>
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
                        title={"Blog Card Card"}
                        author={"First Last"}
                        date={"July 14, 2026"}
                        description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                        thumbnail={{url: "placeholder.png", alt: ""}}
                    />

                    <BlogCard
                        url={"#"}
                        title={"Blog Card Card"}
                        author={"First Last"}
                        date={"July 14, 2026"}
                        description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                        thumbnail={{url: "placeholder.png", alt: ""}}
                    />
                </div>
            </main>
        </>
    )
}

export default About
