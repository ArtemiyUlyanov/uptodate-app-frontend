import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { ArticleModel } from "@/models/article";
import { UseMutateFunction } from "@tanstack/react-query";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { DashboardLikedArticlesTable } from "./DashboardLikedArticlesTable";
import { UserModel } from "@/models/user";

export type DashboardLikedArticlesContentProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    articles?: ArticleModel[]
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

export const DashboardLikedArticlesContent: React.FC<DashboardLikedArticlesContentProps> = ({
    user,
    articles,
    likeMutate
}) => {
    return (
        <div className="flex flex-col gap-8 pl-12 pr-12 pt-8 pb-8 w-full">
            <div className="flex flex-row items-center gap-2">
                <div className="h-5 fill-secondaryText">
                    <LikeIcon wrapped={false} stroked={false} />
                </div>
                <p className="font-interTight font-semibold text-lg text-primaryText">Liked articles</p>
            </div>
            <DashboardLikedArticlesTable 
                user={user}
                articles={articles}
                likeMutate={likeMutate}
            />
        </div>
    );
}