import styles from "./Projects.module.css";
import {useParams} from "react-router";
import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import type {Project} from "../../types/Project.ts";
import transformProject from "../../transformers/transformProject.ts";
import {api} from "../../api/client.ts";

function Project() {
    const { slug } = useParams();
    const [ projectData, setProjectData ] = useState<Project>();
    const featuredImageURL = import.meta.env.VITE_MEDIA_DIR + "/" + projectData?.featuredImage?.storageKey + ".webp"

    const fetchProjectData = async () => {
        const response = await api.get(`/projects/${slug}`);

        const data = transformProject(response.data);

        setProjectData(data);
    }

    useEffect(() => {
        fetchProjectData();
    })

    return (
        <main className={styles.main}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.subHeading}>{projectData?.category.name}</h2>
                <h1 className={styles.heading}>{projectData?.name}</h1>
                <span className={styles.authorDate}>
                    <span className={styles.author}>{projectData?.author.name}</span>
                    &bull;
                    <span className={styles.date}>{projectData?.createdAt.toDateString()}</span>
                </span>
            </div>

            {/* Main Content */}
            <div className={styles.project}>
                {/* Article */}
                <div className={styles.content}>
                    <img src={featuredImageURL} alt={projectData?.featuredImage?.alt}/>

                    <div className={styles.markdown}>
                        {/* TODO: Implement MDX Parsing */}
                        <Markdown>{projectData?.content}</Markdown>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    {/*{project.misc.map(item => {*/}
                    {/*    return (*/}
                    {/*        <div className={styles.sidebarEntries}>*/}
                    {/*            <h3 className={styles.entryTitle}>{item.title}</h3>*/}
                    {/*            <div className={styles.sidebarItems}>*/}
                    {/*                {item.values.map(item =>*/}
                    {/*                    item.url ? <a href={item.url}>{item.name}</a> : <p>{item.name}</p>*/}
                    {/*                )}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*})}*/}
                </aside>
            </div>
        </main>
    )
}

export default Project;