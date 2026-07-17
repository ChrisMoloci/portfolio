import type {BlogCategory} from "../types/BlogCategory.ts";

function transformBlogCategory(blogCategory: any): BlogCategory {
    return {
        ...blogCategory,
        createdAt: new Date(blogCategory.createdAt),
        updatedAt: new Date(blogCategory.updatedAt),
    }
}

export default transformBlogCategory;