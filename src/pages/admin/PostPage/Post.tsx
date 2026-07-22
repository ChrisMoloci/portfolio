import styles from "./Post.module.css"
import {useEffect, useState} from "react";
import type {ApiState} from "../../../types/ApiState.ts";
import type {BlogCategory} from "../../../types/BlogCategory.ts";
import transformBlogCategory from "../../../transformers/transformBlogCategory.ts";
import {api} from "../../../api/client.ts";
import transformMedia from "../../../transformers/transformMedia.ts";
import type {Media} from "../../../types/Media.ts";
import {NavLink, useNavigate, useParams} from "react-router";
import type {BlogPost} from "../../../types/BlogPost.ts";
import transformBlog from "../../../transformers/transformBlog.ts";

function Post() {
    const { slug } = useParams();
    const [ postCategories, setPostCategories] = useState<ApiState<Array<BlogCategory>>>()
    const [ postData, setPostData ] = useState<ApiState<BlogPost | null>>(slug ? { status: "loading" } : { status: "success", data: null });
    const [ showNewCategoryInputs, setShowNewCategoryInputs] = useState<boolean>(false)
    const [ errorText, setErrorText ] = useState<string>("")
    const [ isPublished, setIsPublished ] = useState<boolean>(false)
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

        const name = formData.get("category-name");
        const slug = formData.get("category-slug");
        const description = formData.get("category-description");

        if (!name || !slug || !description) return;

        const data = {
            name, slug, description
        }

        await api.post("blog-categories", data);

        fetchCategories();

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
            const featuredImage = formData.get("image") as File;
            const featuredImageAlt = formData.get("image-alt") as string;

            // Make sure data is valid (if slug is present, data can be partial)
            if (!slug && !postSlug || !title || !content || published == null || !categorySlug || categorySlug === "___new-category" || !tags || !featuredImage || !featuredImageAlt)
                throw Error("One or more fields are invalid or missing.")

            const imageFormData = new FormData();

            imageFormData.append("image", featuredImage);
            imageFormData.append("alt", featuredImageAlt);

            let image: Media | null = null;

            // featuredImage might not be provided if in edit mode, if previous check didn't fail, that is likely the case
            if (featuredImage.size > 0) {
                const response = await api.post("/media", imageFormData);

                image = transformMedia(response.data);
            }

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
                ...(image && {featuredImageId: image.id})
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

                {/* Post Image and Image alt */}
                <div className={styles.formRow}>
                    <label htmlFor="image">Image:
                        <input
                            type="file"
                            name="image"
                            id="image"
                            placeholder={"Image..."}
                        />
                    </label>

                    <label htmlFor="image-alt">Alt:
                        <input
                            type="text"
                            name="image-alt"
                            id="image-alt"
                            placeholder={"Image alt..."}
                            defaultValue={postData.status === "success" ? postData.data?.featuredImage?.alt : ""}
                        />
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
                            defaultValue={postData.status === "success" ? postData.data?.category.slug : ""}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                e.preventDefault();
                                if (e.target.value === "___create-new")
                                    setShowNewCategoryInputs(true);
                                else
                                    setShowNewCategoryInputs(false);
                        }}>
                            {postCategories?.status === "success" &&
                                postCategories.data.map((category: BlogCategory, index: number) =>
                                    <option selected={postData.status === "success" ? postData.data?.category.slug === category.slug : index === 0} key={category.slug} value={category.slug}>{category.name}</option>
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

                {/* Post text content */}
                <label className={styles.contentSection} htmlFor="content">Content:
                    <textarea
                        name="content"
                        id="content"
                        placeholder={"Use markdown..."}
                        defaultValue={postData.status === "success" ? postData.data?.content : ""}
                    />
                </label>

                {/* Error text (if an error occurred during submission) */}
                {errorText &&
                    <p className="errorText">{errorText}</p>
                }

                {/* Submit Button */}
                <div className={styles.formRow}>
                    <button type={"submit"}>Save</button>
                </div>
            </form>
        </main>
    )
}

export default Post;