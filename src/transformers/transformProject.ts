import type {Project} from "../types/Project.ts";
import transformTag from "./transformTag.ts";
import transformProjectCategory from "./transformProjectCategory.ts";
import transformMedia from "./transformMedia.ts";

function transformProject(project: any): Project {
    return {
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt),
        ...project.tags.map((tag: any) => transformTag(tag)),
        category: transformProjectCategory(project.category),
        featuredImage: transformMedia(project.featuredImage)
    }
}

export default transformProject;