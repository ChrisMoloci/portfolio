// Post Type
export type BlogPost = {
    id: number,
    slug: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    content: string,
    publishedAt: string,
    author: {
        name: string,
    },
    tags: [
        {
            "id": number,
            "name": string,
            "createdAt": Date,
            "updatedAt": Date,
        },
    ],
    blogCategory: {
        "id": number,
        "name": string,
        "slug": string,
        "description": string,
        "createdAt": Date,
        "updatedAt": Date,
    },
    "blogCategoryId": number
}