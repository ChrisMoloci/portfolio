// Post Type
import type {ProjectCategory} from "./ProjectCategory.ts";
import type {Media} from "./Media.ts";

export type Project = {
    id: number,
    slug: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    content: string,
    published: boolean,
    author: {
        name: string,
    },
    tags: [
        {
            "id": number,
            "name": string,
            "createdAt": Date,
            "updatedAt": Date,
        },
    ],
    category: ProjectCategory,
    categoryId: number
    featuredImage: Media | null,
    featuredImageId: number | null,
}