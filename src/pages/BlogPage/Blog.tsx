import styles from "./Blog.module.css";
import {useParams} from "react-router";
import BlogCard from "../../components/BlogCard/BlogCard.tsx";
import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import {api} from "../../api/client.ts";
import type {BlogPost} from "../../types/BlogPost.ts";


function Blog() {
    const { slug } = useParams();
    const [ blogData, setBlogData ] = useState<BlogPost>();

    const fetchData = async () => {
        const response = await api.get(`/posts/${slug}`);

        const data = response.data;

        const transformedData: BlogPost = {
            ...data,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
            ...data.tags.map(tag => {
                return {
                    ...tag,
                    createdAt: new Date(tag.createdAt),
                    updatedAt: new Date(tag.updatedAt),
                }
            }),
            blogCategory: {
                ...data.blogCategory,
                createdAt: new Date(data.blogCategory.createdAt),
                updatedAt: new Date(data.blogCategory.updatedAt),
            }
        }

        console.log(transformedData);

        setBlogData(transformedData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main className={styles.main}>
            {/* 1000px wide container */}
            <div className={styles.container}>
                {/* BlogPost.ts Content */}
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

                    {/* BlogPost.ts Content */}
                    <div className={styles.markdown}>
                        <Markdown>{blogData?.content}</Markdown>

                        <small>&copy; 2026 Christian Moloci</small>
                    </div>
                </div>

                {/* Latest BlogPost.ts Posts*/}
                <div className={styles.posts}>
                    <h1 className={styles.latestPostsHeading}>Latest Posts:</h1>
                    <div className={styles.blogCards}>
                        <BlogCard
                            url={"#"}
                            title={"BlogPost.ts Card"}
                            author={"First Last"}
                            date={"July 14, 2026"}
                            description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                            thumbnail={{url: "placeholder.png", alt: ""}}
                        />

                        <BlogCard
                            url={"#"}
                            title={"BlogPost.ts Card"}
                            author={"First Last"}
                            date={"July 14, 2026"}
                            description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                            thumbnail={{url: "placeholder.png", alt: ""}}
                        />

                        <BlogCard
                            url={"#"}
                            title={"BlogPost.ts Card"}
                            author={"First Last"}
                            date={"July 14, 2026"}
                            description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                            thumbnail={{url: "placeholder.png", alt: ""}}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Blog;