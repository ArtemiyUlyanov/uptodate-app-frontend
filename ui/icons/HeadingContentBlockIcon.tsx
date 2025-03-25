import React from 'react'
import icon from '@/public/images/home_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type HeadingContentBlockIconProps = React.SVGAttributes<SVGSVGElement>

export const HeadingContentBlockIcon: React.FC<HeadingContentBlockIconProps> = ({ ...props }) => {
    return (
        <svg 
            width="25" 
            height="25" 
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto aspect-square h-full rounded-md'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M25 0H0V25H25V0ZM6.89189 7.5C6.39931 7.5 6 7.89931 6 8.39189C6 8.88447 6.39931 9.28378 6.89189 9.28378H18.3081C18.8007 9.28378 19.2 8.88447 19.2 8.39189C19.2 7.89931 18.8007 7.5 18.3081 7.5H6.89189ZM6.89189 15.7054C6.39931 15.7054 6 16.1047 6 16.5973C6 17.0899 6.39931 17.4892 6.89189 17.4892H15.4541C15.9466 17.4892 16.3459 17.0899 16.3459 16.5973C16.3459 16.1047 15.9466 15.7054 15.4541 15.7054H6.89189ZM6 12.4945C6 12.0019 6.39931 11.6026 6.89189 11.6026H18.3081C18.8007 11.6026 19.2 12.0019 19.2 12.4945C19.2 12.9871 18.8007 13.3864 18.3081 13.3864H6.89189C6.39931 13.3864 6 12.9871 6 12.4945Z" />
        </svg>   
    )
}