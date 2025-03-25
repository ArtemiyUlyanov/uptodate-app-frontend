import { UserModel } from "@/models/user";
import TransparentButton from "@/ui/buttons/TransparentButton";
import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { UptodateIcon } from "@/ui/icons/UptodateIcon";
import { Button, Divider, Image, Tooltip, User } from "@heroui/react";
import { addToast } from "@heroui/toast";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { DashboardNavigationUserDropdown } from "./DashboardNavigationUserDropdown";
import { MenuUnwrapperIcon } from "@/ui/icons/MenuUnwrapperIcon";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { AddIcon } from "@/ui/icons/AddIcon";
import { DashboardNavigationSectionList } from "./DashboardNavigationSectionList";
import { ArticleModel } from "@/models/article";
import { ArticlesIcon } from "@/ui/icons/ArticlesIcon";
import { ViewIcon } from "@/ui/icons/ViewIcon";
import { EditIcon } from "@/ui/icons/EditIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { HelpIcon } from "@/ui/icons/HelpIcon";
import { SettingsIcon } from "@/ui/icons/SettingsIcon";
import DefaultLink from "@/ui/links/DefaultLink";
import { useRouter } from "next/navigation";

export type DashboardNavigationProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
    optionTemplates: DashboardOptionTemplate[]
    sectionTemplates: DashboardSectionTemplate[]
}

export type DashboardSectionTemplate = {
    name: string
    icon: React.ReactElement
    options: DashboardOptionTemplate[]
}

export type DashboardOptionTemplate = {
    text: string
    key: string
    icon: React.ReactElement
    selected: boolean
    link?: string
    popoverProps?: {
        actions: Array<{
            icon?: React.ReactElement
            text: string
            link?: string
            onClick?: () => void
            confirmationProps?: {
                text: string
            },
            classNames?: {
                text?: string
            }
        }>
    }
}

export const getDashboardOptions = (translate: (text: string) => string, selectedKey?: 'dashboard' | 'liked-articles', ): DashboardOptionTemplate[] => {
    return [
        {
            key: 'dashboard',
            text: 'Dashboard',
            link: '/dashboard',
            selected: selectedKey === 'dashboard',
            icon: (
                <DashboardIcon className="w-4 h-auto fill-primaryColor" wrapped={false} />
            )
        },
        {
            key: 'liked-articles',
            text: 'Liked articles',
            link: '/dashboard/liked-articles',
            selected: selectedKey === 'liked-articles',
            icon: (
                <LikeIcon className="w-4 h-auto fill-primaryColor" wrapped={false} stroked={false} />
            )
        }
    ];
}

