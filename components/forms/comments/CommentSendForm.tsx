import { useUploader } from "@/hooks/uploader/useUploader";
import { ArticleModel } from "@/models/article";
import { ApiCommentCreateParams, ApiCommentCreateResponse, createCommentApi } from "@/services/api/comments.create.endpoint";
import { addToast, Button, Card, CardFooter, Tooltip } from "@heroui/react";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import DefaultButton from "../../../ui/buttons/DefaultButton";
import { CloseIcon } from "../../../ui/icons/CloseIcon";
import { UploadFileIcon } from "../../../ui/icons/UploadFileIcon";
import DefaultTextarea from "../../../ui/textareas/DefaultTextarea";
import { ErrorResponse } from "@/services/api/responses.types";
import { CommentIcon } from "@/ui/icons/CommentIcon";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";

export type CommentSendFormProps = React.HTMLProps<HTMLDivElement> & {
    article: ArticleModel
    createMutate: UseMutateFunction<ApiCommentCreateResponse, ErrorResponse, ApiCommentCreateParams, unknown>
    isCreatePending: boolean
}

export const CommentSendForm: React.FC<CommentSendFormProps> = ({
    article,
    createMutate,
    isCreatePending
}) => {
    const [content, setContent] = useState<string>('');

    const { selectedFiles, addFile, removeFile, clearFiles, uploader } = useUploader(
        (onClick) => (
            <Tooltip
                content='Upload files (3 max, 8MB limit)'
                closeDelay={0}
                classNames={{
                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                }}
            >
                <div
                    onClick={onClick} 
                    className={clsx(
                        'w-4',
                        'transition-all duration-200',
                        'hover:opacity-50',
                        'active:opacity-50 sm:active:opacity'
                    )}
                >
                    <UploadFileIcon className="fill-secondaryColor" />
                </div>
            </Tooltip>
        )
    )

    const clearForm = () => {
        setContent('');
        clearFiles();
    }

    const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createMutate({ content: content, articleId: article.id, resources: selectedFiles });

        clearForm();
    } 

    return (
        <form 
            className="flex flex-col gap-2 pt-2 pb-2"
            onSubmit={sendForm}
        >
            <p className="font-interTight font-semibold text-sm text-secondaryText">Leave a comment</p>
            <DefaultTextarea
                placeholder='Start typing here...'
                customClassName={clsx(
                    'w-full'
                )}
                inputClassName='text-base'
                fullBordered={true}
                rows={5}
                maxLength={500}
                value={content}
                handleChange={(value) => setContent(value)}
            />
            <div className="flex flex-row flex-wrap gap-4">
                {selectedFiles.map((file, index) => (
                    <Card>
                        <img 
                            key={index} 
                            src={URL.createObjectURL(file)} 
                            alt={`Preview ${index}`} 
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <CardFooter className="flex flex-row justify-end absolute p-1">
                            <Button
                                isIconOnly
                                className={clsx(
                                    "text-secondaryText",
                                    'data-[hover=true]:bg-emphasizingColor2'
                                )}
                                size="sm"
                                variant="flat"
                                onPress={() => removeFile(file)}
                            >
                                <div 
                                    className="w-3 aspect-square"
                                >
                                    <CloseIcon customClassName="fill-primaryColor" />
                                </div>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="flex flex-row items-center gap-4">
                <Tooltip
                    content='Send a comment'
                    closeDelay={0}
                    classNames={{
                        content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                    }}
                >
                    <div>
                        <DefaultButton
                            text='Send'
                            customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                            isLoading={isCreatePending}
                            isDisabled={content.length <= 0}
                            type="submit"
                            size="sm"
                        />
                    </div>
                </Tooltip>
                {uploader}
            </div>
        </form>
    );
}