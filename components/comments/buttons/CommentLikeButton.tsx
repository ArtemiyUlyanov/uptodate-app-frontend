import { useAccount } from "@/hooks/models/useAccount";
import { CommentModel } from "@/models/comment";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { RootState } from "@/store/store";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export type CommentLikeButtonProps = React.HTMLProps<HTMLDivElement> & {
    comment: CommentModel
    likeMutate: UseMutateFunction<ApiCommentLikeResponse, ErrorResponse, ApiCommentLikeParams, unknown>
}

export const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({
    comment,
    likeMutate
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { user } = useAccount();

    const liked = useMemo(() => comment.likes.some(comment => comment.userId == user?.id), [comment, user]);

    const toggleLiked = () => {
        if (isAuthenticated) {
            likeMutate({ id: comment.id });
        }
    };
    
    return (
        <div 
            className={clsx(
                "flex flex-row items-center gap-1 select-none",
                "transition-all duration-200",
                isAuthenticated && "sm:hover:opacity-50",
                isAuthenticated && "active:opacity-50 sm:active:opacity"
            )}
            onClick={() => isAuthenticated && toggleLiked()}
        >
            <div 
                className={clsx(
                    "h-3",
                    
                    isAuthenticated && !liked && 'fill-secondaryColor',
                    isAuthenticated && liked && 'fill-redColor',

                    !isAuthenticated && 'fill-secondaryColor'
                )}
            >
                <LikeIcon wrapped={false} stroked={(isAuthenticated && !liked) || !isAuthenticated} />
            </div>
            <p className={clsx(
                "font-interTight font-semibold text-sm",

                isAuthenticated && liked && 'text-redColor',
                isAuthenticated && !liked && 'text-secondaryColor',

                !isAuthenticated && 'text-secondaryColor'
            )}>{comment.likedUsernames.length}</p>  
        </div>
    );
}