/**
 * Represents the state of an API fetch
 *
 * @author Christian Moloci
 * @template T The type of data fetched on success
 */
export type ApiState<T> =
    | {
        /** API fetch currently in progress */
        status: "loading"
    } | {
        /** API fetch succeeded */
        status: "success",
        /** The data returned from the API. */
        data: T
    } | {
        /** The API fetch failed */
        status: "error",
        /** The error message indicating the failure */
        error: string
    }