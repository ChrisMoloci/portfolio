
/**
 * Represents a Link from API
 *
 * @author Christian Moloci
 *
 * @type id unique resource identifier
 * @type createdAt date-time object managed by db that represents the creation date of the resource
 * @type updatedAt date-time object automatically updated by db that represents update date of resource
 * @type label the text displayed to the user for the link
 * @type url destination of the link
 */
export type Link = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    label: string,
    url: string,
}