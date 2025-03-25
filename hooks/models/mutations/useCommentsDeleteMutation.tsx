import { queryClient } from "@/utils/queryClient";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiCommentDeleteParams, ApiCommentDeleteResponse, deleteCommentApi } from "@/services/api/comments.delete.endpoint";
import { ApiCommentsGetResponse } from "@/services/api/comments.get.endpoint";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { TrashIcon } from "@/ui/icons/TrashIcon";

export type UseCommentsDeleteMutationParams = {
    queryKey: any
}

export type UseCommentsDeleteMutationResponse = {
    deleteMutate: UseMutateFunction<ApiCommentDeleteResponse, ErrorResponse, ApiCommentDeleteParams, unknown>
}

export const useCommentsDeleteMutation = ({ queryKey }: UseCommentsDeleteMutationParams): UseCommentsDeleteMutationResponse => {
    const { mutate } = useMutation<ApiCommentDeleteResponse, ErrorResponse, ApiCommentDeleteParams>({
        mutationFn: deleteCommentApi,
        onMutate: (variables) => {
            queryClient.setQueryData(queryKey, (oldData: ApiCommentsGetResponse | undefined) => {
                if (!oldData?.model) return oldData?.model;
        
                return {
                  ...oldData,
                    model: oldData.model.filter(comment =>
                        comment.id !== variables.id
                    )
                }
            });
            
            addToast({
                title: "Silence Speaks Volumes!",
                description: "That comment? Never existed. Gone, erased, like it was never there… unless someone screenshotted it. 👀🗑️",
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