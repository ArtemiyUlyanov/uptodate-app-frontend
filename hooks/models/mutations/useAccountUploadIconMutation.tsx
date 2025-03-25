import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { accountUploadIconApi, ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ApiAccountMeResponse } from "@/services/api/account.me.endpoint";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { queryClient } from "@/utils/queryClient";
import { addToast } from "@heroui/toast";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";

export type UseAccountUploadIconMutationParams = {
    queryKey: any
}

export type UseAccountUploadIconMutationResponse = {
    uploadIconMutate: UseMutateFunction<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams, unknown>
}

export const useAccountUploadIconMutation = ({ queryKey }: UseAccountUploadIconMutationParams): UseAccountUploadIconMutationResponse => {
    const { mutate: uploadIconMutate } = useMutation<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams>({
        mutationFn: accountUploadIconApi,
        onSuccess: (data) => {
            if (data.model) {
                queryClient.setQueryData(queryKey, (oldData: ApiAccountMeResponse | undefined) => {
                    if (!oldData) return oldData;
                    return { ...oldData, model: data.model };
                });
    
                addToast({
                    title: "New profile pic, who dis? 🤳",
                    description: "Looking fresh! Your new icon is live—hope it’s your best angle. 😉",
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
                    description: "Unable to edit icon ❌",
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

            // if (user?.username && !data.model?.likedUsernames.includes(user?.username)) {
            //     addToast({
            //         title: "Cold feet, Huh?",
            //         description: "Love one moment, gone the next! Commitment issues or just experimenting? Either way, that like won’t miss you… probably. 👀",
            //         classNames: {
            //             title: 'font-interTight font-semibold text-primaryText',
            //             icon: 'h-4 fill-primaryColor',
            //             description: 'font-interTight font-medium text-secondaryText',
            //             base: 'bg-emphasizingColor2 border-borderColor'
            //         },
            //         icon: (
            //             <LikeIcon wrapped={false} stroked={true} />
            //         )
            //     });
            // } else {
            //     addToast({
            //         title: "Ah, We Meet Again!",
            //         description: "A bold choice! Your like has been sent into the digital abyss, where it shall forever (or until you change your mind) remain. Cherish this moment. ❤️",
            //         classNames: {
            //             title: 'font-interTight font-semibold text-primaryText',
            //             icon: 'h-4 fill-redColor',
            //             description: 'font-interTight font-medium text-secondaryText',
            //             base: 'bg-emphasizingColor2 border-borderColor'
            //         },
            //         icon: (
            //             <LikeIcon wrapped={false} stroked={false} />
            //         )
            //     });
            // }
        },
    });

    return { uploadIconMutate };
}