export const getDashboardSections = (translate: (text: string) => string, deleteArticle: (id: number) => void, articles?: ArticleModel[]): DashboardSectionTemplate[] => {
    return [
        {
            name: 'My articles',
            icon: (
                <ArticlesIcon className="w-4 h-auto fill-primaryColor" />
            ),
            options: articles?.map(article => (
                {
                    key: article.slug,
                    text: article.heading,
                    selected: false,
                    icon: (
                        <div className="w-6">
                            <Image
                                alt={article.heading}
                                className="w-full object-cover object-top aspect-square"
                                radius="md"
                                shadow="none"
                                disableSkeleton={false}
                                src={article.cover}
                            />
                        </div>
                    ),
                    popoverProps: {
                        actions: [
                            {
                                icon: (
                                    <div className="h-3 fill-primaryColor">
                                        <ViewIcon />
                                    </div>
                                ),
                                text: 'Go to article',
                                link: `/${article.slug}`
                            },
                            {
                                icon: (
                                    <div className="h-4 fill-primaryColor">
                                        <EditIcon />
                                    </div>
                                ),
                                text: 'Edit article',
                                link: `/dashboard/articles/${article.slug}/edit`
                            },
                            {
                                icon: (
                                    <div className="h-4 fill-redColor">
                                        <TrashIcon />
                                    </div>
                                ),
                                text: 'Delete article',
                                onClick: () => deleteArticle(article.id),
                                confirmationProps: {
                                    text: 'Are you sure you want to delete this article?'
                                },
                                classNames: {
                                    text: 'text-redText'
                                }
                            }
                        ]
                    }
                }
            )) || []
        }
    ];
} 

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
    user,
    isUserFetched,
    optionTemplates,
    sectionTemplates
}) => {
    const router = useRouter();

    return (
        <div className="relative basis-1/5 bg-emphasizingColor border-r border-r-borderColor">
            <div className="sticky top-0 w-full h-[100vh]">
                <div className={clsx(
                    "flex flex-col justify-between w-full h-full gap-8 pt-5 p-3"
                )}>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row items-center justify-between w-full">
                            <DashboardNavigationUserDropdown 
                                user={user} 
                                isUserFetched={isUserFetched} 
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Tooltip
                                content={'Click to create a new article'}
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryText'
                                }}
                            >
                                <DefaultButton
                                    as='a'
                                    text={'Create a new article'}
                                    customClassName='font-interTight font-semibold text-sm text-center rounded-lg'
                                    size="sm"
                                    href='/dashboard/articles/create'
                                    startContent={
                                        <div className="h-4 fill-primaryColor">
                                            <AddIcon />
                                        </div>
                                    }
                                />
                            </Tooltip>
                            <div className={clsx(
                                "flex flex-col gap-2 w-full h-auto",
                            )}>
                                {optionTemplates.map((option, index) =>
                                    <Tooltip
                                        key={index}
                                        content={'Click to go'}
                                        closeDelay={0}
                                        classNames={{
                                            content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryText'
                                        }}
                                    >
                                        <Button
                                            as='a'
                                            href={option.link}
                                            className={clsx(
                                                'justify-start pl-3 pr-3 pt-1.5 pb-1.5 h-auto gap-3 rounded-lg opacity-100',
                                                'data-[hover=true]:bg-emphasizingColor2',
                                                'transition-all duration-200 text-primaryText',
                                                option.selected && 'bg-emphasizingColor2',
                                                'transition-all duration-200'
                                            )}
                                            isDisabled={option.selected}
                                            size='sm'
                                            variant='light'
                                            startContent={
                                                <div className={clsx(
                                                    option.selected && "fill-primaryColor",
                                                    !option.selected && "fill-primaryColor"
                                                )}>
                                                    {option.icon}
                                                </div>
                                            }
                                        >
                                            <p className={clsx(
                                                'font-interTight font-semibold text-sm',
                                            )}>{option.text}</p>
                                        </Button>
                                    </Tooltip>
                                )}
                                <DashboardNavigationSectionList sections={sectionTemplates} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-1 w-full">
                            <Button
                                as='a'
                                href='/faq'
                                className={clsx(
                                    'justify-start pl-3 pr-3 pt-1.5 pb-1.5 h-auto gap-3 rounded-lg opacity-100',
                                    'data-[hover=true]:bg-emphasizingColor2',
                                    'transition-all duration-200 text-primaryText',
                                    'transition-all duration-200'
                                )}
                                size='sm'
                                variant='light'
                                startContent={
                                    <div className={clsx(
                                        "h-4 fill-secondaryText",
                                    )}>
                                        <HelpIcon />
                                    </div>
                                }
                            >
                                <p className={clsx(
                                    'font-interTight font-semibold text-sm text-secondaryText',
                                )}>Help & FAQ</p>
                            </Button>
                            <Button
                                as='a'
                                href='/settings'
                                className={clsx(
                                    'justify-start pl-3 pr-3 pt-1.5 pb-1.5 h-auto gap-3 rounded-lg opacity-100',
                                    'data-[hover=true]:bg-emphasizingColor2',
                                    'transition-all duration-200 text-primaryText',
                                    'transition-all duration-200'
                                )}
                                size='sm'
                                variant='light'
                                startContent={
                                    <div className={clsx(
                                        "h-4 fill-secondaryText",
                                    )}>
                                        <SettingsIcon />
                                    </div>
                                }
                            >
                                <p className={clsx(
                                    'font-interTight font-semibold text-sm text-secondaryText',
                                )}>Settings</p>
                            </Button>
                        </div>
                        {/* <div className="pl-2 pr-2">
                            <DefaultLink
                                text='Go back'
                                link='#'
                                onClick={() => router.back()}
                                arrowPlacement="left"
                                arrowActived={true}
                                customClassName={clsx(
                                    'font-interTight font-semibold text-sm',
                                    history.length <= 0 && 'hidden'
                                )}
                                actived={true}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}