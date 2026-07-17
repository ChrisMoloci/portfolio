import styles from "./Blogs.module.css"
import LinkButton from "../../components/LinkButton/LinkButton.tsx";
import BlogCard from "../../components/BlogCard/BlogCard.tsx";
import {useEffect, useState} from "react";
import Filter, {type FilterItem, type Filters} from "../../components/Filter/Filter.tsx";
import {api} from "../../api/client.ts";
import type {BlogPost} from "../../types/BlogPost.ts";
import transformBlog from "../../transformers/transformBlog.ts";

function Blogs() {
    const [searchFilters, setSearchFilters] = useState<Filters>()
    const [blogData, setBlogData] = useState<Array<BlogPost>>();

    const fetchPosts = async (queryString: string = "") => {
        const response = await api.get("/posts" + queryString);

        // Map the posts to BlogPost type
        const data: Array<BlogPost> = response.data.map((post: BlogPost) => transformBlog(post))

        setBlogData(data);
    }

    const fetchFilters = async () => {
        const tags = await api.get("/tags");
        const categories = await api.get("/blog-categories");

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
        fetchPosts();
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

        fetchPosts(queryString);
    }, [searchFilters]);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Blog</h1>

                        <LinkButton link={"https://www.linkedin.com/in/christian-moloci/"} text={"LinkedIn"} newTab={true} />
                    </div>

                    <Filter filters={searchFilters ?? []} onChange={setSearchFilters} />
                </div>

                <div className={styles.content}>
                    {blogData && blogData.map((post) =>
                        <BlogCard
                            key={post.slug}
                            url={post.slug}
                            title={post.title}
                            author={post.author.name}
                            date={post.createdAt.toDateString()}
                            description={post.content} // API returns shortened sanitized content on index route
                            thumbnail={({url: "placeholder.png", alt: ""})}
                        />
                    )}
                </div>
            </main>
        </>
    )
}

export default Blogs
