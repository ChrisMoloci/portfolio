import type {Media} from "../types/Media.ts";

/**
 * Transforms api media object to a domain Media object
 *
 * @author Christian Moloci
 * @param media non-conforming media object
 */
function transformMedia(media: any): Media {
    return {
        ...media,
        createdAt: new Date(media.createdAt),
        updatedAt: new Date(media.updatedAt),
    }
}

export default transformMedia;