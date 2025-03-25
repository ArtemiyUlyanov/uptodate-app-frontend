import { ArticleModel } from "@/models/article"
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint"
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useArticleLikeMutation } from "./mutations/useArticleLikeMutation"
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint"
import { ErrorResponse } from "@/services/api/responses.types"
import { useRouter } from "next/navigation"
import { ApiCommentsGetParams, ApiCommentsGetResponse, getCommentsApi } from "@/services/api/comments.get.endpoint"
import { CommentModel } from "@/models/comment"
import { useCommentsLikeMutation } from "./mutations/useCommentsLikeMutation"
import { ApiCommentLikeParams, ApiCommentLikeResponse } from "@/services/api/comments.like.endpoint"
import { ApiCommentDeleteParams, ApiCommentDeleteResponse } from "@/services/api/comments.delete.endpoint"
import { useCommentsDeleteMutation } from "./mutations/useCommentsDeleteMutation"
import { useCommentsCreateMutation } from "./mutations/useCommentsCreateMutation"
import { ApiCommentCreateParams, ApiCommentCreateResponse } from "@/services/api/comments.create.endpoint"
import { useCommentsEditMutation } from "./mutations/useCommentsEditMutation"
import { ApiCommentEditParams, ApiCommentEditResponse } from "@/services/api/comments.edit.endpoint"
import { useAccount } from "./useAccount"

export type UseCommentsParams = {
    articleId?: number
}

export type UseCommentsResponse = {
    comments?: CommentModel[] | undefined
    refetch: () => Promise<QueryObserverResult<ApiCommentsGetResponse, Error>>
    likeMutate: UseMutateFunction<ApiCommentLikeResponse, ErrorResponse, ApiCommentLikeParams, unknown>
    deleteMutate: UseMutateFunction<ApiCommentDeleteResponse, ErrorResponse, ApiCommentDeleteParams, unknown>
    createMutate: UseMutateFunction<ApiCommentCreateResponse, ErrorResponse, ApiCommentCreateParams, unknown>
    editMutate: UseMutateFunction<ApiCommentEditResponse, ErrorResponse, ApiCommentEditParams, unknown>
    isCreatePending: boolean
    isEditPending: boolean
}

const useCommentsQuery = (
    params: ApiCommentsGetParams,
    opts: Partial<UseQueryOptions<ApiCommentsGetResponse>> = {},
) => {
    return useQuery<ApiCommentsGetResponse>({
        queryKey: ['comments', params.articleId],
        queryFn: () => getCommentsApi(params),
        ...opts,
    });
}

export const useComments = ({
    articleId
}: UseCommentsParams): UseCommentsResponse => {
    const { user } = useAccount();
    const { data, refetch } = useCommentsQuery({ articleId });

    const { likeMutate } = useCommentsLikeMutation({ queryKey: ['comments', articleId] });
    const { deleteMutate } = useCommentsDeleteMutation({ queryKey: ['comments', articleId] });
    const { createMutate, isCreatePending } = useCommentsCreateMutation({ queryKey: ['comments', articleId] });
    const { editMutate, isEditPending } = useCommentsEditMutation({ queryKey: ['comments', articleId] });

    useEffect(() => {
        refetch();
    }, [user]);

    return { comments: data?.model, refetch, likeMutate, deleteMutate, createMutate, editMutate, isCreatePending, isEditPending };
}