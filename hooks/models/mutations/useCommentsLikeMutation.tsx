import { queryClient } from "@/utils/queryClient";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiCommentsGetResponse } from "@/services/api/comments.get.endpoint";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { addToast } from "@heroui/toast";

export type UseCommentsLikeMutationParams = {
    queryKey: any
}

export type UseCommentsLikeMutationResponse = {
    likeMutate: UseMutateFunction<ApiCommentLikeResponse, ErrorResponse, ApiCommentLikeParams, unknown>
}

export const useCommentsLikeMutation = ({ queryKey }: UseCommentsLikeMutationParams): UseCommentsLikeMutationResponse => {
    const { user } = useAccount();

    const { mutate } = useMutation<ApiCommentLikeResponse, ErrorResponse, ApiCommentLikeParams>({
        mutationFn: likeCommentApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiCommentsGetResponse | undefined) => {
                if (!oldData?.model) return oldData?.model;
        
                return {
                    ...oldData,
                    model: oldData.model.map(comment =>
                        comment.id === data.model?.id ? data.model : comment
                    )
                }
            });

            if (user?.username && !data.model?.likedUsernames.includes(user?.username)) {
                addToast({
                    title: "Cold feet, Huh?",
                    description: "Love one moment, gone the next! Commitment issues or just experimenting? Either way, that like won’t miss you… probably. 👀",
                    classNames: {
                        title: 'font-interTight font-semibold text-primaryText',
                        icon: 'h-4 fill-primaryColor',
                        description: 'font-interTight font-medium text-secondaryText',
                        base: 'bg-emphasizingColor2 border-borderColor'
                    },
                    icon: (
                        <LikeIcon wrapped={false} stroked={true} />
                    )
                });
            } else {
                addToast({
                    title: "A Seal of Approval!",
                    description: "You’ve just blessed this comment with your like. A small tap for you, a huge ego boost for them! 👍✨",
                    classNames: {
                        title: 'font-interTight font-semibold text-primaryText',
                        icon: 'h-4 fill-redColor',
                        description: 'font-interTight font-medium text-secondaryText',
                        base: 'bg-emphasizingColor2 border-borderColor'
                    },
                    icon: (
                        <LikeIcon wrapped={false} stroked={false} />
                    )
                });
            }
        }
    });

    return { likeMutate: mutate };
}