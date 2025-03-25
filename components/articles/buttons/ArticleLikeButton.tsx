import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { RootState } from "@/store/store";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { Button, Tooltip } from "@heroui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export type ArticleLikeButtonProps = React.HTMLProps<HTMLDivElement> & {
    article: ArticleModel,
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

export const ArticleLikeButton: React.FC<ArticleLikeButtonProps> = ({
    article,
    likeMutate
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { user } = useAccount();

    const liked = useMemo(() => article.likes.some(article => article.userId == user?.id), [article, user]);

    const toggleLiked = () => {
        if (isAuthenticated) {
            likeMutate({ id: article.id });
        }
    };

    return (
        <Tooltip
            content={!liked ? 'Like this post' : 'Unlike the post'}
            closeDelay={0}
            className={clsx(
                user === undefined && 'hidden'
            )}
            classNames={{
                content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
            }}
        >
            <Button
                isIconOnly
                className={clsx(
                    'bg-[transparent]',
                    'transition-all duration-200',
                    user === undefined && 'hidden'
                )}
                onPress={toggleLiked}
                size="sm"
                variant='light'
            >
                <div 
                    className={clsx(
                        "h-4",
                        !liked && 'fill-primaryColor',
                        liked && 'fill-redColor',
                    )}
                >
                    <LikeIcon wrapped={false} stroked={!liked} />
                </div>
            </Button>
        </Tooltip>
    );
}