import { useUploader } from "@/hooks/uploader/useUploader";
import { UserModel } from "@/models/user";
import { ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { UploadFileIcon } from "@/ui/icons/UploadFileIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { Button, Tooltip } from "@heroui/react";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type SettingsAccountIconChangeFormProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    uploadIconMutate: UseMutateFunction<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams, unknown>
    deleteIconMutate: UseMutateFunction<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams, unknown>
}

export const SettingsAccountIconChangeForm: React.FC<SettingsAccountIconChangeFormProps> = ({
    user,
    uploadIconMutate,
    deleteIconMutate
}) => {
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
                    )}>Upload a new icon</p>
                </Button>
            </Tooltip>
        ),
        {
            maxFiles: 1
        }
    );

    const deleteIcon = () => {
        deleteIconMutate({});
    }

    useEffect(() => {
        if (selectedFiles.length > 0) {
            uploadIconMutate({ icon: selectedFiles[0] });
            clearFiles();
        }
    }, [selectedFiles]);
    
    return (
        <div className="flex flex-col gap-4 pt-4 pb-4">
            <p className="font-interTight font-semibold text-sm text-secondaryText">Profile picture</p>
            <div className="flex flex-row items-center gap-4">
                <UserAvatarIcon
                    url={user?.icon}
                    size="sm"
                    customClassName='w-20 h-20 aspect-square object-cover'
                />
                <div className="flex flex-row gap-1">
                    {uploader}
                    <Button
                        className={clsx(
                            'justify-start gap-1.5 rounded-lg opacity-100',
                            'data-[hover=true]:bg-emphasizingColor2',
                            'transition-all duration-200'
                        )}
                        startContent={
                            <div className="h-4 fill-redColor">
                                <TrashIcon />
                            </div>
                        }
                        onPress={deleteIcon}
                        size='sm'
                        variant='light'
                    >
                        <p className={clsx(
                            'font-interTight font-semibold text-sm text-redText',
                        )}>Delete an icon</p>
                    </Button>
                </div>
            </div>
        </div>
    );
}