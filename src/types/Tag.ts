/**
 * Represents a Tag from API
 *
 * @author Christian Moloci
 *
 * @type id unique resource identifier
 * @type name human readable unique resource identifier
 * @type createdAt date-time object managed by db that represents the creation date of the resource
 * @type updatedAt date-time object automatically updated by db that represents update date of resource
 */
export type Tag = {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
}