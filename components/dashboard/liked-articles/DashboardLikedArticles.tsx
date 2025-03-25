import { useArticles } from "@/hooks/models/useArticles";
import { UserModel } from "@/models/user";
import { Spinner } from "@heroui/react";
import React from "react";
import { DashboardLikedArticlesContent } from "./DashboardLikedArticlesContent";
import { ArticleModel } from "@/models/article";
import { UseMutateFunction } from "@tanstack/react-query";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { ApiArticleDeleteParams, ApiArticleDeleteResponse } from "@/services/api/articles.delete.endpoint";

export type DashboardLikedArticlesProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
}

export const DashboardLikedArticles: React.FC<DashboardLikedArticlesProps> = ({
    user,
    isUserFetched
}) => {
    const { articles, likeMutate, deleteMutate } = useArticles({ ids: user?.likedArticles?.map(like => like.articleId) || [] });

    return (
        (articles && isUserFetched ?
            <DashboardLikedArticlesContent user={user} articles={articles} likeMutate={likeMutate} />
        :
            <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
                <Spinner color="secondary" />
                <p className="font-interTight font-semibold text-primaryText">Loading your data...</p>
            </div>
        )
    );
}