import type {Tag} from "../types/Tag.ts";

function transformTag(tag: any): Tag {
    return {
        ...tag,
        createdAt: new Date(tag.createdAt),
        updatedAt: new Date(tag.updatedAt),

    }
}

export default transformTag;