import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { DashboardUserArticlesTable } from "./DashboardUserArticlesTable";
import { useAccount } from "@/hooks/models/useAccount";
import { useArticles } from "@/hooks/models/useArticles";
import { addToast } from "@heroui/toast";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { DashboardContent } from "./DashboardContent";
import { Spinner } from "@heroui/react";
import { UserModel } from "@/models/user";
import { useEffect } from "react";
import { ArticleModel } from "@/models/article";
import { UseMutateFunction } from "@tanstack/react-query";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { ApiArticleDeleteParams, ApiArticleDeleteResponse } from "@/services/api/articles.delete.endpoint";
import { UserStatisticsModel } from "@/models/user_statistics";

export type DashboardProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
    statistics?: UserStatisticsModel
    isStatisticsFetched: boolean
    articles?: ArticleModel[]
    deleteArticle: (id: number) => void
}

export const Dashboard: React.FC<DashboardProps> = ({
    user,
    isUserFetched,
    statistics,
    isStatisticsFetched,
    articles,
    deleteArticle
}) => {
    return (
        (articles && isUserFetched && isStatisticsFetched ?
            <DashboardContent 
                articles={articles} 
                deleteArticle={deleteArticle} 
                statistics={statistics} 
                user={user}
            />
        :
            <div className="flex flex-col pt-8 gap-4 items-center justify-center w-full h-full">
                <Spinner color="secondary" />
                <p className="font-interTight font-semibold text-primaryText">Loading your data...</p>
            </div>
        )
    );
}