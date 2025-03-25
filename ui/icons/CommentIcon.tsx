import React from 'react'
import search_icon from '@/public/images/search_icon.svg';
import Image from 'next/image';
import clsx from 'clsx';

export type CommentIconProps = React.SVGAttributes<SVGSVGElement>

export const CommentIcon: React.FC<CommentIconProps> = ({ ...props }) => {
  return (
    <svg 
      width="22" 
      height="22" 
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'w-auto h-full object-contain select-none'
      )}
      {...props}
    >
      <path d="M20.784 16.017C21.5819 14.4649 21.9987 12.7452 22 11C22 4.935 17.065 0 11 0C4.935 0 0 4.935 0 11C0 17.065 4.935 22 11 22C12.742 22 14.468 21.581 16.018 20.785L20.758 21.97C20.9254 22.0122 21.1009 22.0101 21.2673 21.964C21.4336 21.9179 21.5852 21.8293 21.707 21.707C21.8292 21.5849 21.9176 21.4331 21.9637 21.2667C22.0098 21.1002 22.012 20.9246 21.97 20.757L20.784 16.017ZM18.751 16.127L19.625 19.625L16.127 18.75C15.8797 18.6889 15.6185 18.724 15.396 18.848C14.0535 19.6021 12.5398 19.9988 11 20C6.037 20 2 15.962 2 11C2 6.038 6.037 2 11 2C15.963 2 20 6.038 20 11C19.9986 12.5393 19.6023 14.0526 18.849 15.395C18.7236 15.6174 18.6885 15.8795 18.751 16.127Z" />
    </svg>    
  )
}