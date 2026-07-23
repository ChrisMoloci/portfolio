import styles from "./Project.module.css"
import {NavLink, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {ApiState} from "../../../types/ApiState.ts";
import type {ProjectCategory} from "../../../types/ProjectCategory.ts";
import type {Project} from "../../../types/Project.ts";
import {api} from "../../../api/client.ts";
import type {BlogCategory} from "../../../types/BlogCategory.ts";
import type {Media} from "../../../types/Media.ts";
import transformProject from "../../../transformers/transformProject.ts";
import transformProjectCategory from "../../../transformers/transformProjectCategory.ts";
import AdminMediaSelectionOverlay from "../../../components/AdminMediaSelectionOverlay/AdminMediaSelectionOverlay.tsx";
import type {Link} from "../../../types/Link.ts";
import LinkInput from "../../../components/LinkInput/LinkInput.tsx";
import { v4 as uuidv4 } from 'uuid';

function Project() {
    const { slug } = useParams();
    const [ projectCategories, setProjectCategories] = useState<ApiState<Array<ProjectCategory>>>()
    const [ projectData, setProjectData ] = useState<ApiState<Project | null>>(slug ? { status: "loading" } : { status: "success", data: null });
    const [ projectImage, setProjectImage ] = useState<ApiState<Media | null>>(slug ? { status: "loading" } : { status: "success", data: null });
    const [ showNewCategoryInputs, setShowNewCategoryInputs] = useState<boolean>(false)
    const [ errorText, setErrorText ] = useState<string>("")
    const [ isPublished, setIsPublished ] = useState<boolean>(false)
    const [ showMediaSelectionOverlay, setShowMediaSelectionOverlay ] = useState<boolean>(false)
    const [ contributors, setContributors ] = useState<Array<any>>([]);
    const [ accessLinks, setAccessLinks ] = useState<Array<any>>([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await api.get("/project-categories");

            const data: ApiState<Array<ProjectCategory>> = {
                status: "success",
                data: response.data.map((category: any) => transformProjectCategory(category))
            }

            setProjectCategories(data)
        } catch (error: any) {
            setProjectCategories({ status: "error", error: error.message })
        }
    }

    const fetchProject = async () => {
        if (!slug) return;

        try {
            const response = await api.get(`/projects/${slug}`);

            const data: ApiState<Project> = {
                status: "success",
                data: transformProject(response.data)
            }

            setProjectData(data)

            // Set project image if its not null
            if (data.data.featuredImage) {
                const projectImage: ApiState<Media | null> = {
                    status: "success",
                    data: data.data.featuredImage
                }
                setProjectImage(projectImage)
            } else {
                const projectImage: ApiState<Media> = {
                    status: "error",
                    error: "No Featured Image"
                }
                setProjectImage(projectImage)
            }

            const contributors: Array<Partial<any>> = data.data.contributors.map((contributor: Link) => {
                return {
                    url: contributor.url,
                    label: contributor.label,
                    key: uuidv4(),
                }
            });
            setContributors(contributors);

            const accessLinks: Array<Partial<any>> = data.data.accessLinks.map((accessLink: Link) => {
                return {
                    url: accessLink.url,
                    label: accessLink.label,
                    key: uuidv4(),
                }
            });
            setAccessLinks(accessLinks);

            console.log(contributors);
            console.log(accessLinks);

            setIsPublished(data.data.published)
        } catch (error: any) {
            setErrorText(error.message);
            setProjectData({ status: "error", error: error.message })
        }

    }

    const onCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);

        if (!formData) return;

        const name = formData.get("category-name");
        const slug = formData.get("category-slug");
        const description = formData.get("category-description");

        if (!name || !slug || !description) return;

        const data = {
            name, slug, description
        }

        await api.post("project-categories", data);

        fetchCategories();

        setShowNewCategoryInputs(false)
    }

    const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);

            if (!formData) return;

            const projectSlug = formData.get("slug") as string;
            const name = formData.get("name") as string;
            const content = formData.get("content") as string;
            const published = formData.get("isPublished") as string === "on";
            const categorySlug = formData.get("category") as string;
            const tags = formData.get("tags") as string;

            // Make sure data is valid (if slug is present, data can be partial)
            if (!slug && !projectSlug || !name || !content || published == null || !categorySlug || categorySlug === "___new-category" || !tags || projectImage.status !== "success" || projectImage.data === null || !contributors)
                throw Error("One or more fields are invalid or missing.")

            // Create a list out of the tags string
            const projectTags = tags.split(", ")

            // Construct the data
            const project = {
                slug: projectSlug,
                name,
                content,
                published,
                categorySlug,
                tags: projectTags,
                featuredImageId: projectImage.data.id,
                contributors: contributors.map(contributor => ({label: contributor.label, url: contributor.url})),
                accessLinks: accessLinks.map(accessLink => ({label: accessLink.label, url: accessLink.url})),
            }

            console.log(project);

            if (slug) {
                // If slug is present, we are editing
                await api.patch(`/projects/${slug}`, project);
            } else {
                // If no slug was provided in URL, this is a new project
                await api.post("/projects", project);
                navigate(`/admin/project/${projectSlug}`); // redirect to slug to edit future saves
            }

            setErrorText(""); // Reset error text
        } catch(error: any) {
            setErrorText(error.message);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProject()
    }, [])

    // These methods update the local link values for contributors and access links which are then updated when user saves
    const appendEmptyLink = (setList: React.Dispatch<React.SetStateAction<Array<any>>>) => {
        setList(prev => [...prev, {label: "", url: "", key: uuidv4(),}]);
    }

    const removeLink = (setList: React.Dispatch<React.SetStateAction<Array<any>>>, key: string) => {
        setList(prev => prev.filter(link => link.key !== key));
    }

    const updateLink = (setList: React.Dispatch<React.SetStateAction<Array<any>>>, url: string, label: string, key: string) => {
        setList(prev => prev.map(link => link.key === key ? {url, label, key} : link));
    }

    return (
        <main className={styles.main}>
            <h1>{slug ? "Edit" : "New"} Project</h1>

            {slug &&
                <NavLink target={"_blank"} className={"linkButton"} to={`/projects/${slug}`}>Preview Project</NavLink>
            }

            {/* Form for creating new categories, displayed if new category is selected in category dropdown*/}
            {showNewCategoryInputs &&
                <form className={styles.newCategoryForm} onSubmit={onCategorySubmit}>
                    <h3>New Category:</h3>
                    <div className={styles.formRow}>
                        <label htmlFor="category-name">Name:
                            <input type="text" name="category-name" id="category-name" placeholder={"Category name..."}/>
                        </label>

                        <label htmlFor="category-slug">Slug (no spaces or symbols):
                            <input type="text" name="category-slug" id="category-slug" placeholder={"category-slug"}/>
                        </label>

                        <label htmlFor="category-description">Description:
                            <input type="text" name="category-description" id="category-description" placeholder={"Category description..."}/>
                        </label>
                    </div>

                    <button>Create Category</button>
                </form>
            }

            <form className={styles.form} onSubmit={onPostSubmit}>
                <div className={styles.layoutContainer}>
                    <div className={styles.info}>
                        {/* Project Title & Slug*/}
                        <div className={styles.formRow}>
                            <label htmlFor="title">Project Name:
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder={"Name"}
                                    defaultValue={projectData.status === "success" ? projectData.data?.name : ""}
                                />
                            </label>

                            <label htmlFor="slug">Slug (no spaces or symbols):
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    placeholder={"project-slug"}
                                    defaultValue={projectData.status === "success" ? projectData.data?.slug : ""}
                                />
                            </label>
                        </div>

                        {/* Project Image */}
                        <div className={styles.formRow}>
                            <label>Image
                                <span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();

                                            setShowMediaSelectionOverlay(prev => !prev);
                                        }}
                                    >
                                        Select Image
                                    </button>

                                    {projectImage.status === "success" && projectImage.data === null &&
                                        <p>Select an image.</p>
                                    }
                                    {projectImage.status === "success" && projectImage.data !== null &&
                                        <img className={styles.postImage} src={projectImage.data.storageKey} alt={projectImage.data.alt}/>
                                    }
                                </span>
                            </label>

                            <label htmlFor="version">Version:
                                <input type="text" name="version" id="version" value={projectData.status === "success" ? projectData.data?.version : ""} placeholder={"1.0..."}/>
                            </label>
                        </div>

                        {/* Project tags and category */}
                        <div className={styles.formRow}>
                            <label htmlFor="tags">Tags (comma separated):
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    placeholder={"html, css, js..."}
                                    defaultValue={projectData.status === "success" ? projectData.data?.tags.map(tag => tag.name).join(", ") : ""}
                                />
                            </label>

                            <label htmlFor="category">Category:
                                <select
                                    name="category"
                                    id="category"
                                    defaultValue={projectData.status === "success" && projectData.data?.category ? projectData.data?.category.slug : ""}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        e.preventDefault();
                                        if (e.target.value === "___create-new")
                                            setShowNewCategoryInputs(true);
                                        else
                                            setShowNewCategoryInputs(false);
                                    }}
                                >
                                    <option value="" disabled>-- Select a category --</option>
                                    {projectCategories?.status === "success" &&
                                        projectCategories.data.map((category: BlogCategory, index: number) =>
                                            <option
                                                selected={projectData.status === "success" ? projectData.data?.category.slug === category.slug : index === 0}
                                                key={category.slug}
                                                value={category.slug}
                                            >
                                                {category.name}
                                            </option>
                                        )
                                    }
                                    <option value="___create-new">Add Category</option>
                                </select>
                            </label>
                        </div>

                        {/* Published checkbox */}
                        <label className={"horizontalLabel"} htmlFor="isPublished">Published
                            <input
                                type="checkbox"
                                name="isPublished"
                                id="isPublished"
                                checked={isPublished}
                                onChange={(e) => setIsPublished(e.target.checked)}
                            />
                        </label>

                        <div className={styles.formColumn}>
                            <h3>Contributors:</h3>
                            {contributors &&
                                contributors.map(contributor =>
                                    <LinkInput
                                        delete={() => removeLink(setContributors, contributor.key!)}
                                        label={contributor.label!}
                                        url={contributor.url!}
                                        linkKey={contributor.key!}
                                        linkListSetter={setContributors}
                                        setLink={updateLink}
                                    />
                                )
                            }

                            <button onClick={(e) => {
                                e.preventDefault()

                                appendEmptyLink(setContributors);
                            }}>
                                Add
                            </button>
                        </div>

                        <div className={styles.formColumn}>
                            <h3>Access Links:</h3>
                            {accessLinks &&
                                accessLinks.map(accessLink =>
                                    <LinkInput
                                        delete={() => removeLink(setAccessLinks, accessLink.key!)}
                                        label={accessLink.label!}
                                        url={accessLink.url!}
                                        linkKey={accessLink.key!}
                                        linkListSetter={setAccessLinks}
                                        setLink={updateLink}
                                    />
                                )
                            }

                            <button onClick={(e) => {
                                e.preventDefault()

                                appendEmptyLink(setAccessLinks);
                            }}>
                                Add
                            </button>
                        </div>
                    </div>

                    <div className={styles.content}>
                        {/* Project text content */}
                        <label className={styles.contentSection} htmlFor="content">Content:
                            <textarea
                                name="content"
                                id="content"
                                placeholder={"Use markdown..."}
                                defaultValue={projectData.status === "success" ? projectData.data?.content : ""}
                                onKeyDown={(e) => {
                                    // Prevents tab from exiting textarea, inserts a tab
                                    if (e.key === "Tab") {
                                        e.preventDefault();

                                        e.currentTarget.setRangeText(
                                            '\t',
                                            e.currentTarget.selectionStart,
                                            e.currentTarget.selectionEnd,
                                            'end'
                                        );
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>

                {/* Error text (if an error occurred during submission) */}
                {errorText &&
                    <p className="errorText">{errorText}</p>
                }

                {/* Submit Button */}
                <div className={styles.buttons}>
                    <button type={"submit"}>Save</button>
                </div>
            </form>

            {showMediaSelectionOverlay &&
                <>
                    <p>Showing Media Selection</p>
                    <AdminMediaSelectionOverlay
                        selectMedia={(image: Media) => {
                            const data: ApiState<Media | null> = {
                                status: "success",
                                data: image
                            }
                            setProjectImage(data)
                        }}
                        setShown={setShowMediaSelectionOverlay}
                    />
                </>
            }
        </main>
    )
}

export default Project;