import { useUploader } from "@/hooks/uploader/useUploader";
import { CommentModel } from "@/models/comment";
import { ApiCommentEditParams, ApiCommentEditResponse, editCommentApi } from "@/services/api/comments.edit.endpoint";
import { urlsToFiles } from "@/utils/file.utils";
import { Button, Card, CardFooter, Tooltip } from "@heroui/react";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DefaultButton from "../../../ui/buttons/DefaultButton";
import { CloseIcon } from "../../../ui/icons/CloseIcon";
import { UploadFileIcon } from "../../../ui/icons/UploadFileIcon";
import DefaultTextarea from "../../../ui/textareas/DefaultTextarea";
import { ErrorResponse } from "@/services/api/responses.types";

export type CommentEditFormProps = React.HTMLProps<HTMLDivElement> & {
    comment: CommentModel
    setShowEditForm: Dispatch<SetStateAction<boolean>>
    editMutate: UseMutateFunction<ApiCommentEditResponse, ErrorResponse, ApiCommentEditParams, unknown>
    isEditPending: boolean
}

export const CommentEditForm: React.FC<CommentEditFormProps> = ({
    comment,
    setShowEditForm,
    editMutate,
    isEditPending
}) => {
    const [content, setContent] = useState<string>('');
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    const { selectedFiles, setSelectedFiles, addFile, removeFile, clearFiles, uploader } = useUploader(
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

    useEffect(() => {
        if (!isDataLoaded) {
            setContent(comment.content);
        
            urlsToFiles(comment.resources || [])
                .then((files) => setSelectedFiles(files));

            setIsDataLoaded(true);
        }
    }, []);

    const sendForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        editMutate({ id: comment.id, content: content, resources: selectedFiles });
        setShowEditForm(false);
    } 

    return (
        <form 
            className="flex flex-col w-full gap-2 pt-2 pb-2"
            onSubmit={sendForm}
        >
            {isDataLoaded &&
                <>
                    <p className="font-interTight font-semibold text-sm text-secondaryText">Edit a comment</p>
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
                </>
            }
            <div className="flex flex-row items-center gap-4">
                <Tooltip
                    content='Save a comment'
                    closeDelay={0}
                    classNames={{
                        content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryColor'
                    }}
                >
                    <div>
                        <DefaultButton
                            text='Save'
                            customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                            isLoading={isEditPending}
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