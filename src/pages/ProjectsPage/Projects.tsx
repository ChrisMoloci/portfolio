import styles from "./Projects.module.css"
import ProjectCard from "../../components/ProjectCard/ProjectCard.tsx";
import LinkButton from "../../components/LinkButton/LinkButton.tsx";

function Projects() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Projects</h1>

                        <LinkButton link={"#"} text={"GitHub"} />
                    </div>
                </div>

                <div className={styles.content}>
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
            </main>
        </>
    )
}

export default Projects;