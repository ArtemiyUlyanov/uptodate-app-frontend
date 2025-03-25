import { queryClient } from "@/utils/queryClient";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiSearchResponse } from "@/services/api/articles.search.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { addToast } from "@heroui/toast";

export type UseSearchLikeMutationParams = {
    queryKey: any
}

export type UseSearchLikeMutationResponse = {
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

export const useSearchLikeMutation = ({ queryKey }: UseSearchLikeMutationParams): UseSearchLikeMutationResponse => {
    const { user } = useAccount();

    const { mutate } = useMutation<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams>({
        mutationFn: likeArticleApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiSearchResponse | undefined) => {
                if (!oldData?.articles) return oldData;
        
                return {
                    ...oldData,
                    articles: oldData.articles.map(article =>
                        article.id === data.model?.id ? data.model : article
                    ),
                };
            });

            if (user?.username && !data.model?.likedUsernames.includes(user?.username)) {
                addToast({
                    title: "Cold feet, Huh?",
                    description: "Love one moment, gone the next! Commitment issues or just experimenting? Either way, that like won’t miss you… probably. 👀",
                    classNames: {
                        title: 'font-interTight font-semibold text-primaryText',
                        icon: 'h-4 fill-primaryColor',
                        description: 'font-interTight font-medium text-secondaryText',
                        base: 'bg-emphasizingColor2 border-borderColor'
                    },
                    icon: (
                        <LikeIcon wrapped={false} stroked={true} />
                    )
                });
            } else {
                addToast({
                    title: "Ah, We Meet Again!",
                    description: "A bold choice! Your like has been sent into the digital abyss, where it shall forever (or until you change your mind) remain. Cherish this moment. ❤️",
                    classNames: {
                        title: 'font-interTight font-semibold text-primaryText',
                        icon: 'h-4 fill-redColor',
                        description: 'font-interTight font-medium text-secondaryText',
                        base: 'bg-emphasizingColor2 border-borderColor'
                    },
                    icon: (
                        <LikeIcon wrapped={false} stroked={false} />
                    )
                });
            }
        },
    });

    return { likeMutate: mutate };
}