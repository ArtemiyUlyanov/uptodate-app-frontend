import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { accountDeleteApi, ApiAccountDeleteParams, ApiAccountDeleteResponse } from "@/services/api/account.delete.endpoint";
import { accountEditApi, ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint";
import { accountDeleteIconApi, ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { accountUploadIconApi, ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ApiAccountMeResponse } from "@/services/api/account.me.endpoint";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { logout } from "@/store/features/auth/authSlice";
import { store } from "@/store/store";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { PersonalAccountIcon } from "@/ui/icons/PersonalAccountIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { queryClient } from "@/utils/queryClient";
import { addToast } from "@heroui/toast";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export type UseAccountDeleteMutationParams = {
    queryKey: any
}

export type UseAccountDeleteMutationResponse = {
    deleteMutate: UseMutateFunction<ApiAccountDeleteResponse, ErrorResponse, ApiAccountDeleteParams, unknown>
    isDeletePending: boolean
}

export const useAccountDeleteMutation = ({ queryKey }: UseAccountDeleteMutationParams): UseAccountDeleteMutationResponse => {
    const dispatch = useDispatch();

    const { mutate: deleteMutate, isPending: isDeletePending } = useMutation<ApiAccountDeleteResponse, ErrorResponse, ApiAccountDeleteParams>({
        mutationFn: accountDeleteApi,
        onSuccess: (data) => {
            if (data.message) {
                queryClient.setQueryData(queryKey, (oldData: ApiAccountMeResponse | undefined) => {
                    return { ...oldData, model: undefined };
                });

                dispatch(logout());
    
                addToast({
                    title: "A French leave 🗑️",
                    description: " Looks like your title just pulled a disappearing act! 🎩✨ Don’t worry, we won’t tell—unless it plans to ghost us forever. 👀",
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
                    description: "Unable to delete profile ❌",
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

    return { deleteMutate, isDeletePending };
}