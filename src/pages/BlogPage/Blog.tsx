import styles from "./Blog.module.css"
import LinkButton from "../../components/LinkButton/LinkButton.tsx";
import BlogCard from "../../components/BlogCard/BlogCard.tsx";
import {useState} from "react";
import Filter from "../../components/Filter/Filter.tsx";

const filters = [
    {
        category: "Category:",
        options: [
            {
                key: "programming",
                value: "Programming",
                set: false,
            },
            {
                key: "music",
                value: "Music",
                set: false
            },
            {
                key: "theology",
                value: "Theology",
                set: false
            },
        ]
    },
    {
        category: "Programming:",
        options: [
            {
                key: "projectUpdates",
                value: "Project Updates",
                set: false
            },
            {
                key: "tutorials",
                value: "Tutorials",
                set: false
            },
            {
                key: "education",
                value: "Education",
                set: false
            }
        ],
    },
    {
        category: "Music:",
        options: [
            {
                key: "latestReleases",
                value: "Latest Releases",
                set: false
            },
            {
                key: "plugins",
                value: "Plugins",
                set: false
            },
            {
                key: "tutorials",
                value: "Tutorials",
                set: false
            },
        ]
    }
];

function About() {
    const [searchFilters, setSearchFilters] = useState(() => filters);

    return (
        <>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>Blog</h1>

                        <LinkButton link={"https://www.linkedin.com/in/christian-moloci/"} text={"LinkedIn"} newTab={true} />
                    </div>

                    <Filter filterCategories={searchFilters} onChange={setSearchFilters} />
                </div>

                <div className={styles.content}>
                    <BlogCard
                        url={"#"}
                        title={"Blog Blog Blog Blog Blog Blog Blog Blog Blog Blog Blog Blog Card"}
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
            </main>
        </>
    )
}

export default About
