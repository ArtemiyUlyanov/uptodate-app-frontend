import React from 'react'
import search_icon from '@/public/images/search_icon.svg';
import Image from 'next/image';
import clsx from 'clsx';

export type AddIconProps = React.SVGAttributes<SVGSVGElement>

export const AddIcon: React.FC<AddIconProps> = ({ ...props }) => {
  return (
    <svg 
      width="25" 
      height="25" 
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'w-auto h-full object-contain select-none rounded-md'
      )}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M25 0H0V25H25V0ZM12.5 18.5C12.0266 18.5 11.6429 18.1162 11.6429 17.6429V13.3571H7.35714C6.88376 13.3571 6.5 12.9734 6.5 12.5C6.5 12.0266 6.88376 11.6429 7.35714 11.6429H11.6429V7.35714C11.6429 6.88376 12.0266 6.5 12.5 6.5C12.9734 6.5 13.3571 6.88376 13.3571 7.35714V11.6429H17.6429C18.1162 11.6429 18.5 12.0266 18.5 12.5C18.5 12.9734 18.1162 13.3571 17.6429 13.3571H13.3571V17.6429C13.3571 18.1162 12.9734 18.5 12.5 18.5Z" />
    </svg>    
  )
}