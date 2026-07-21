import styles from "./Blog.module.css";
import {useParams} from "react-router";
import BlogCard from "../../components/BlogCard/BlogCard.tsx";
import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import {api} from "../../api/client.ts";
import type {BlogPost} from "../../types/BlogPost.ts";
import transformBlog from "../../transformers/transformBlog.ts";
import type {ApiState} from "../../types/ApiState.ts";


function Blog() {
    const { slug } = useParams();
    const [ blogData, setBlogData ] = useState<ApiState<BlogPost>>({ status: "loading" });
    const [ latestPosts, setLatestPosts ] = useState<ApiState<Array<BlogPost>>>({ status: "loading" });

    let featuredImageURL = "/src/assets/images/featured.png";

    if (blogData.status === "success" && blogData.data.featuredImage) {
        featuredImageURL = import.meta.env.VITE_MEDIA_DIR + "/" + blogData.data.featuredImage.storageKey + ".webp"
    }
    const fetchData = async () => {
        try {
            const response = await api.get(`/posts/${slug}`);

            const data = response.data;

            const transformedData: ApiState<BlogPost> = {
                status: "success",
                data: transformBlog(data),
            };

            setBlogData(transformedData);
        } catch (error: any) {
            setBlogData({ status: "error", error: error.message ?? "" });
        }
    }

    const fetchLatestPosts = async () => {
        try {
            const response = await api.get(`/posts?limit=5`);

            const data = response.data;

            const transformedData: ApiState<Array<BlogPost>> = {
                status: "success",
                data: data.map((post: any) => transformBlog(post))
            }

            setLatestPosts(transformedData);
        } catch (error: any) {
            setBlogData({ status: "error", error: error.message ?? "" });
        }
    }

    useEffect(() => {
        fetchData();
        fetchLatestPosts();
    }, []);

    return (
        <main className={styles.main}>
            {/* 1000px wide container */}
            <div className={styles.container}>
                {/* BlogPost Content */}
                {blogData.status === "success" &&
                    <div className={styles.content}>
                        {/* Header */}
                        <div className={styles.header}>
                            <h2 className={styles.subHeading}>{blogData.data.category.name}</h2>
                            <h1 className={styles.heading}>{blogData.data.title}</h1>

                            <span className={styles.authorDate}>
                            <span className={styles.author}>{blogData.data.author.name}</span>
                                &bull;
                                <span className={styles.date}>{blogData.data.createdAt.toDateString()}</span>
                        </span>
                        </div>

                        {/* Thumbnail */}
                        <img src={featuredImageURL} alt={blogData.data.featuredImage?.alt}/>

                        {/* BlogPost Content */}
                        <div className={styles.markdown}>
                            <Markdown>{blogData.data.content}</Markdown>

                            <small>&copy; 2026 Christian Moloci</small>
                        </div>
                    </div>
                }
                {blogData.status === "error" &&
                    <>
                        <h1>Failed to load posts</h1>
                        <p>Error: {blogData.error}</p>
                    </>
                }

                {/* Latest Posts */}
                <div className={styles.posts}>
                    <h1 className={styles.latestPostsHeading}>Latest Posts:</h1>
                    <div className={styles.blogCards}>
                        {latestPosts.status === "error" &&
                            <>
                                <h1>Failed to load latest posts</h1>
                                <p>Error: {latestPosts.error}</p>
                            </>
                        }
                        {latestPosts.status === "success" && latestPosts.data.map((post: BlogPost) => (
                            <BlogCard
                                url={post.slug}
                                title={post.title}
                                author={post.author.name}
                                date={post.createdAt.toDateString()}
                                description={post.content}
                                thumbnail={({url: post.featuredImage?.storageKey ?? "", alt: post.featuredImage?.alt ?? ""})}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Blog;