import type {ProjectCategory} from "./ProjectCategory.ts";
import type {Media} from "./Media.ts";
import type {Link} from "./Link.ts";

/**
 * Represents a Project from API
 *
 * @author Christian Moloci
 *
 * @type id unique resource identifier
 * @type slug human readable unique resource identifier
 * @type name displayed project name
 * @type createdAt date-time object managed by db that represents the creation date of the resource
 * @type updatedAt date-time object automatically updated by db that represents update date of resource
 * @type content main text content of the project
 * @type author author object from author that created the resource
 * @type tags list of tags applied to the project
 * @type category holds the ProjectCategory related ot the project
 * @type categoryId unique identifier of the category related to the project
 * @type featuredImage holds the featured image Media object related ot the project
 * @type categoryId unique identifier of the image related to the project
 * @type contributors array of Link objects for project contributors
 * @type accessLinks array of Link objects for links to access project on other platforms
 */
export type Project = {
    id: number,
    slug: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    content: string,
    published: boolean,
    version: string,
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
    contributors: Array<Link>,
    accessLinks: Array<Link>,
}