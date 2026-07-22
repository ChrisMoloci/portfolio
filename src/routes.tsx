import {createBrowserRouter, Navigate} from "react-router";
import App from "./layouts/App.tsx";
import Admin from "./layouts/Admin.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: Home } = await import("./pages/app/HomePage/Home.tsx");
                    return { element: <Home /> };
                }
            },
            {
                path: "/projects",
                lazy: async () => {
                    const { default: Projects } = await import("./pages/app/ProjectsPage/Projects.tsx");
                    return { element: <Projects /> };
                }
            },
            {
                path: "/projects/:slug",
                lazy: async () => {
                    const { default: Project } = await import("./pages/app/ProjectPage/Project.tsx");
                    return { element: <Project /> };
                }
            },
            {
                path: "/blog",
                lazy: async () => {
                    const { default: Blogs } = await import("./pages/app/BlogsPage/Blogs.tsx");
                    return { element: <Blogs /> };
                }
            },
            {
                path: "/blog/:slug",
                lazy: async () => {
                    const { default: Blog } = await import("./pages/app/BlogPage/Blog.tsx");
                    return { element: <Blog /> };
                }
            },
            {
                path: "/about",
                lazy: async () => {
                    const { default: About } = await import("./pages/app/AboutPage/About.tsx");
                    return { element: <About /> };
                }
            },
            {
                path: "/login",
                lazy: async () => {
                    const { default: Login } = await import("./pages/app/LoginPage/LoginPage.tsx");
                    return { element: <Login /> };
                }
            },
            {
                path: "*",
                lazy: async () => {
                    const { default: PageNotFound } = await import("./pages/app/PageNotFoundPage/PageNotFound.tsx");
                    return { element: <PageNotFound /> }
                }
            },
        ]
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                index: true,
                element: <Navigate to={"/admin/dashboard"} />
            },
            {
                path: "/admin/dashboard",
                lazy: async () => {
                    const { default: Dashboard } = await import("./pages/admin/DashboardPage/Dashboard.tsx");
                    return { element: <Dashboard /> };
                }
            },
            {
                path: "/admin/contact-submissions",
                lazy: async () => {
                    const { default: ContactSubmissions } = await import("./pages/admin/ContactSubmissionsPage/ContactSubmissions.tsx");
                    return { element: <ContactSubmissions /> };
                }
            },
            {
                path: "/admin/posts",
                lazy: async () => {
                    const { default: Posts } = await import("./pages/admin/PostsPage/Posts.tsx");
                    return { element: <Posts /> };
                }
            },
            {
                path: "/admin/projects",
                lazy: async () => {
                    const { default: Projects } = await import("./pages/admin/ProjectsPage/Projects.tsx");
                    return { element: <Projects /> };
                }
            },            {
                path: "/admin/post/:slug?",
                lazy: async () => {
                    const { default: Post } = await import("./pages/admin/PostPage/Post.tsx");
                    return { element: <Post /> };
                }

            },
            {
                path: "/admin/project/:slug?",
                lazy: async () => {
                    const { default: Project } = await import("./pages/admin/ProjectPage/Project.tsx");
                    return { element: <Project /> };
                }
            },
            {
                path: "/admin/about",
                lazy: async () => {
                    const { default: About } = await import("./pages/admin/AboutPage/About.tsx");
                    return { element: <About /> };
                }
            },
            {
                path: "/admin/media",
                lazy: async () => {
                    const { default: Media } = await import("./pages/admin/MediaPage/Media.tsx");
                    return { element: <Media /> };
                }
            },
        ]
    }
]);