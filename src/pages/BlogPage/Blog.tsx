import styles from "./Blog.module.css";
import {useParams} from "react-router";
import BlogCard from "../../components/BlogCard/BlogCard.tsx";
import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import {api} from "../../api/client.ts";
import type {BlogPost} from "../../types/BlogPost.ts";
import transformBlog from "../../transformers/transformBlog.ts";


function Blog() {
    const { slug } = useParams();
    const [ blogData, setBlogData ] = useState<BlogPost>();
    const [ latestPosts, setLatestPosts ] = useState<BlogPost[]>();

    const fetchData = async () => {
        const response = await api.get(`/posts/${slug}`);

        const data = response.data;

        const transformedData: BlogPost = transformBlog(data);

        setBlogData(transformedData);
    }

    const fetchLatestPosts = async () => {
        const response = await api.get(`/posts?limit=5`);

        const data = response.data;

        const transformedData = data.map((post: any) => transformBlog(post));

        setLatestPosts(transformedData);
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
                <div className={styles.content}>
                    {/* Header */}
                    <div className={styles.header}>
                        <h2 className={styles.subHeading}>{blogData?.blogCategory.name}</h2>
                        <h1 className={styles.heading}>{blogData?.title}</h1>

                        <span className={styles.authorDate}>
                            <span className={styles.author}>{blogData?.author.name}</span>
                            &bull;
                            <span className={styles.date}>{blogData?.createdAt.toDateString()}</span>
                        </span>
                    </div>

                    {/* Thumbnail */}
                    <img src={"/src/assets/images/placeholder.png"} alt={""}/>

                    {/* BlogPost Content */}
                    <div className={styles.markdown}>
                        <Markdown>{blogData?.content}</Markdown>

                        <small>&copy; 2026 Christian Moloci</small>
                    </div>
                </div>

                {/* Latest Posts */}
                <div className={styles.posts}>
                    <h1 className={styles.latestPostsHeading}>Latest Posts:</h1>
                    <div className={styles.blogCards}>
                        {latestPosts && latestPosts.map((post: BlogPost) => (
                            <BlogCard
                                url={post.slug}
                                title={post.title}
                                author={post.author.name}
                                date={post.createdAt.toDateString()}
                                description={post.content}
                                thumbnail={({url: "placeholder.png", alt: ""})}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Blog;