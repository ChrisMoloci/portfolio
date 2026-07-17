import type {ProjectCategory} from "../types/ProjectCategory.ts";

function transformProjectCategory(category: any): ProjectCategory {
    return {
    ...category,
        createdAt: new Date(category.createdAt),
        updatedAt: new Date(category.updatedAt),
    }
}

export default transformProjectCategory;