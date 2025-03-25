import { ArticleModel } from "./article"
import { CommentLikeModel } from "./comment_like"
import { UserModel } from "./user"

export type CommentModel = {
    id: number
    articleId: number
    content: string
    resources?: Array<string>
    permissionScope: Array<string>
    likes: Array<CommentLikeModel>
    likedUsernames: Array<string>
    createdAt: string
    authorId: number
}