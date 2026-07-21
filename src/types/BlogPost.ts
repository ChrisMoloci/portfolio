// Post Type
import type {BlogCategory} from "./BlogCategory.ts";
import type {Media} from "./Media.ts";

export type BlogPost = {
    id: number,
    slug: string,
    title: string,
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
    category: BlogCategory,
    categoryId: number,
    featuredImage: Media | null,
    featuredImageId: number | null,
}