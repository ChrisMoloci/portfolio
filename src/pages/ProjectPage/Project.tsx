import styles from "./Projects.module.css";
import {useParams} from "react-router";
import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import type {Project} from "../../types/Project.ts";
import transformProject from "../../transformers/transformProject.ts";
import {api} from "../../api/client.ts";
import type {ApiState} from "../../types/ApiState.ts";

function Project() {
    const { slug } = useParams();
    const [ projectData, setProjectData ] = useState<ApiState<Project>>({ status: "loading" });

    let featuredImageURL = "/src/assets/images/placeholder.png";

    if (projectData.status === "success" && projectData.data.featuredImage) {
        featuredImageURL = import.meta.env.VITE_MEDIA_DIR + "/" + projectData.data.featuredImage?.storageKey + ".webp"
    }

    const fetchProjectData = async () => {
        try {
            const response = await api.get(`/projects/${slug}`);

            const data: ApiState<Project> =  {
                status: "success",
                data: transformProject(response.data)
            };

            setProjectData(data);
        } catch (error: any) {
            setProjectData({ status: "error", error: error.messsage });
        }
    }

    useEffect(() => {
        fetchProjectData();
    }, []);

    return (
        <main className={styles.main}>
            {projectData.status === "success" &&
                <>
                    {/* Header */}
                    <div className={styles.header}>
                        <h2 className={styles.subHeading}>{projectData.data.category.name}</h2>
                        <h1 className={styles.heading}>{projectData.data.name}</h1>
                        <span className={styles.authorDate}>
                        <span className={styles.author}>{projectData.data.author.name}</span>
                            &bull;
                            <span className={styles.date}>{projectData.data.createdAt.toDateString()}</span>
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className={styles.project}>
                        {/* Article */}
                        <div className={styles.content}>
                            <img src={featuredImageURL} alt={projectData.data.featuredImage?.alt}/>

                            <div className={styles.markdown}>
                                {/* TODO: Implement MDX Parsing */}
                                <Markdown>{projectData.data.content}</Markdown>
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
                </>
            }
            {projectData.status === "error" &&
                <p>Error: {projectData.error}</p>
            }
        </main>
    )
}

export default Project;