export interface post {
    _id: string, 
    userId: string,
    categoryId: string,
    title: string,
    content: string,
    category: string,
    date: Date,
    tags: string[]
}