import React, { useMemo } from 'react'
import clsx from 'clsx';
import { Avatar } from '@heroui/react';
import Image from 'next/image';
import empty_icon from '@/public/images/user_empty_icon.png';

export type UserAvatarIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    url?: string,
    size?: "sm" | "md" | "lg"
    customClassName?: string
}

export const UserAvatarIcon: React.FC<UserAvatarIconProps> = ({
    url,
    size,
    customClassName
}) => {
    const emptyIcon =
        <Avatar
            src={empty_icon.src}
            alt='Image is likely not to be supported'
            className={clsx(
                'select-none',
                customClassName
            )}
            size={size}
        />

    return (
        (url ?
            <Avatar
                src={url}
                alt='Image is likely not to be supported'
                className={clsx(
                    'select-none',
                    customClassName
                )}
                fallback={emptyIcon}
                size={size}
            />
        :
            emptyIcon
        )
    )
}