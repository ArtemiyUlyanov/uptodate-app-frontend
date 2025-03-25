import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { accountDeleteIconApi, ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { accountUploadIconApi, ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ApiAccountMeResponse } from "@/services/api/account.me.endpoint";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { queryClient } from "@/utils/queryClient";
import { addToast } from "@heroui/toast";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";

export type UseAccountDeleteIconMutationParams = {
    queryKey: any
}

export type UseAccountDeleteIconMutationResponse = {
    deleteIconMutate: UseMutateFunction<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams, unknown>
}

export const useAccountDeleteIconMutation = ({ queryKey }: UseAccountDeleteIconMutationParams): UseAccountDeleteIconMutationResponse => {
    const { mutate: deleteIconMutate } = useMutation<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams>({
        mutationFn: accountDeleteIconApi,
        onSuccess: (data) => {
            if (data.model) {
                queryClient.setQueryData(queryKey, (oldData: ApiAccountMeResponse | undefined) => {
                    if (!oldData) return oldData;
                    return { ...oldData, model: data.model };
                });
    
                addToast({
                    title: "And just like that… poof! 🎩✨",
                    description: "Your profile picture has vanished! Houdini would be proud. Now, who are you again? 🤔",
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
            } else {
                addToast({
                    title: "Something went wrong",
                    description: "Unable to delete icon ❌",
                    classNames: {
                        title: 'font-interTight font-semibold text-primaryText',
                        icon: 'h-4 fill-redColor',
                        description: 'font-interTight font-medium text-secondaryText',
                        base: 'bg-emphasizingColor2 border-borderColor'
                    },
                    icon: (
                        <CloseIcon />
                    )
                });
            }
        },
    });

    return { deleteIconMutate };
}