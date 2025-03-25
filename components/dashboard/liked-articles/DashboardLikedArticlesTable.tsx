import { useAccount } from "@/hooks/models/useAccount";
import { useArticles } from "@/hooks/models/useArticles";
import { ArticleModel } from "@/models/article";
import { UserModel } from "@/models/user";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { AddIcon } from "@/ui/icons/AddIcon";
import { EditIcon } from "@/ui/icons/EditIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { ViewIcon } from "@/ui/icons/ViewIcon";
import { capitalizeText } from "@/utils/text.utils";
import { addToast, Button, Image, Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, user } from "@heroui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export type DashboardLikedArticlesTableProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    articles?: ArticleModel[]
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

export const DashboardLikedArticlesTable: React.FC<DashboardLikedArticlesTableProps> = ({
    user,
    articles,
    likeMutate
}) => {
    const toggleLikeOnArticle = (id: number) => {
        likeMutate({ id });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-end justify-between w-full">
                <div className="flex flex-col">
                    <p className="font-interTight font-semibold text-base text-primaryText">Liked articles</p>
                    <p className="font-interTight font-semibold text-base text-secondaryText">These are the articles you ever liked</p>
                </div>
            </div>
            <Table 
                removeWrapper 
                aria-label="Table with images"
                classNames={{
                    th: 'rounded-none font-interTight font-semibold text-sm text-primaryText bg-emphasizingColor2'
                }}
            >
                <TableHeader>
                    <TableColumn className="flex-1 pl-4 w-24">Icon</TableColumn>
                    <TableColumn className="flex-1">Heading</TableColumn>
                    <TableColumn className="flex-1">Description</TableColumn>
                    <TableColumn className="flex-1 text-right pr-4">Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No articles to show"}>
                    {(articles || []).map(article =>
                        <TableRow 
                            key={article.id}
                        >
                            <TableCell>
                                <Image
                                    alt={article.heading}
                                    className="w-full object-cover object-top aspect-[16/9]"
                                    radius="md"
                                    shadow="none"
                                    disableSkeleton={false}
                                    src={article.cover}
                                />
                            </TableCell>
                            <TableCell>
                                <p className="font-interTight font-medium text-primaryColor">{capitalizeText(article.heading)}</p>
                            </TableCell>
                            <TableCell>
                                <p className="font-interTight font-medium text-primaryColor">{article.description}</p>
                            </TableCell>
                            <TableCell className="justify-end">
                                <div className="flex flex-row gap-1">
                                    <Tooltip
                                        content='View the article'
                                        closeDelay={0}
                                        classNames={{
                                            content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                        }}
                                    >
                                        <Button
                                            as='a'
                                            href={`/${article.slug}`}
                                            isIconOnly
                                            className={clsx(
                                                'bg-[transparent]',
                                                'data-[hover=true]:bg-emphasizingColor2',
                                                'transition-all duration-200'
                                            )}
                                            size="sm"
                                            variant='light'
                                        >
                                            <div className="h-3 fill-primaryColor">
                                                <ViewIcon />
                                            </div>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        content={article.likedUsernames.includes(user?.username || '') ? 'Unlike the article' : 'Like the article'}
                                        closeDelay={0}
                                        classNames={{
                                            content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                        }}
                                    >
                                        <Button
                                            isIconOnly
                                            className={clsx(
                                                'bg-[transparent]',
                                                'data-[hover=true]:bg-emphasizingColor2',
                                                'transition-all duration-200'
                                            )}
                                            onPress={() => toggleLikeOnArticle(article.id)}
                                            size="sm"
                                            variant='light'
                                        >
                                            <div className={clsx(
                                                "h-4",
                                                article.likedUsernames.includes(user?.username || '') ? 'fill-redColor' : 'fill-primaryColor'
                                            )}>
                                                <LikeIcon wrapped={false} stroked={!article.likedUsernames.includes(user?.username || '')} />
                                            </div>
                                        </Button>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}