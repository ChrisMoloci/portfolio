import type {ProjectCategory} from "../types/ProjectCategory.ts";

/**
 * Transforms api project category object to a domain ProjectCategory object
 *
 * @author Christian Moloci
 * @param category non-conforming project category object
 */
function transformProjectCategory(category: any): ProjectCategory {
    return {
    ...category,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
    }
}

export default transformProjectCategory;