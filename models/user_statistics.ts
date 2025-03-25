import { ArticleLikeModel } from "./article_like"
import { ArticleViewModel } from "./article_view"

export type UserStatisticsModel = {
    userId: number
    lastViews: ArticleViewModel[]
    lastLikes: ArticleLikeModel[]
}