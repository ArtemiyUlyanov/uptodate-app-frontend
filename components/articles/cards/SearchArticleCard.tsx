import { useUser } from "@/hooks/models/useUser";
import { ArticleModel } from "@/models/article";
import { CategoryModel } from "@/models/category";
import { UserModel } from "@/models/user";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { formatDate, retrieveDateFromISO } from "@/utils/date.utils";
import { capitalizeText, parseQueryText } from "@/utils/text.utils";
import { Card, CardBody, Image, Link, Skeleton } from "@heroui/react";
import clsx from "clsx";
import { useMemo } from "react";

export type SearchArticleCardProps = {
    article: ArticleModel
    query?: string
    className?: string
}

export const SearchArticleCard: React.FC<SearchArticleCardProps> = ({
    article,
    query,
    className
}) => {
    const { user: author, isFetched: isAuthorFetched } = useUser(article.authorId);

    return (
        <Card 
            className="w-full" 
            radius="none"
            shadow="none"
            classNames={{
                base: 'bg-[transparent]'
            }}
        >
            <CardBody className="flex flex-row overflow-hidden gap-2 p-1">
                <div className={clsx(
                    'flex flex-row w-full gap-4'
                )}>
                    <div className="w-1/4">
                        <Image
                            alt={article.heading}
                            className="w-full object-cover object-top aspect-square"
                            radius="lg"
                            shadow="none"
                            disableSkeleton={false}
                            src={article.cover}
                        />
                    </div>
                    <div className={clsx(
                        'flex flex-col w-3/4 gap-1'
                    )}>
                        <div className={clsx(
                            'flex flex-row flex-wrap items-center gap-2'
                        )}>
                            <Skeleton isLoaded={isAuthorFetched && author != null} className="bg-emphasizingColor2 rounded-lg">
                                <div className={clsx(
                                    'flex flex-row gap-2 items-center'
                                )}>
                                    <UserAvatarIcon 
                                        url={author?.icon}
                                        size="sm"
                                        className='w-full h-full aspect-square object-cover'
                                    />
                                    <div className={clsx(
                                        'flex flex-col h-auto'
                                    )}>
                                        <p className={clsx(
                                            'relative font-interTight font-semibold text text-sm text-primaryText line-clamp-1'
                                        )}>{author?.firstName + " " + author?.lastName}</p>
                                        <p className={clsx(
                                            'relative font-interTight font-medium text text-sm text-aspectText line-clamp-1'
                                        )}>{formatDate(article.createdAt)}</p>
                                    </div>
                                </div>
                            </Skeleton>
                        </div>
                        <div className={clsx(
                            'flex flex-col gap-1'
                        )}>
                            <Link
                                href={`/${article.slug}`}
                                className="hover:opacity-50"
                            >
                                <p className="font-interTight font-semibold text-primaryText text-sm line-clamp-2">{parseQueryText(capitalizeText(article.heading), query || '', 'bg-aspectText text-primaryText')}</p>
                            </Link>
                            <p className="font-interTight font-medium text-secondaryText text-sm line-clamp-3">{parseQueryText(article.description, query || '', 'bg-aspectText text-primaryText')}</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default SearchArticleCard;