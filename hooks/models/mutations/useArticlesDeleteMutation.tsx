import { queryClient } from "@/utils/queryClient";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleDeleteParams, ApiArticleDeleteResponse, deleteArticleApi } from "@/services/api/articles.delete.endpoint";
import { ApiArticleGetParams, ApiArticleGetResponse, ApiArticlesGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiCommentDeleteParams, ApiCommentDeleteResponse, deleteCommentApi } from "@/services/api/comments.delete.endpoint";
import { ApiCommentsGetResponse } from "@/services/api/comments.get.endpoint";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { TrashIcon } from "@/ui/icons/TrashIcon";

export type UseArticlesDeleteMutationParams = {
    queryKey: any
}

export type UseArticlesDeleteMutationResponse = {
    deleteMutate: UseMutateFunction<ApiArticleDeleteResponse, ErrorResponse, ApiArticleDeleteParams, unknown>
}

export const useArticlesDeleteMutation = ({ queryKey }: UseArticlesDeleteMutationParams): UseArticlesDeleteMutationResponse => {
    const { mutate } = useMutation<ApiArticleDeleteResponse, ErrorResponse, ApiArticleDeleteParams>({
        mutationFn: deleteArticleApi,
        onMutate: (variables) => {
            queryClient.setQueryData(queryKey, (oldData: ApiArticlesGetResponse | undefined) => {
                if (!oldData?.models) return oldData?.models;
        
                return {
                  ...oldData,
                    models: oldData.models.filter(article =>
                        article.id !== variables.id
                    )
                }
            });

            addToast({
                title: "Gone Without a Trace!",
                description: "Poof! Your article has vanished into the void. Hope you didn’t get too attached… or did you? 🤔🗑️",
                classNames: {
                    title: 'font-interTight font-semibold text-primaryText',
                    icon: 'h-4 fill-redColor',
                    description: 'font-interTight font-medium text-secondaryText',
                    base: 'bg-emphasizingColor2 border-borderColor'
                },
                icon: (
                    <TrashIcon />
                )
            });
        }
    });

    return { deleteMutate: mutate };
}