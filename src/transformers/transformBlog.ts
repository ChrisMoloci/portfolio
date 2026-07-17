import transformTag from "./transformTag.ts";
import transformBlogCategory from "./transformBlogCategory.ts";
import type {BlogPost} from "../types/BlogPost.ts";

function transformBlog(blog: any): BlogPost {
    return {
        ...blog,
        createdAt: new Date(blog.createdAt),
        updatedAt: new Date(blog.updatedAt),
        ...blog.tags.map((tag: any) => transformTag(tag)),
        blogCategory: transformBlogCategory(blog.blogCategory),
    }
}

export default transformBlog;
