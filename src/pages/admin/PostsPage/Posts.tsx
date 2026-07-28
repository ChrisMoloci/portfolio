import styles from "./Posts.module.css"
import BackendContentCard from "../../../components/BackendContentCard/BackendContentCard.tsx";
import {useEffect, useState} from "react";
import type {ApiState} from "../../../types/ApiState.ts";
import type {BlogPost} from "../../../types/BlogPost.ts";
import {api} from "../../../api/client.ts";
import transformBlog from "../../../transformers/transformBlog.ts";
import {NavLink} from "react-router";

function Posts() {
    const [ posts, setPosts ] = useState<ApiState<Array<BlogPost>>>(() => ({ status: "loading" }));

    const fetchProjects = async () => {
        try {
            const response = await api.get("/posts?includeUnpublished=true");

            const data: ApiState<Array<BlogPost>> = {
                status: "success",
                data: response.data.map((post: any) => transformBlog(post))
            }

            setPosts(data);
        } catch (error: any) {
            setPosts({ status: "error", error: error.message });
        }
    }

    const deletePost = async (slug: string) => {
        await api.delete(`/posts/${slug}`);
        fetchProjects(); // Refresh
    }

    const publishPost = async (slug: string, state: boolean) => {
        await api.patch(`/posts/${slug}`, {published: state});
        fetchProjects(); // Refresh
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <main className={styles.main}>
            <title>Admin Posts</title>
            <div className={styles.header}>
                <h1>Posts</h1>

                <NavLink className={"linkButton"} to={`/admin/post`}>New Post</NavLink>
            </div>

            <section className={styles.cards}>
                {posts.status === "success" && posts.data.length > 0 &&
                    posts.data.map(post =>
                        <BackendContentCard
                            title={post.title}
                            date={post.createdAt}
                            slug={post.slug}
                            isPublic={post.published}
                            publish={publishPost}
                            delete={deletePost}
                            editBaseURL={"post"}
                        />
                    )
                }
                {posts.status === "success" && posts.data.length === 0 &&
                    <p>No results.</p>
                }
                {posts.status === "error" &&
                    <p>Error: {posts.error}</p>
                }
            </section>
        </main>
    )
}

export default Posts;