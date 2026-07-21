import styles from "./Projects.module.css"
import ProjectCard from "../../../components/ProjectCard/ProjectCard.tsx";
import LinkButton from "../../../components/LinkButton/LinkButton.tsx";
import Filter, {type FilterItem, type Filters} from "../../../components/Filter/Filter.tsx";
import {useEffect, useState} from "react";
import {api} from "../../../api/client.ts";
import type {Project} from "../../../types/Project.ts";
import transformProject from "../../../transformers/transformProject.ts";
import type {ApiState} from "../../../types/ApiState.ts";
import type {AxiosResponse} from "axios";

function Projects() {
    const [searchFilters, setSearchFilters] = useState<ApiState<Filters>>({ status: "loading" })
    const [projectData, setProjectData] = useState<ApiState<Array<Project>>>({ status: "loading" });

    const fetchProjects = async (queryString: string = "") => {
        try {
            const response = await api.get("/projects" + queryString);

            // Map the posts to BlogPost type
            const data: ApiState<Array<Project>> = {
                status: "success",
                data: response.data.map((project: Project) => transformProject(project))
            }

            setProjectData(data);
        } catch(error: any) {
            setProjectData({ status: "error", error: error.message });
            return;
        }
    }

    const fetchFilters = async () => {
        let tags: AxiosResponse;
        let categories: AxiosResponse;

        try {
            tags = await api.get("/tags");
            categories = await api.get("/project-categories");
        } catch (error: any) {
            setSearchFilters({ status: "error", error: error.message });
            return;
        }

        const tagData: Array<FilterItem> = tags.data.map((tag: FilterItem) => {
            return {
                name: tag.name,
                slug: tag.name, // Tags don't have slugs
                selected: false,
                type: "tag"
            }
        });
        const categoryData: Array<FilterItem> = categories.data.map((category: FilterItem) => {
            return {
                name: category.name,
                slug: category.slug,
                selected: false,
                type: "category"
            }
        })

        const data: Filters = [
            ...(tagData.length < 0 ? [{
                label: "Tags",
                filters: tagData
            }] : []),
            ...(categoryData.length ? [{
                label: "Categories",
                filters: categoryData
            }] : [])
        ];

        if (data.length === 0) {
            setSearchFilters( { status: "error", error: "Filtering not available at the moment." });
        } else {
            setSearchFilters({ status: "success", data: data });
        }
    }

    // Gets data from api
    useEffect(() => {
        fetchProjects();
        fetchFilters();
    }, []);

    // When search filters gets updated, a new query for posts is made
    useEffect(() => {
        if (searchFilters?.status !== "success") return;

        const queryTags: string | undefined = searchFilters.data.filter(filterCollection =>
            filterCollection.label === "Tags")
            .map(filterCollection =>
                filterCollection.filters
                    .filter(filter => filter.selected)
                    .map((filter, index) => (index === 0 ? "" : "&") + "tag=" + filter.slug)
            ).flat().join("");

        const queryCategories: string | undefined = searchFilters.data.filter(filterCollection =>
            filterCollection.label === "Categories")
            .map(filterCollection =>
                filterCollection.filters
                    .filter(filter => filter.selected)
                    .map((filter, index) => (index === 0 ? "" : "&") + "category=" + filter.slug)
            ).flat().join("");

        const queryString = "?" + queryTags +
            (queryTags && queryCategories ? "&" : "") +
            queryCategories;

        console.log(queryString);

        fetchProjects(queryString);
    }, [searchFilters]);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Projects</h1>

                        <LinkButton link={"https://github.com/ChrisMoloci"} text={"GitHub"} newTab={true} />
                    </div>

                    {searchFilters.status === "success" &&
                        <Filter filters={searchFilters.data} onChange={(filters) => setSearchFilters({ status: "success", data: filters })} />
                    }
                    {searchFilters.status === "error" &&
                        <p>Error: {searchFilters.error}</p>
                    }
                </div>

                <div className={styles.content}>
                    {projectData.status === "success" && projectData.data.map((project: Project) => (
                        <ProjectCard
                            key={project.slug}
                            thumbnail={({url: project.featuredImage?.storageKey ?? "", alt: project.featuredImage?.alt ?? ""})}
                            title={project.name}
                            description={project.content}
                            date={project.createdAt.toDateString()}
                            url={project.slug}
                            languages={project.tags.map(tag => tag.name)}
                        />
                    ))}
                    {projectData.status === "success" && projectData.data.length === 0 &&
                        <p>No results.</p>
                    }
                    {projectData.status === "error" &&
                        <p>Error: {projectData.error}</p>
                    }
                </div>
            </main>
        </>
    )
}

export default Projects;