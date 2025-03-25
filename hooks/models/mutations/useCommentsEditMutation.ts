import { queryClient } from "@/utils/queryClient";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiCommentCreateParams, ApiCommentCreateResponse, createCommentApi } from "@/services/api/comments.create.endpoint";
import { ApiCommentDeleteParams, ApiCommentDeleteResponse, deleteCommentApi } from "@/services/api/comments.delete.endpoint";
import { ApiCommentEditParams, ApiCommentEditResponse, editCommentApi } from "@/services/api/comments.edit.endpoint";
import { ApiCommentsGetResponse } from "@/services/api/comments.get.endpoint";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";

export type UseCommentsEditMutationParams = {
    queryKey: any
}

export type UseCommentsEditMutationResponse = {
    isEditPending: boolean
    editMutate: UseMutateFunction<ApiCommentEditResponse, ErrorResponse, ApiCommentEditParams, unknown>
}

export const useCommentsEditMutation = ({ queryKey }: UseCommentsEditMutationParams): UseCommentsEditMutationResponse => {
    const { mutate, isPending } = useMutation<ApiCommentEditResponse, ErrorResponse, ApiCommentEditParams>({
        mutationFn: editCommentApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiCommentsGetResponse | undefined) => {
                if (!oldData?.model) return oldData?.model;
        
                return {
                    ...oldData,
                    model: oldData.model.map(comment =>
                        comment.id == data.model?.id ? data.model : comment
                    )
                }
            });
        }
    });

    return { editMutate: mutate, isEditPending: isPending };
}