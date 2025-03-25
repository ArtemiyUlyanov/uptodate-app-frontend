import { Avatar, User } from "@heroui/react";
import clsx from "clsx";
import React, { ComponentProps } from "react";
import empty_icon from '@/public/images/user_empty_icon.png';

export type DefaultUserProps = ComponentProps<typeof User>

export const DefaultUser: React.FC<DefaultUserProps> = ({
    ...props
}) => {
    const emptyIcon =
        <Avatar
            src={empty_icon.src}
            alt='Image is likely not to be supported'
            className={clsx(
                'select-none'
            )}
        />

    return (
        <User
            {...props}
            avatarProps={{
                fallback: emptyIcon,
                ...props.avatarProps
            }} 
        />
    );
}