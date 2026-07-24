/**
 * Represents a User from API (*only properties exposed by API)
 *
 * @author Christian Moloci
 *
 * @type id unique resource identifier
 * @type email unique email of the user
 * @type name name of the user
 */
export type User = {
    id: number,
    email: string,
    name: string
}