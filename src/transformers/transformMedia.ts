import type {Media} from "../types/Media.ts";

function transformMedia(image: any): Media {
    return {
        ...image,
        createdAt: new Date(image.createdAt),
        updatedAt: new Date(image.updatedAt),
    }
}

export default transformMedia;