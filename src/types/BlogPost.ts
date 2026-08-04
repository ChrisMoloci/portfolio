import type {BlogCategory} from "./BlogCategory.ts";
import type {Media} from "./Media.ts";

/**
 * Represents a BlogPost from API
 *
 * @author Christian Moloci
 *
 * @type id unique resource identifier
 * @type slug human readable unique resource identifier
 * @type title displayed post tile
 * @type createdAt date-time object managed by db that represents the creation date of the resource
 * @type updatedAt date-time object automatically updated by db that represents update date of resource
 * @type content main text content of the post
 * @type author author object from author that created the resource
 * @type tags list of tags applied to the post
 * @type category holds the BlogCategory related ot the post
 * @type categoryId unique identifier of the category related to the post
 * @type featuredImage holds the featured image Media object related ot the post
 * @type categoryId unique identifier of the image related to the post
 */
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