/**
 * Represents a ProjectCategory in the Project type from API
 *
 * @author Christian Moloci
 *
 * @type id unique resource identifier
 * @type slug human readable unique resource identifier
 * @type name displayed category name
 * @type description describes the category
 * @type createdAt date-time object managed by db that represents the creation date of the resource
 * @type updatedAt date-time object automatically updated by db that represents update date of resource
 */
export type ProjectCategory = {
    slug: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
}