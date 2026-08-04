/**
 * Represents Media from API
 *
 * @author Christian Moloci
 *
 * @type id unique resource identifier
 * @type createdAt date-time object managed by db that represents the creation date of the resource
 * @type updatedAt date-time object automatically updated by db that represents update date of resource
 * @type storageKey the name of the file on the server
 * @type alt text displayed if resource was not successfully loaded
 * @type mimeType file type (e.g "image/webp")
 */
export type Media = {
    id: number,
    storageKey: string,
    alt: string,
    mimeType: string,
}