import type {Link} from "../types/Link.ts";

/**
 * Transforms api link to a domain Link object
 *
 * @author Christian Moloci
 * @param link non-conforming Link object
 */
function transformLink(link: any): Link {
    return {
        ...link,
        createdAt: new Date(link.createdAt),
        updatedAt: new Date(link.updatedAt),
    }
}

export default transformLink;