import { ArticleModel } from "@/models/article";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { ViewIcon } from "@/ui/icons/ViewIcon";
import { formatDate } from "@/utils/date.utils";
import { capitalizeText } from "@/utils/text.utils";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { ArticleLikeButton } from "../buttons/ArticleLikeButton";
import { ArticleSharePostButton } from "../buttons/ArticleSharePostButton";
import { UserModel } from "@/models/user";
import Link from "next/link";
import { Skeleton, Tooltip } from "@heroui/react";

// export type ArticleCoverProps = React.HTMLProps<HTMLDivElement> & {
//     article: ArticleModel
//     author?: UserModel
//     likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
// }

// export const ArticleCover: React.FC<ArticleCoverProps> = ({
//     article,
//     author,
//     likeMutate
// }) => {
//     return (
//         <div className="flex flex-col gap-6">
//             <div className="flex flex-col gap-2 w-full">
//                 <p className="font-interTight font-semibold text-aspectText text-sm">{formatDate(article.createdAt)}</p>
//                 <p className="font-interTight font-semibold text-primaryText text-xl">{capitalizeText(article?.heading)}</p>
//                 <p className="font-interTight font-medium text-secondaryText text-base">{article.description}</p>
//             </div>
//             <div className={clsx(
//                 "flex flex-row justify-between w-full items-center gap-8",
//                 "pt-3 border border-[transparent] border-t-borderColor"
//             )}>
//                 <div className={clsx(
//                     'flex flex-row gap-4 items-center'
//                 )}>
//                     <div className="flex flex-row items-center gap-2">
//                         <UserAvatarIcon
//                             url={author?.icon}
//                             size="sm"
//                             className='w-full h-full aspect-square object-cover'
//                         />
//                         <div className={clsx(
//                             'flex flex-col h-auto'
//                         )}>
//                             <p className={clsx(
//                                 'relative font-interTight font-semibold text text-sm text-primaryText line-clamp-1'
//                             )}>{author?.firstName + " " + author?.lastName}</p>
//                             <p className={clsx(
//                                 'relative font-interTight font-medium text text-sm text-secondaryText line-clamp-1'
//                             )}>@{author?.username}</p>
//                         </div>
//                     </div>
//                     <div className="flex flex-row items-center gap-4">
//                         <div className="flex flex-row items-center gap-1">
//                             <div className="h-3 fill-primaryColor">
//                                 <ViewIcon />
//                             </div>
//                             <p className="font-interTight font-semibold text-sm text-primaryText">{article.views.length}</p>
//                         </div>
//                         <div className="flex flex-row items-center gap-1">
//                             <LikeIcon className="w-4 h-4 fill-primaryColor" wrapped={false} stroked={true} />
//                             <p className="font-interTight font-semibold text-sm text-primaryText">{article.likes.length}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex flex-row gap-1">
//                     <ArticleLikeButton article={article} likeMutate={likeMutate} />
//                     <ArticleSharePostButton url={window.location.href} />
//                 </div>
//             </div>
//         </div>
//     );
// }

export type ArticleCoverProps = React.HTMLProps<HTMLDivElement> & {
    article: ArticleModel
    author?: UserModel
    isAuthorFetched: boolean
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

export const ArticleCover: React.FC<ArticleCoverProps> = ({
    article,
    author,
    isAuthorFetched,
    likeMutate
}) => {
    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-col w-full justify-between gap-4">
                <div className={clsx(
                    "flex flex-row justify-between w-full items-center gap-8",
                    //"pt-3 border border-[transparent] border-t-borderColor"
                )}>
                    <div className={clsx(
                        'flex flex-row gap-2 items-center'
                    )}>
                        <Skeleton isLoaded={isAuthorFetched && author != null} className="bg-emphasizingColor2 rounded-lg">
                            <Tooltip
                                content='See the profile'
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                }}
                            >
                                <Link
                                    href={`/users/${author?.username}`} 
                                    className={clsx(
                                        "flex flex-row items-center gap-2",
                                        "transition-all duration-200",
                                        "sm:hover:opacity-50",
                                        "active:opacity-50 sm:active:opacity",
                                    )}
                                >
                                    <UserAvatarIcon
                                        url={author?.icon}
                                        size={undefined}
                                        customClassName='w-5 h-5 aspect-square object-cover'
                                    />
                                    <div className={clsx(
                                        'flex flex-col h-auto'
                                    )}>
                                        <p className={clsx(
                                            'relative font-interTight font-semibold text text-sm text-primaryText line-clamp-1'
                                        )}>{author?.firstName + " " + author?.lastName}</p>
                                        {/* <p className={clsx(
                                            'relative font-interTight font-medium text text-sm text-secondaryText line-clamp-1'
                                        )}>@{author?.username}</p> */}
                                    </div>
                                </Link>
                            </Tooltip>
                        </Skeleton>
                        <p className="font-interTight font-semibold text-secondaryText text-base">·</p>
                        <p className="font-interTight font-semibold text-aspectText text-sm">{formatDate(article.createdAt)}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p className="font-interTight font-semibold text-primaryText text-xl">{capitalizeText(article?.heading)}</p>
                    <p className="font-interTight font-medium text-secondaryText text-base">{article.description}</p>
                </div>
                <div className="flex flex-row items-center pb-4 gap-4">
                    <div className="flex flex-row items-center gap-1">
                        <div className="h-3 fill-primaryColor">
                            <ViewIcon />
                        </div>
                        <p className="font-interTight font-semibold text-sm text-primaryText">{article.views.length}</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <LikeIcon className="w-4 h-4 fill-primaryColor" wrapped={false} stroked={true} />
                        <p className="font-interTight font-semibold text-sm text-primaryText">{article.likes.length}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <ArticleLikeButton article={article} likeMutate={likeMutate} />
                <ArticleSharePostButton url={window.location.href} />
            </div>
        </div>
    );
}