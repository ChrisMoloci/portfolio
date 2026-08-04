import type {Components} from "react-markdown";
import styles from "../pages/app/BlogPage/Blog.module.css";

const markdownComponents: Components = {
    table: ({ children, ...props }) => (
        <div className={styles.tableWrapper}>
            <table {...props}>{children}</table>
            </div>
    ),
}

export default markdownComponents;