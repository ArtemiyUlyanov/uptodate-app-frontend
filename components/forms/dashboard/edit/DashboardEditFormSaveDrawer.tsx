import { useUploader } from "@/hooks/uploader/useUploader";
import { ContentBlockModel } from "@/models/content_block";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { CentredDrawer } from "@/ui/drawers/CentredDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { UploadFileIcon } from "@/ui/icons/UploadFileIcon";
import { addToast, Button, Card, CardFooter, Tooltip } from "@heroui/react";
import clsx from "clsx";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { DashboardMutationFormCategories } from "../DashboardMutationFormCategories";
import DefaultTextarea from "@/ui/textareas/DefaultTextarea";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";
import { PersonalAccountIcon } from "@/ui/icons/PersonalAccountIcon";
import { ApiArticleCreateParams, ApiArticleCreateResponse, createArticleApi } from "@/services/api/articles.create.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ArticleModel } from "@/models/article";
import { DashboardMutationFormCover } from "../DashboardMutationFormCover";
import { ApiArticleEditParams, ApiArticleEditResponse, editArticleApi } from "@/services/api/articles.edit.endpoint";
import { useRouter } from "next/navigation";

export type DashboardEditFormSaveDrawerProps = React.HTMLProps<HTMLDivElement> & {
    heading: string
    contentBlocks: ContentBlockModel[]
    resources: File[]
    article?: ArticleModel
    isArticleFetched: boolean
    isFormSent: boolean
    setIsFormSent: Dispatch<SetStateAction<boolean>>
}

const useEditArticleQuery = (
    params: ApiArticleEditParams,
    opts: Partial<UseQueryOptions<ApiArticleEditResponse>> = {},
) => {
    return useQuery<ApiArticleEditResponse>({
      queryKey: ['article', params.heading, params.description, params.content, params.categories, params.cover, params.resources],
      queryFn: () => editArticleApi(params),
      ...opts,
    });
}

export const DashboardEditFormSaveDrawer: React.FC<DashboardEditFormSaveDrawerProps> = ({
    heading,
    contentBlocks,
    resources,
    article,
    isArticleFetched,
    isFormSent,
    setIsFormSent
}) => {
    const [categories, setCategories] = useState<Set<string>>(new Set([]));
    const [description, setDescription] = useState<string>('');

    const [isCoverChanged, setIsCoverChanged] = useState<boolean>(false);
    
    const router = useRouter();

    const { selectedFiles, addFile, removeFile, clearFiles, uploader } = useUploader(
        (onClick) => (
            <Tooltip
                content='Upload file (8MB limit)'
                closeDelay={0}
                classNames={{
                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                }}
            >
                <Button
                    className={clsx(
                        'justify-start gap-1.5 rounded-lg opacity-100',
                        'data-[hover=true]:bg-emphasizingColor2',
                        'transition-all duration-200'
                    )}
                    size='sm'
                    variant='light'
                    onPress={onClick}
                    startContent={
                        <div className={clsx(
                            "h-4 fill-secondaryText"
                        )}>
                            <UploadFileIcon />
                        </div>
                    }
                >
                    <p className={clsx(
                        'font-interTight font-semibold text-sm',
                    )}>Upload a cover</p>
                </Button>
            </Tooltip>
        )
    );

    const { data, refetch, isFetching } = useEditArticleQuery({
        id: article?.id || 0,
        heading: heading,
        description: description,
        content: contentBlocks,
        categories: Array.from(categories),
        cover: isCoverChanged ? selectedFiles[0] : undefined,
        resources: resources
    }, {
        enabled: false
    });

    useEffect(() => {
        if (isArticleFetched && article !== undefined) {
            setDescription(article.description);
            setCategories(new Set(article.categories.map(category => category.name.english)));
        }
    }, [isArticleFetched]);

    const sendForm = () => {
        refetch()
            .then((response) => {
                if (response.data?.model) {
                    addToast({
                        title: "Article has been edited successfully!",
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

                    setIsFormSent(true);
                    setTimeout(() => router.push('/dashboard'), 1000);
                } else {
                    addToast({
                        title: "Unable to edit article!",
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
            });
    }

    return (
        <CentredDrawer
            drawerSize="md"
            title='Saving the draft'
            closeTooltip='Click to exit'
        >
            <DrawerTrigger>
                {(onClick) => (
                    <div>
                        <DefaultButton
                            text='Save'
                            customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                            onPress={onClick}
                            isDisabled={!heading || contentBlocks.length <= 0 || isFormSent}
                            type="submit"
                            size="sm"
                        />
                    </div>
                )}
            </DrawerTrigger>
            <DrawerBody>
                {(onClose) => (
                    <form
                        className="flex flex-col gap-4 pt-2 pb-2"
                        onSubmit={(e: React.FormEvent) => {
                            e.preventDefault();
                            sendForm();

                            onClose();
                        }}
                    >
                        <div className="flex flex-col gap-1">
                            <p className="font-interTight font-semibold text-sm text-secondaryText">Categories</p>
                            <DashboardMutationFormCategories categories={categories} setCategories={setCategories} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="font-interTight font-semibold text-sm text-secondaryText">Description</p>
                            <DefaultTextarea
                                placeholder='Enter your description...'
                                customClassName={clsx(
                                    'w-full'
                                )}
                                inputClassName='text-base'
                                fullBordered={true}
                                rows={5}
                                maxLength={500}
                                value={description}
                                handleChange={setDescription}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="font-interTight font-semibold text-sm text-secondaryText">Cover</p>
                            <DashboardMutationFormCover selectedFiles={selectedFiles} uploader={uploader} removeFile={removeFile} isCoverChanged={isCoverChanged} setIsCoverChanged={setIsCoverChanged} article={article} />
                        </div>
                        <div>
                            <DefaultButton
                                text='Save the draft'
                                customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                                isLoading={isFetching}
                                isDisabled={categories.size <= 0 || !description || (isCoverChanged && selectedFiles.length <= 0) || isFormSent}
                                type="submit"
                                size="sm"
                            />
                        </div>
                    </form>
                )}
            </DrawerBody>
        </CentredDrawer>
    );
}