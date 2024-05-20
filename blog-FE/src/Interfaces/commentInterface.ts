
export interface CommentInterface {
    _id: string;
    userId: string;
    postId?: string;
    comment: string;
    date: Date;
    reply: CommentInterface[];
}