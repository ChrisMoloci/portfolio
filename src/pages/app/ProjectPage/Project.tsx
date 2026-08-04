import styles from "./Projects.module.css";
import {useParams} from "react-router";
import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import type {Project} from "../../../types/Project.ts";
import transformProject from "../../../transformers/transformProject.ts";
import {api} from "../../../api/client.ts";
import type {ApiState} from "../../../types/ApiState.ts";
import remarkGfm from "remark-gfm";
import markdownComponents from "../../../constants/markdownComponents.tsx";
import "../../../markdown.css";

function Project() {
    const { slug } = useParams();
    const [ projectData, setProjectData ] = useState<ApiState<Project>>(() => ({ status: "loading" }));

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
            <title>{projectData.status === "success" ? projectData.data.name : "Project"}</title>
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

                            <div className={"markdown"}>
                                <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                    {projectData.data.content}
                                </Markdown>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            {projectData.data.accessLinks &&
                                <div className={styles.sidebarEntries}>
                                    <h3>Access:</h3>
                                    <div className={styles.sidebarItems}>
                                        {projectData.data.accessLinks.map((item) =>
                                            <a href={item.url} target={"_blank"}>{item.label}</a>
                                        )}
                                    </div>
                                </div>
                            }

                            {projectData.data.contributors &&
                                <div className={styles.sidebarEntries}>
                                    <h3>Contributors:</h3>
                                    <div className={styles.sidebarItems}>
                                        {projectData.data.contributors.map((item) =>
                                            <a href={item.url} target={"_blank"}>{item.label}</a>
                                        )}
                                    </div>
                                </div>
                            }
                            {projectData.data.version &&
                                <div className={styles.sidebarEntries}>
                                    <h3>About:</h3>
                                    <div className={styles.sidebarItems}>
                                        <span><strong>Version:</strong> {projectData.data.version}</span>
                                    </div>
                                </div>
                            }
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