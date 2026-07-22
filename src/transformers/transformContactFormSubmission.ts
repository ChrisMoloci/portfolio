import type {ContactFormSubmission} from "../types/ContactFormSubmission.ts";

function transformContactFormSubmission(data: any): ContactFormSubmission {
    return {
        ...data,
        createdAt: new Date(data.createdAt),
    }
}

export default transformContactFormSubmission;