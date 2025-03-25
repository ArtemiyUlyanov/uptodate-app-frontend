import { useUploader } from "@/hooks/uploader/useUploader";
import { UserModel } from "@/models/user";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { UploadFileIcon } from "@/ui/icons/UploadFileIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import DefaultInput from "@/ui/inputs/DefaultInput";
import { Button, Tooltip } from "@heroui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { SettingsAccountChangeEmailForm } from "./confirmable/email/SettingsAccountChangeEmailForm";

export type SettingsAccountNamePropertyProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    firstName: string
    setFirstName: Dispatch<SetStateAction<string>>
    lastName: string
    setLastName: Dispatch<SetStateAction<string>>
    username: string
    setUsername: Dispatch<SetStateAction<string>>
    conflictedColumns?: Array<'USERNAME' | 'EMAIL'>
}

export const SettingsAccountNameProperty: React.FC<SettingsAccountNamePropertyProps> = ({
    user,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    conflictedColumns
}) => {    
    return (
        <div className="flex flex-col gap-2 pt-4 pb-4 w-full">
            <p className="font-interTight font-semibold text-sm text-secondaryText">Profile name</p>
            <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex flex-row gap-4 w-full">
                    <DefaultInput
                        placeholder='First name'
                        customClassName={clsx(
                            'flex-1 w-full'
                        )}
                        inputClassName='text-base'
                        fullBordered={true}
                        value={firstName}
                        handleChange={setFirstName}
                        required
                    />
                    <DefaultInput
                        placeholder='Last name'
                        customClassName={clsx(
                            'flex-1 w-full'
                        )}
                        inputClassName='text-base'
                        fullBordered={true}
                        value={lastName}
                        handleChange={setLastName}
                        required
                    />
                </div>
                <div className="flex flex-col w-full gap-1">
                    <DefaultInput
                        placeholder='Username'
                        customClassName={clsx(
                            'flex-2 w-full',
                            conflictedColumns?.includes('USERNAME') && 'ring-1 ring-redColor'
                        )}
                        startContent={
                            <p className="font-interTight font-semibold text-base text-secondaryText">@</p>
                        }
                        inputClassName='text-base'
                        fullBordered={true}
                        value={username}
                        handleChange={setUsername}
                        required
                    />
                    <p className={clsx(
                        "font-interTight font-medium text-sm text-redColor",
                        username === user?.username && 'hidden'
                    )}>You will have to auth again after changing username</p>  
                    <p className={clsx(
                        "font-interTight font-medium text-sm text-redColor",
                        !conflictedColumns?.includes('USERNAME') && 'hidden'
                    )}>The user with such username already exists!</p>                
                </div>
            </div>
        </div>
    );
}