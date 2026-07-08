import {createBrowserRouter} from "react-router";
import App from "./App.tsx";

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: Home } = await import("./pages/HomePage/Home.tsx");
                    return { element: <Home /> };
                }
            },
            {
                path: "/projects",
                lazy: async () => {
                    const { default: Projects } = await import("./pages/ProjectsPage/Projects.tsx");
                    return { element: <Projects /> };
                }
            },
            {
                path: "/blog",
                lazy: async () => {
                    const { default: Blog } = await import("./pages/BlogPage/Blog.tsx");
                    return { element: <Blog /> };
                }
            },
            {
                path: "/about",
                lazy: async () => {
                    const { default: About } = await import("./pages/AboutPage/About.tsx");
                    return { element: <About /> };
                }
            },
            {
                path: "*",
                lazy: async () => {
                    const { default: PageNotFound } = await import("./pages/PageNotFoundPage/PageNotFound.tsx");
                    return { element: <PageNotFound /> }
                }
            }
        ]
    },
]);