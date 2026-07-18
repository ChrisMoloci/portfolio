import type {BlogCategory} from "../types/BlogCategory.ts";

function transformBlogCategory(category: any): BlogCategory {
    return {
        ...category,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
    }
}

export default transformBlogCategory;