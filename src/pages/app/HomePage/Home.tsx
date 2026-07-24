import styles from "./Home.module.css"
import ContactLinks from "../../../components/ContactLinks/ContactLinks.tsx";
import profilePic from "../../../assets/images/christianmoloci.png";
import LinkButton from "../../../components/LinkButton/LinkButton.tsx";
import {NavLink} from "react-router";
import ProjectCard from "../../../components/ProjectCard/ProjectCard.tsx";
import BlogCard from "../../../components/BlogCard/BlogCard.tsx";
import {api} from "../../../api/client.ts";
import transformBlog from "../../../transformers/transformBlog.ts";
import {useEffect, useState} from "react";
import type {BlogPost} from "../../../types/BlogPost.ts";
import type {Project} from "../../../types/Project.ts";
import transformProject from "../../../transformers/transformProject.ts";
import type {ApiState} from "../../../types/ApiState.ts";

function Home() {
    const [ latestProjects, setLatestProjects ] = useState<ApiState<Array<Project>>>({ status: "loading" });
    const [ latestPosts, setLatestPosts ] = useState<ApiState<Array<BlogPost>>>({ status: "loading" });

    const fetchLatestProjects = async () => {
        try {
            const response = await api.get("/projects?limit=3");

            const data = response.data;

            const transformedData: ApiState<Array<Project>> = {
                status: "success",
                data: data.map((project: any) => transformProject(project))
            }

            setLatestProjects(transformedData);
        } catch(error: any) {
            setLatestProjects({ status: "error", error: error.message });
        }
    }

    const fetchLatestPosts = async () => {
        try {
            const response = await api.get(`/posts?limit=3`);

            const data = response.data;

            const transformedData: ApiState<Array<BlogPost>> = {
                status: "success",
                data: data.map((post: any) => transformBlog(post))
            }

            setLatestPosts(transformedData);
        } catch(error: any) {
            setLatestPosts({ status: "error", error: error.message });
        }
    }

    useEffect(() => {
        fetchLatestProjects();
        fetchLatestPosts();
    }, []);

    return (
        <>
            <title>Christian Moloci</title>
            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroText}>
                        <ContactLinks />
                        <h3>Web Developer</h3>
                        <h1>Christian<br/>Moloci</h1>
                        <p className={styles.desc}>
                            Computer Programming graduate with a 4.0 GPA, recognized as the top-performing student in the program.
                            Experienced in developing React and Angular web applications using TypeScript, Node.js, and SQL databases.
                            Developed LLQR, a TypeScript QR Code generator library built from scratch, cleanly implementing low-level
                            concepts including data encoding, Reed-Solomon error correction, data masking, and datastream optimization
                            algorithms.
                        </p>
                        <div className={styles.buttonLinks}>
                            <LinkButton link="#" text="Resume" newTab={true} />
                            <LinkButton link="#footer" text="Contact" newTab={false} />
                        </div>
                    </div>
                    
                    <div className={styles.heroImage}>
                        <img src={profilePic} alt="Picture of Christian Moloci"/>
                    </div>
                </section>

                {/* Page Content */}
                <div className={styles.homeContent}>
                    {/* Featured Projects */}
                    <section className={styles.featuredProjects + " " + styles.section}>
                        <div className={styles.content}>
                            <h1>Latest Projects:</h1>
                            <div className={styles.cards}>
                                {latestProjects?.status === "success" && latestProjects.data.map((project: Project) =>
                                    <ProjectCard
                                        thumbnail={({url: project.featuredImage?.storageKey ?? "", alt: project.featuredImage?.alt ?? ""})}
                                        title={project.name}
                                        description={project.content}
                                        date={project.createdAt.toDateString()}
                                        url={project.slug}
                                        languages={project.tags.map(tag => tag.name)}
                                    />
                                )}
                                {latestProjects.status === "success" && latestProjects.data.length === 0 &&
                                    <p>No results.</p>
                                }
                                {latestProjects.status === "error" &&
                                    <p>Error: {latestProjects.error}</p>
                                }
                            </div>

                            <NavLink to={"/projects"}>All Projects</NavLink>
                        </div>
                    </section>

                    <hr/>

                    {/* Elevator Pitch */}
                    <section className={styles.elevatorPitch + " " + styles.section}>
                        <h1>Who am I?</h1>
                        <div className={styles.content}>
                            <div className={styles.text}>
                                <p>
                                    Computer Programming graduate with a 4.0 GPA, recognized as the top-performing student in the program.
                                    Experienced in developing React and Angular web applications using TypeScript, Node.js, and SQL databases.
                                    Developed LLQR, a TypeScript QR Code generator library built from scratch, cleanly implementing low-level
                                    concepts including data encoding, Reed-Solomon error correction, data masking, and datastream optimization
                                    algorithms.
                                </p>
                            </div>

                            <div className={styles.video}>
                                <iframe
                                    src="https://www.youtube.com/embed/LDU_Txk06tM?si=2q8GF-q_ZgVDGPW8"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen></iframe>
                            </div>
                        </div>

                        <NavLink to={"/about"}>Vist About Page</NavLink>
                    </section>

                    <hr/>

                    {/* Latest BlogPost.ts Posts */}
                    <section className={styles.latestPosts + " " + styles.section}>
                        <div className={styles.content}>
                            <h1>Latest Blog Posts:</h1>

                            <div className={styles.cards}>
                                {latestPosts.status === "success" && latestPosts.data.map((post: BlogPost) =>
                                    <BlogCard
                                        url={post.slug}
                                        title={post.title}
                                        author={post.author.name}
                                        date={post.createdAt.toDateString()}
                                        description={post.content}
                                        thumbnail={{url: post.featuredImage?.storageKey ?? "", alt: post.featuredImage?.alt ?? ""}}
                                    />
                                )}
                                {latestPosts.status === "success" && latestPosts.data.length === 0 &&
                                    <p>No results.</p>
                                }
                                {latestPosts.status === "error" &&
                                    <p>Error: {latestPosts.error}</p>
                                }
                            </div>

                            <NavLink to={"/blog"}>More Posts</NavLink>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Home