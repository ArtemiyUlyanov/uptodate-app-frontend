import { ArticleModel } from "@/models/article"
import { ApiArticleGetParams, ApiArticleGetResponse, ApiArticlesGetParams, ApiArticlesGetResponse, articlesGetApi } from "@/services/api/articles.get.endpoint"
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useArticleLikeMutation } from "./mutations/useArticleLikeMutation"
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint"
import { ErrorResponse } from "@/services/api/responses.types"
import { useRouter } from "next/navigation"
import { useAccount } from "./useAccount"
import { useCommentsDeleteMutation } from "./mutations/useCommentsDeleteMutation"
import { useArticlesDeleteMutation } from "./mutations/useArticlesDeleteMutation"
import { useArticlesLikeMutation } from "./mutations/useArticlesLikeMutation"
import { ApiArticleDeleteParams, ApiArticleDeleteResponse } from "@/services/api/articles.delete.endpoint"

export type UseArticlesParams = {
    ids: Array<number>
}

export type UseArticlesResponse = {
    articles?: ArticleModel[] | undefined
    error?: ErrorResponse
    refetch: () => Promise<QueryObserverResult<ApiArticleGetResponse, Error>>
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
    deleteMutate: UseMutateFunction<ApiArticleDeleteResponse, ErrorResponse, ApiArticleDeleteParams, unknown>
}

const useArticlesQuery = (
    params: ApiArticlesGetParams,
    opts: Partial<UseQueryOptions<ApiArticlesGetResponse>> = {},
) => {
    return useQuery<ApiArticlesGetResponse>({
        queryKey: ['articles', params.ids],
        queryFn: () => articlesGetApi(params),
        ...opts,
    });
}

export const useArticles = ({
    ids
}: UseArticlesParams): UseArticlesResponse => {
    const { user } = useAccount();
    const { data, refetch } = useArticlesQuery({ ids });
    const { likeMutate } = useArticlesLikeMutation({ queryKey: ['articles', ids] });
    const { deleteMutate } = useArticlesDeleteMutation({ queryKey: ['articles', ids] });

    useEffect(() => {
        refetch();
    }, [user]);

    return { articles: data?.models, error: data?.error, refetch, likeMutate, deleteMutate };
}