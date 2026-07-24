import styles from "./Projects.module.css"
import {useEffect, useState} from "react";
import type {ApiState} from "../../../types/ApiState.ts";
import {api} from "../../../api/client.ts";
import transformBlog from "../../../transformers/transformBlog.ts";
import type {Project} from "../../../types/Project.ts";
import {NavLink} from "react-router";
import BackendContentCard from "../../../components/BackendContentCard/BackendContentCard.tsx";

function Projects() {
    const [ projects, setProjects ] = useState<ApiState<Array<Project>>>({ status: "loading" });

    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects?includeUnpublished=true");

            const data: ApiState<Array<Project>> = {
                status: "success",
                data: response.data.map((post: any) => transformBlog(post))
            }

            setProjects(data);
        } catch (error: any) {
            setProjects({ status: "error", error: error.message });
        }
    }

    const deleteProject = async (slug: string) => {
        await api.delete(`/projects/${slug}`);
        fetchProjects(); // Refresh
    }

    const publishProject = async (slug: string, state: boolean) => {
        await api.patch(`/projects/${slug}`, {published: state});
        fetchProjects(); // Refresh
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <main className={styles.main}>
            <title>Admin Projects</title>
            <div className={styles.header}>
                <h1>Projects</h1>

                <NavLink className={"linkButton"} to={`/admin/project`}>New Project</NavLink>
            </div>

            <section className={styles.cards}>
                {projects.status === "success" && projects.data.length > 0 &&
                    projects.data.map(project =>
                        <BackendContentCard
                            title={project.name}
                            date={project.createdAt}
                            slug={project.slug}
                            isPublic={project.published}
                            publish={publishProject}
                            delete={deleteProject}
                            editBaseURL={"project"}
                        />
                    )
                }
                {projects.status === "success" && projects.data.length === 0 &&
                    <p>No results.</p>
                }
                {projects.status === "error" &&
                    <p>Error: {projects.error}</p>
                }
            </section>
        </main>
    )
}

export default Projects;