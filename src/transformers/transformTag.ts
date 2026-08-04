import type {Tag} from "../types/Tag.ts";

/**
 * Transforms api tag object to a domain Tag object
 *
 * @author Christian Moloci
 * @param tag non-conforming Tag object
 */
function transformTag(tag: any): Tag {
    return {
        ...tag,
        createdAt: new Date(tag.createdAt),
        updatedAt: new Date(tag.updatedAt),

    }
}

export default transformTag;