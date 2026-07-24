/**
 * Represents a ContactFormSubmission from API
 *
 * @author Christian Moloci
 *
 * @type id unique resource identifier
 * @type createdAt date-time object managed by db that represents the creation date of the resource
 * @type updatedAt date-time object automatically updated by db that represents update date of resource
 * @type email email of the user that submitted the message
 * @type name name of the user that submitted the message
 * @type message message contents of the user that submitted the message
 */
export type ContactFormSubmission = {
    id: number,
    createdAt: Date,
    email: string,
    name: string,
    message: string,
}