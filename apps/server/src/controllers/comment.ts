import { registerNewCommentInDb } from '../models/comment/comment';

export const registerNewComment = async (
    userId: string,
    place_id: string,
    text: string
) => {
    return await registerNewCommentInDb(userId, place_id, text, new Date());
};
