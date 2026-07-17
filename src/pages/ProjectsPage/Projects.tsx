import styles from "./Projects.module.css"
import ProjectCard from "../../components/ProjectCard/ProjectCard.tsx";
import LinkButton from "../../components/LinkButton/LinkButton.tsx";
import Filter, {type FilterItem, type Filters} from "../../components/Filter/Filter.tsx";
import {useEffect, useState} from "react";
import {api} from "../../api/client.ts";
import type {Project} from "../../types/Project.ts";

function Projects() {
    const [searchFilters, setSearchFilters] = useState<Filters>()
    const [projectData, setProjectData] = useState<Array<Project>>();

    const fetchProjects = async (queryString: string = "") => {
        const response = await api.get("/projects" + queryString);

        // Map the posts to BlogPost type
        const data: Array<Project> = response.data.map((project: Project) => {
            return {
                ...project,
                createdAt: new Date(project.createdAt),
                updatedAt: new Date(project.updatedAt),
                ...project.tags.map(tag => {
                    return {
                        ...tag,
                        createdAt: new Date(tag.createdAt),
                        updatedAt: new Date(tag.updatedAt),
                    }
                }),
                projectCategories: {
                    ...project.projectCategories,
                    createdAt: new Date(project.projectCategories.createdAt),
                    updatedAt: new Date(project.projectCategories.updatedAt),
                }
            }
        })

        setProjectData(data);
    }

    const fetchFilters = async () => {
        const tags = await api.get("/tags");
        const categories = await api.get("/project-categories");

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
            {
                label: "Tags",
                filters: tagData
            },
            {
                label: "Categories",
                filters: categoryData
            }
        ];

        setSearchFilters(data);
    }

    // Gets data from api
    useEffect(() => {
        fetchProjects();
        fetchFilters();
    }, []);

    // When search filters gets updated, a new query for posts is made
    useEffect(() => {
        const queryTags: string | undefined = searchFilters?.filter(filterCollection =>
            filterCollection.label === "Tags")
            .map(filterCollection =>
                filterCollection.filters
                    .filter(filter => filter.selected)
                    .map((filter, index) => (index === 0 ? "" : "&") + "tag=" + filter.slug)
            ).flat().join("");

        const queryCategories: string | undefined = searchFilters?.filter(filterCollection =>
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

                    <Filter filters={searchFilters ?? []} onChange={setSearchFilters} />
                </div>

                <div className={styles.content}>
                    {projectData && projectData.map((project: Project) => (
                        <ProjectCard
                            key={project.slug}
                            thumbnail={({url: "placeholder.png", alt: ""})}
                            title={project.name}
                            description={project.content}
                            date={project.createdAt.toDateString()}
                            url={project.slug}
                            languages={project.tags.map(tag => tag.name)}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}

export default Projects;