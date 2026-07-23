import type {Link} from "../types/Link.ts";

function transformLink(link: any): Link {
    return {
        ...link,
        createdAt: new Date(link.createdAt),
        updatedAt: new Date(link.updatedAt),
    }
}

export default transformLink;