import styles from "./Projects.module.css"
import ProjectCard from "../../components/ProjectCard/ProjectCard.tsx";
import LinkButton from "../../components/LinkButton/LinkButton.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import {useEffect, useState} from "react";

const filters = [
    {
        category: "Language:",
        options: [
            {
                key: "html",
                value: "HTML",
                set: false,
            },
            {
                key: "css",
                value: "CSS",
                set: false
            },
            {
                key: "javascript",
                value: "JavaScript",
                set: false
            },
            {
                key: "typescript",
                value: "TypeScript",
                set: false
            },
            {
                key: "java",
                value: "Java",
                set: false
            }
        ]
    },
    {
        category: "Type:",
        options: [
            {
                key: "frontEnd",
                value: "Front-End",
                set: false
            },
            {
                key: "backEnd",
                value: "Back-End",
                set: false
            },
            {
                key: "fullStack",
                value: "Full Stack",
                set: false
            }
        ],
    },
    {
        category: "Tools & Frameworks:",
        options: [
            {
                key: "nodejs",
                value: "Node.js",
                set: false
            },
            {
                key: "react",
                value: "React",
                set: false
            },
            {
                key: "angular",
                value: "Angular",
                set: false
            },
            {
                key: "tsup",
                value: "tsup",
                set: false
            }
        ]
    }
];

function Projects() {
    const [searchFilter, setSearchFilter] = useState(() => [...filters]);

    useEffect(() => {
        console.log(searchFilter);
    }, [searchFilter])

    return (
        <>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Projects</h1>

                        <LinkButton link={"#"} text={"GitHub"} />
                    </div>

                    <Filter filterCategories={searchFilter} onChange={setSearchFilter} />
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