import { CommentModel } from "./comment"
import { UserModel } from "./user"
import { ContentBlockModel } from "./content_block"
import { ArticleViewModel } from "./article_view"
import { ArticleLikeModel } from "./article_like"
import { CategoryModel } from "./category"

export type ArticleModel = {
    id: number
    heading: string
    description: string
    createdAt: string
    authorId: number
    slug: string
    cover: string
    permissionScope: Array<string>
    content: Array<ContentBlockModel>
    commentsIds: Array<number>
    views: Array<ArticleViewModel>
    likes: Array<ArticleLikeModel>
    likedUsernames: Array<string>
    categories: Array<CategoryModel>
}