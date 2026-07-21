export type ApiState<T> =
    | { status: "loading" }
    | { status: "success", data: T }
    | { status: "error", error: string }