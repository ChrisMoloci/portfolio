import type {ContactFormSubmission} from "../types/ContactFormSubmission.ts";

/**
 * Transforms api Contact Form Submission object to a domain ContactFormSubmission object
 *
 * @author Christian Moloci
 * @param data non-conforming contact form submission object
 */
function transformContactFormSubmission(data: any): ContactFormSubmission {
    return {
        ...data,
        createdAt: new Date(data.createdAt),
    }
}

export default transformContactFormSubmission;