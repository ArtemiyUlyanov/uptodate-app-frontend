'use client';

import { ArticleLikeButton } from "@/components/articles/buttons/ArticleLikeButton";
import { ArticleModel } from "@/models/article";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { ViewIcon } from "@/ui/icons/ViewIcon";
import { formatDate, formatDateExtended } from "@/utils/date.utils";
import { capitalizeText } from "@/utils/text.utils";
import { BreadcrumbItem, Breadcrumbs, Divider, Image } from "@heroui/react";
import clsx from "clsx";
import { useEffect, useMemo } from "react";
import { ArticleSharePostButton } from "./buttons/ArticleSharePostButton";
import Comments from "../comments/Comments";
import { UserModel } from "@/models/user";
import { parseContent } from "@/utils/article.content.utils";
import { UseMutateFunction } from "@tanstack/react-query";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { ArticleCover } from "./covers/ArticleCover";
import RoseLink from "@/ui/links/RoseLink";
import { useDictionary } from "@/hooks/useDictionary";
import DefaultLink from "@/ui/links/DefaultLink";
import { useUser } from "@/hooks/models/useUser";
import { useAccount } from "@/hooks/models/useAccount";

export type ArticleProps = {
    user?: UserModel
    article: ArticleModel
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

const Article: React.FC<ArticleProps> = ({
    user,
    article,
    likeMutate
}) => {
    const coverImage = useMemo(() => 
        <Image
            alt='test'
            className="w-full object-cover object-top aspect-[5/3]"
            radius="lg"
            src={article.cover}
            width="100%"
        />
    , [article]);

    const { user: author, isFetched: isAuthorFetched } = useUser(article.authorId);
    
    const { translate } = useDictionary(user);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-col gap-8 w-3/4">
                <div className="w-full">
                    <DefaultLink
                        text='Go to Explore'
                        link='/explore'
                        // onClick={onClick}
                        arrowPlacement="left"
                        arrowActived={true}
                        customClassName={clsx(
                            'font-interTight font-semibold text-sm',
                            history.length <= 0 && 'hidden'
                        )}
                        actived={true}
                    />
                </div>
                <ArticleCover
                    article={article}
                    author={author}
                    isAuthorFetched={isAuthorFetched}
                    likeMutate={likeMutate}
                />
            </div>
            {coverImage}
            <div className="flex flex-col items-center gap-4 w-3/4">
                <div className="flex flex-col w-full gap-2">
                    {parseContent(article.content)}
                </div>
                <Comments article={article} />
            </div>
        </div>
    );
}

export default Article;