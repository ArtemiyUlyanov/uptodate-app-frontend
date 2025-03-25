import { ArticleModel } from "./article"
import { ArticleLikeModel } from "./article_like"
import { CommentModel } from "./comment"
import { CommentLikeModel } from "./comment_like"
import { UserSettingsModel } from "./user_settings"

export type UserModel = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    icon: string
    roles: Array<UserRole>
    settings: UserSettingsModel
    likedArticles?: Array<ArticleLikeModel>
    likedComments?: Array<CommentLikeModel>
    articlesIds: Array<number>
    commentsIds: Array<number>
}

export type UserRole = {
    id: number
    name: string
}