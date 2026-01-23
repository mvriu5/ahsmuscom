import { groq } from "next-sanity"

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    description,
    popoverImage,
    detailedDescription,
    publishedAt
}`

export interface Post {
    _id: string
    title: string
    slug: {
        current: string
    }
    description: string
    popoverImage: any // SanityImageSource
    detailedDescription: any // Portable Text
    publishedAt: string
}


export const projectsQuery = groq`*[_type == "project"]{
    _id,
    title,
    link,
    description,
    detailedDescription,
    live,
    popoverContent
}`

export interface Project {
    _id: string
    title: string
    link: string
    description: string
    detailedDescription: string
    live: boolean
    popoverContent: any[]
}
