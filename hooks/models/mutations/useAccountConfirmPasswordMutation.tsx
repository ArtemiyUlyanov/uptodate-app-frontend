import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { accountEditApi, ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint";
import { accountEmailConfirmApi, ApiAccountEmailConfirmParams, ApiAccountEmailConfirmResponse } from "@/services/api/account.email.confirm.endpoint";
import { accountDeleteIconApi, ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { accountUploadIconApi, ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ApiAccountMeResponse } from "@/services/api/account.me.endpoint";
import { accountPasswordConfirmApi, ApiAccountPasswordConfirmParams, ApiAccountPasswordConfirmResponse } from "@/services/api/account.password.confirm.endpoint";
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
import { useRouter } from "next/navigation";

export type UseAccountConfirmPasswordMutationParams = {
    queryKey: any
}

export type UseAccountConfirmPasswordMutationResponse = {
    confirmPasswordMutate: UseMutateFunction<ApiAccountPasswordConfirmResponse, ErrorResponse, ApiAccountPasswordConfirmParams, unknown>
}

export const useAccountConfirmPasswordMutation = ({ queryKey }: UseAccountConfirmPasswordMutationParams): UseAccountConfirmPasswordMutationResponse => {
    const { mutate: confirmPasswordMutate } = useMutation<ApiAccountPasswordConfirmResponse, ErrorResponse, ApiAccountPasswordConfirmParams>({
        mutationFn: accountPasswordConfirmApi,
        onSuccess: (data) => {
            if (data.model) {
                queryClient.setQueryData(queryKey, (oldData: ApiAccountMeResponse | undefined) => {
                    if (!oldData) return oldData;
                    return { ...oldData, model: data.model };
                });
    
                addToast({
                    title: "Mission accomplished! 🚀",
                    description: "Your password is now officially updated. No going back... unless you change it again. 😉",
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
            } else {
                addToast({
                    title: "Something went wrong",
                    description: "Unable to confirm password ❌",
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

    return { confirmPasswordMutate };
}