import React from 'react'
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

import filters_icon from '@/public/images/filters_icon_3.png';

export type FiltersIconProps = React.SVGAttributes<SVGSVGElement> & {
    className?: string
}

export const FiltersIcon: React.FC<FiltersIconProps> = ({
    className,
    ...props
}) => {
  return (
    <svg 
      width="22" 
      height="17" 
      viewBox="0 0 22 17" 
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'w-auto h-full object-contain select-none'
      )}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M6 6C7.10457 6 8 5.10457 8 4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4C4 5.10457 4.89543 6 6 6ZM6 8C7.77261 8 9.27592 6.84697 9.80081 5.25H22V2.75H9.80081C9.27591 1.15303 7.77261 0 6 0C4.22739 0 2.72409 1.15303 2.19919 2.75H0V5.25H2.19919C2.72409 6.84697 4.22739 8 6 8ZM16 11C14.8954 11 14 11.8954 14 13C14 14.1046 14.8954 15 16 15C17.1046 15 18 14.1046 18 13C18 11.8954 17.1046 11 16 11ZM16 9C14.2274 9 12.7241 10.153 12.1992 11.75H0V14.25H12.1992C12.7241 15.847 14.2274 17 16 17C17.7726 17 19.2759 15.847 19.8008 14.25H22V11.75H19.8008C19.2759 10.153 17.7726 9 16 9Z" />
    </svg>
    // <svg 
    //   width="22" 
    //   height="18" 
    //   viewBox="0 0 22 18" 
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    //   <path fillRule="evenodd" clipRule="evenodd" d="M6 6C7.10457 6 8 5.10457 8 4C8 2.89543 7.10457 2 6 2C4.89543 2 4 2.89543 4 4C4 5.10457 4.89543 6 6 6ZM6 8C7.86384 8 9.42994 6.72523 9.87398 5H22V3H9.87398C9.42994 1.27477 7.86384 0 6 0C4.13616 0 2.57006 1.27477 2.12602 3H0V5H2.12602C2.57006 6.72523 4.13616 8 6 8ZM16 12C14.8954 12 14 12.8954 14 14C14 15.1046 14.8954 16 16 16C17.1046 16 18 15.1046 18 14C18 12.8954 17.1046 12 16 12ZM16 10C14.1362 10 12.5701 11.2748 12.126 13H0V15H12.126C12.5701 16.7252 14.1362 18 16 18C17.8638 18 19.4299 16.7252 19.874 15H22V13H19.874C19.4299 11.2748 17.8638 10 16 10Z" />
    // </svg>
  )
}