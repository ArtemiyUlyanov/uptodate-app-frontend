import React from 'react'
import search_icon from '@/public/images/search_icon.svg';
import Image from 'next/image';
import clsx from 'clsx';

export type CalendarIconProps = React.SVGAttributes<SVGSVGElement>

export const CalendarIcon: React.FC<CalendarIconProps> = ({ ...props }) => {
  return (
    <svg 
        width="20"
        height="20" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M0 17C0 18.7 1.3 20 3 20H17C18.7 20 20 18.7 20 17V9H0V17ZM17 2H15V1C15 0.4 14.6 0 14 0C13.4 0 13 0.4 13 1V2H7V1C7 0.4 6.6 0 6 0C5.4 0 5 0.4 5 1V2H3C1.3 2 0 3.3 0 5V7H20V5C20 3.3 18.7 2 17 2Z" />
    </svg>
  )
}