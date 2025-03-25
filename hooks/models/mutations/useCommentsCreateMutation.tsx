import { queryClient } from "@/utils/queryClient";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiCommentCreateParams, ApiCommentCreateResponse, createCommentApi } from "@/services/api/comments.create.endpoint";
import { ApiCommentDeleteParams, ApiCommentDeleteResponse, deleteCommentApi } from "@/services/api/comments.delete.endpoint";
import { ApiCommentsGetResponse } from "@/services/api/comments.get.endpoint";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";

export type UseCommentsCreateMutationParams = {
    queryKey: any
}

export type UseCommentsCreateMutationResponse = {
    isCreatePending: boolean
    createMutate: UseMutateFunction<ApiCommentCreateResponse, ErrorResponse, ApiCommentCreateParams, unknown>
}

export const useCommentsCreateMutation = ({ queryKey }: UseCommentsCreateMutationParams): UseCommentsCreateMutationResponse => {
    const { mutate, isPending } = useMutation<ApiCommentCreateResponse, ErrorResponse, ApiCommentCreateParams>({
        mutationFn: createCommentApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiCommentsGetResponse | undefined) => {
                if (!oldData?.model) return oldData?.model;
        
                return {
                    ...oldData,
                    model: [...oldData.model, data.model]
                }
            });

            addToast({
                title: "Words Have Been Spoken!",
                description: "Your comment is out in the wild! Whether it’s wisdom, wit, or chaos—there’s no taking it back now. 💬🔥",
                classNames: {
                    title: 'font-interTight font-semibold text-primaryText',
                    icon: 'h-4 fill-green-500',
                    description: 'font-interTight font-medium text-secondaryText',
                    base: 'bg-emphasizingColor2 border-borderColor'
                },
                icon: (
                    <CheckmarkIcon />
                )
            });
        }
    });

    return { createMutate: mutate, isCreatePending: isPending };
}