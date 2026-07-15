import styles from "./Blog.module.css";
import {useParams} from "react-router";
import BlogCard from "../../components/BlogCard/BlogCard.tsx";
import Markdown from "react-markdown";

const placeholderData = {
    blogTitle: "Blog Post",
    slug: "super-cool-project",
    author: "Christian Moloci",
    date: new Date(2026, 6, 15),
    thumbnail: {
        url: "/src/assets/images/placeholder.png",
        alt: "Placeholder",
    },
    category: "Programming",
    meta: [
        {
            category: "Programming",
            tags: ["html", "css", "js", "react"]
        }
    ],
    markdown: "" +
        "## Design  \n" +
        "The design tab of the QR editor allows you to change how your QR code looks. While we offer a wide range of options when it comes to what can be customized, it’s important to abide by the following rules for the best compatibility.  \n" +
        "  \n" +
        "Design Rules:  \n" +
        "- Contrast   \n" +
        "    - When setting colors, ensure that there is sufficient contrast between the modules and the background. While some QR code readers can handle poor contrast without too much difficulty, not all readers can handle poor contrast, especially in bad lighting.  \n" +
        "- Avoid inversion  \n" +
        "    - While most modern readers can handle inverted colours (such as white on black instead of black on white). If you want to ensure the best compatibility, avoid using light on dark colors. This is more a recommendation, as many mature readers don’t have any problems reading inverted QR codes.  \n" +
        "- Consistency  \n" +
        "    - While the generator abides by the philosophy that everything should be customizable, allowing things to be adjusted down to the individual shapes in the QR code along with colors and grids, it is highly not recommended to have inconsistent shapes and colors (such as differently shaped or colored finder patterns)  \n" +
        "- Avoid using grids  \n" +
        "    - Some readers might mistake gridlines for modules, so it is recommended to stay away from grids or make the line thickness as thin as possible. Consider using a colour that is less likely to be mixed up with the module colours.  \n" +
        "  \n" +
        "Generally, if you want the best compatibility, stick with Simple mode; if you want good compatibility but want to be able to customize more of the QR Code, use Advanced; and if you don’t care much about compatibility (such as if you are using a proprietary QR Code reader and you verified it works), use macro mode.  "
}

function Blog() {
    const { slug } = useParams();

    const blog = placeholderData;

    return (
        <main className={styles.main}>
            {/* 1000px wide container */}
            <div className={styles.container}>
                {/* Blog Content */}
                <div className={styles.content}>
                    {/* Header */}
                    <div className={styles.header}>
                        <h2 className={styles.subHeading}>{blog.category}</h2>
                        <h1 className={styles.heading}>{blog.blogTitle}</h1>

                        <span className={styles.authorDate}>
                            <span className={styles.author}>{blog.author}</span>
                            &bull;
                            <span className={styles.date}>{blog.date.toDateString()}</span>
                        </span>
                    </div>

                    {/* Thumbnail */}
                    <img src={blog.thumbnail.url} alt={blog.thumbnail.url}/>

                    {/* Blog Content */}
                    <div className={styles.markdown}>
                        <Markdown>{blog.markdown}</Markdown>

                        <small>&copy; 2026 Christian Moloci</small>
                    </div>
                </div>

                {/* Latest Blog Posts*/}
                <div className={styles.posts}>
                    <h1 className={styles.latestPostsHeading}>Latest Posts:</h1>
                    <div className={styles.blogCards}>
                        <BlogCard
                            url={"#"}
                            title={"Blog Card"}
                            author={"First Last"}
                            date={"July 14, 2026"}
                            description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                            thumbnail={{url: "placeholder.png", alt: ""}}
                        />

                        <BlogCard
                            url={"#"}
                            title={"Blog Card"}
                            author={"First Last"}
                            date={"July 14, 2026"}
                            description={"Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."}
                            thumbnail={{url: "placeholder.png", alt: ""}}
                        />

                        <BlogCard
                            url={"#"}
                            title={"Blog Card"}
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