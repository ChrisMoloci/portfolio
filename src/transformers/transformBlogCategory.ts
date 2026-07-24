import type {BlogCategory} from "../types/BlogCategory.ts";

/**
 * Transforms api blog category object to a domain BlogCategory object
 *
 * @author Christian Moloci
 * @param category non-conforming blog category object
 */
function transformBlogCategory(category: any): BlogCategory {
    return {
        ...category,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
    }
}

export default transformBlogCategory;