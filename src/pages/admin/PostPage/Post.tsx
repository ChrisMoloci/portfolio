import styles from "./Post.module.css"
import {useEffect, useState} from "react";
import type {ApiState} from "../../../types/ApiState.ts";
import type {BlogCategory} from "../../../types/BlogCategory.ts";
import transformBlogCategory from "../../../transformers/transformBlogCategory.ts";
import {api} from "../../../api/client.ts";
import type {Media} from "../../../types/Media.ts";
import {NavLink, useNavigate, useParams} from "react-router";
import type {BlogPost} from "../../../types/BlogPost.ts";
import transformBlog from "../../../transformers/transformBlog.ts";
import AdminMediaSelectionOverlay from "../../../components/AdminMediaSelectionOverlay/AdminMediaSelectionOverlay.tsx";

function Post() {
    const { slug } = useParams();
    const [ postCategories, setPostCategories] = useState<ApiState<Array<BlogCategory>>>()
    const [ postData, setPostData ] = useState<ApiState<BlogPost | null>>(slug ? { status: "loading" } : { status: "success", data: null });
    const [ postImage, setPostImage ] = useState<ApiState<Media | null>>(slug ? { status: "loading" } : { status: "success", data: null });
    const [ showNewCategoryInputs, setShowNewCategoryInputs] = useState<boolean>(false)
    const [ errorText, setErrorText ] = useState<string>("")
    const [ isPublished, setIsPublished ] = useState<boolean>(false)
    const [ showMediaSelectionOverlay, setShowMediaSelectionOverlay ] = useState<boolean>(false)
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await api.get("/blog-categories");

            const data: ApiState<Array<BlogCategory>> = {
                status: "success",
                data: response.data.map((category: any) => transformBlogCategory(category))
            }

            setPostCategories(data)
        } catch (error: any) {
            setPostCategories({ status: "error", error: error.message })
        }
    }

    const fetchPost = async () => {
        if (!slug) return;

        try {
            const response = await api.get(`/posts/${slug}`);

            const data: ApiState<BlogPost> = {
                status: "success",
                data: transformBlog(response.data)
            }

            setPostData(data)

            // Set post image if its not null
            if (data.data.featuredImage) {
                const postImage: ApiState<Media | null> = {
                    status: "success",
                    data: data.data.featuredImage
                }
                setPostImage(postImage)
            } else {
                const postImage: ApiState<Media> = {
                    status: "error",
                    error: "No Featured Image"
                }
                setPostImage(postImage)
            }

            setIsPublished(data.data.published)
        } catch (error: any) {
            setErrorText(error.message);
            setPostData({ status: "error", error: error.message })
        }

    }

    const onCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);

        if (!formData) return;

        const name = formData.get("category-name") as string;
        const slug = formData.get("category-slug") as string;
        const description = formData.get("category-description") as string;

        if (!name || !slug || !description) return;

        const data = {
            name, slug, description
        }

        await api.post("blog-categories", data);

        await fetchCategories();

        setShowNewCategoryInputs(false)
    }

    const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);

            if (!formData) return;

            const postSlug = formData.get("slug") as string;
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;
            const published = formData.get("isPublished") as string === "on";
            const categorySlug = formData.get("category") as string;
            const tags = formData.get("tags") as string;

            // Make sure data is valid (if slug is present, data can be partial)
            if (!slug && !postSlug || !title || !content || published == null || !categorySlug || categorySlug === "___new-category" || !tags || postImage.status !== "success" || postImage.data === null)
                throw Error("One or more fields are invalid or missing.")

            // Create a list out of the tags string
            const postTags = tags.split(", ")

            // Construct the data
            const post = {
                slug: postSlug,
                title,
                content,
                published,
                categorySlug,
                tags: postTags,
                featuredImageId: postImage.data.id
            }

            if (slug) {
                // If slug is present, we are editing
                await api.patch(`/posts/${slug}`, post);
            } else {
                // If no slug was provided in URL, this is a new post
                await api.post("/posts", post);
                navigate(`/admin/post/${postSlug}`); // redirect to slug to edit future saves
            }

            setErrorText(""); // Reset error text
        } catch(error: any) {
            setErrorText(error.message);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchPost()
    }, [])

    return (
        <main className={styles.main}>
            <title>{slug ? slug : "New Post"}</title>
            <h1>{slug ? "Edit" : "New"} Post</h1>

            {slug &&
                <NavLink target={"_blank"} className={"linkButton"} to={`/blog/${slug}`}>Preview Post</NavLink>
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

                        {/* Post Title & Slug*/}
                        <div className={styles.formRow}>
                            <label htmlFor="title">Post Title:
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder={"Title"}
                                    defaultValue={postData.status === "success" ? postData.data?.title : ""}
                                />
                            </label>

                            <label htmlFor="slug">Slug (no spaces or symbols):
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    placeholder={"post-slug"}
                                    defaultValue={postData.status === "success" ? postData.data?.slug : ""}
                                />
                            </label>
                        </div>

                        {/* Post Image */}
                        <div className={styles.formRow}>
                            <label>
                                <span>
                                    <button onClick={(e) => {
                                        e.preventDefault();

                                        setShowMediaSelectionOverlay(prev => !prev);
                                    }}>
                                        Select Image
                                    </button>

                                    {postImage.status === "success" && postImage.data === null &&
                                        <p>Select an image.</p>
                                    }
                                    {postImage.status === "success" && postImage.data !== null &&
                                        <img className={styles.postImage} src={import.meta.env.VITE_MEDIA_DIR + "/" + postImage.data.storageKey + ".webp"} alt={postImage.data.alt}/>
                                    }
                                </span>
                            </label>
                        </div>

                        {/* Post tags and category */}
                        <div className={styles.formRow}>
                            <label htmlFor="tags">Tags (comma separated):
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    placeholder={"html, css, js..."}
                                    defaultValue={postData.status === "success" ? postData.data?.tags.map(tag => tag.name).join(", ") : ""}
                                />
                            </label>

                            <label htmlFor="category">Category:
                                <select
                                    name="category"
                                    id="category"
                                    defaultValue={postData.status === "success" && postData.data?.category ? postData.data?.category.slug : ""}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        e.preventDefault();
                                        if (e.target.value === "___create-new")
                                            setShowNewCategoryInputs(true);
                                        else
                                            setShowNewCategoryInputs(false);
                                    }}
                                >
                                    <option value="" disabled>-- Select a category --</option>
                                    {postCategories?.status === "success" &&
                                        postCategories.data.map((category: BlogCategory, index: number) =>
                                            <option
                                                selected={postData.status === "success" ? postData.data?.category.slug === category.slug : index === 0}
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
                    </div>

                    <div className={styles.content}>
                        {/* Post text content */}
                        <label className={styles.contentSection} htmlFor="content">Content:
                            <textarea
                                name="content"
                                id="content"
                                placeholder={"Use markdown..."}
                                defaultValue={postData.status === "success" ? postData.data?.content : ""}
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
                            setPostImage(data)
                        }}
                        setShown={setShowMediaSelectionOverlay}
                    />
                </>
            }
        </main>
    )
}

export default Post;