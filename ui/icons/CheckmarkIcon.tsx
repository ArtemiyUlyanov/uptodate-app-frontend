import React from 'react'
import icon from '@/public/images/uptodate_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type CheckmarkIconProps = React.SVGAttributes<SVGSVGElement>

export const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({
  ...props
}) => {
    return (      
        <svg 
            width="14" 
            height="15" 
            viewBox="0 0 14 15" 
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full object-contain select-none'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M12.6431 0.92814C13.2351 1.28332 13.4271 2.05115 13.0719 2.64313L6.24817 14.0159L1.11612 8.88389C0.627961 8.39573 0.627961 7.60428 1.11612 7.11612C1.60427 6.62797 2.39573 6.62797 2.88388 7.11612L5.75183 9.98407L10.9281 1.35689C11.2833 0.764911 12.0511 0.572954 12.6431 0.92814Z" />
        </svg>          
    )
}