import { useAccount } from "@/hooks/models/useAccount";
import { useArticles } from "@/hooks/models/useArticles";
import { ArticleModel } from "@/models/article";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { AddIcon } from "@/ui/icons/AddIcon";
import { EditIcon } from "@/ui/icons/EditIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { ViewIcon } from "@/ui/icons/ViewIcon";
import { ConfirmationPopover } from "@/ui/popovers/ConfirmationPopover";
import { capitalizeText } from "@/utils/text.utils";
import { addToast, Button, Image, Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@heroui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export type DashboardUserArticlesTableProps = React.HTMLProps<HTMLDivElement> & {
    articles?: ArticleModel[]
    deleteArticle: (id: number) => void
}

export const DashboardUserArticlesTable: React.FC<DashboardUserArticlesTableProps> = ({
    articles,
    deleteArticle
}) => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

    const handleChange = (keys: Selection) => {
        if (keys == 'all') {
            setSelectedKeys(new Set(articles?.map(article => article.id.toString())));
        } else {
            setSelectedKeys(keys as Set<string>);
        }
    }

    const deleteSelectedArticles = () => {
        selectedKeys.forEach(key =>
            deleteArticle(Number(key))
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-end justify-between w-full">
                <div className="flex flex-col">
                    <p className="font-interTight font-semibold text-base text-primaryText">Your articles</p>
                    <p className="font-interTight font-semibold text-base text-secondaryText">These are your articles</p>
                </div>
                <div className="flex flex-row gap-1">
                    <ConfirmationPopover
                        text="Are you sure you want to delete those articles?"
                        action={deleteSelectedArticles}
                    >
                        {(onOpen) => (
                            <Button
                                className={clsx(
                                    'gap-1.5 bg-[transparent]',
                                    'data-[hover=true]:bg-emphasizingColor2',
                                    'transition-all duration-200',
                                )}
                                onPress={onOpen}
                                isDisabled={selectedKeys.size <= 0}
                                size="sm"
                                variant='light'
                                startContent={
                                    <div className="h-4 fill-redColor">
                                        <TrashIcon />
                                    </div>
                                }
                            >
                                <p className="font-interTight font-semibold text-sm text-redText">{`Delete all articles (${(selectedKeys as Set<string>).size})`}</p>
                            </Button>
                        )}
                    </ConfirmationPopover>
                    <Button
                        as='a'
                        href={`/dashboard/articles/create`}
                        className={clsx(
                            'gap-1.5 bg-[transparent]',
                            'data-[hover=true]:bg-emphasizingColor2',
                            'transition-all duration-200',
                        )}
                        // onPress={deleteArticle}
                        size="sm"
                        variant='light'
                        startContent={
                            <div className="h-4 fill-primaryColor">
                                <AddIcon />
                            </div>
                        }
                    >
                        <p className="font-interTight font-semibold text-sm text-primaryText">Create a new article</p>
                    </Button>
                </div>
            </div>
            <Table 
                removeWrapper 
                aria-label="Table with images"
                classNames={{
                    th: 'rounded-none font-interTight font-semibold text-sm text-primaryText bg-emphasizingColor2'
                }}
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={handleChange}
            >
                <TableHeader>
                    <TableColumn className="flex-1 w-24">Icon</TableColumn>
                    <TableColumn className="flex-1">Heading</TableColumn>
                    <TableColumn className="flex-1">Description</TableColumn>
                    <TableColumn className="flex-1 text-right">Activity</TableColumn>
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
                                <p className="font-interTight font-medium text-primaryText">{capitalizeText(article.heading)}</p>
                            </TableCell>
                            <TableCell>
                                <p className="font-interTight font-medium text-primaryText">{article.description}</p>
                            </TableCell>
                            <TableCell className="justify-end">
                                <div className="flex flex-row justify-end items-center gap-4">
                                    <div className="flex flex-row items-center gap-1">
                                        <div className="h-3 fill-primaryText">
                                            <ViewIcon />
                                        </div>
                                        <p className="font-interTight font-semibold text-primaryText">{article.views.length}</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-1">
                                        <LikeIcon 
                                            className="h-3.5 fill-primaryText" 
                                            wrapped={false}
                                            stroked={true} 
                                        />
                                        <p className="font-interTight font-semibold text-primaryText">{article.likes.length}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="items-end">
                                <div className="flex flex-row justify-end gap-1">
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
                                                'transition-all duration-200',
                                                !article.permissionScope.includes('DELETE') && 'hidden'
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
                                        content='Edit the article'
                                        closeDelay={0}
                                        classNames={{
                                            content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                                        }}
                                    >
                                        <Button
                                            as='a'
                                            href={`/dashboard/articles/${article.slug}/edit`}
                                            isIconOnly
                                            className={clsx(
                                                'bg-[transparent]',
                                                'data-[hover=true]:bg-emphasizingColor2',
                                                'transition-all duration-200',
                                                !article.permissionScope.includes('EDIT') && 'hidden'
                                            )}
                                            size="sm"
                                            variant='light'
                                        >
                                            <div className="h-4 fill-primaryColor">
                                                <EditIcon />
                                            </div>
                                        </Button>
                                    </Tooltip>
                                    <ConfirmationPopover
                                        text="Are you sure you want to delete this article?"
                                        action={() => deleteArticle(article.id)}
                                    >
                                        {(onOpen) => (
                                            <Button
                                                isIconOnly
                                                className={clsx(
                                                    'bg-[transparent]',
                                                    'data-[hover=true]:bg-emphasizingColor2',
                                                    'transition-all duration-200',
                                                    !article.permissionScope.includes('DELETE') && 'hidden'
                                                )}
                                                onPress={onOpen}
                                                size="sm"
                                                variant='light'
                                            >
                                                <div className="h-4 fill-redColor">
                                                    <TrashIcon />
                                                </div>
                                            </Button>
                                        )}
                                    </ConfirmationPopover>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}