import React from 'react'
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

import filters_icon from '@/public/images/filters_icon_3.png';

export type CategoriesFilterIconProps = React.SVGAttributes<SVGSVGElement> & {
    className?: string
}

export const CategoriesFilterIcon: React.FC<CategoriesFilterIconProps> = ({
    className,
    ...props
}) => {
    return (
      <svg 
        width="25" 
        height="25" 
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
          'w-auto h-full rounded-md object-contain select-none'
        )}
        {...props}
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M25 0H0V25H25V0ZM6.5 5.5C5.94772 5.5 5.5 5.94771 5.5 6.5V10.7222C5.5 11.2745 5.94771 11.7222 6.5 11.7222H10.7222C11.2745 11.7222 11.7222 11.2745 11.7222 10.7222V6.5C11.7222 5.94772 11.2745 5.5 10.7222 5.5H6.5ZM5.5 14.2778C5.5 13.7255 5.94772 13.2778 6.5 13.2778H10.7222C11.2745 13.2778 11.7222 13.7255 11.7222 14.2778V18.5C11.7222 19.0523 11.2745 19.5 10.7222 19.5H6.5C5.94771 19.5 5.5 19.0523 5.5 18.5V14.2778ZM13.2778 14.2778C13.2778 13.7255 13.7255 13.2778 14.2778 13.2778H18.5C19.0523 13.2778 19.5 13.7255 19.5 14.2778V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.2778C13.7255 19.5 13.2778 19.0523 13.2778 18.5V14.2778ZM19.5 8.61111C19.5 10.3293 18.1071 11.7222 16.3889 11.7222C14.6707 11.7222 13.2778 10.3293 13.2778 8.61111C13.2778 6.89289 14.6707 5.5 16.3889 5.5C18.1071 5.5 19.5 6.89289 19.5 8.61111Z" />
      </svg>      
    )
}