import React from 'react'
import search_icon from '@/public/images/search_icon.svg';
import Image from 'next/image';
import clsx from 'clsx';

export type SearchIconProps = React.SVGAttributes<SVGSVGElement>

export const SearchIcon: React.FC<SearchIconProps> = ({ ...props }) => {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'w-[auto] h-[100%] object-contain select-none'
      )}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12.4444 7.1111C12.4444 10.0566 10.0566 12.4444 7.1111 12.4444C4.16559 12.4444 1.77777 10.0566 1.77777 7.1111C1.77777 4.16559 4.16559 1.77777 7.1111 1.77777C10.0566 1.77777 12.4444 4.16559 12.4444 7.1111ZM11.4718 12.7286C10.2676 13.6648 8.75445 14.2222 7.1111 14.2222C3.18375 14.2222 0 11.0385 0 7.1111C0 3.18375 3.18375 0 7.1111 0C11.0385 0 14.2222 3.18375 14.2222 7.1111C14.2222 8.75434 13.6648 10.2674 12.7288 11.4715L15.7398 14.4825C16.087 14.8297 16.087 15.3925 15.7398 15.7396C15.3927 16.0868 14.8299 16.0868 14.4828 15.7396L11.4718 12.7286Z" />
    </svg>
  )
}