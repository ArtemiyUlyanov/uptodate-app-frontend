import React from 'react'
import Image, { StaticImageData } from 'next/image';
import checkbox_checked from '@/public/images/checkbox_checked.png'; 
import clsx from 'clsx';

export type CheckboxCheckedIconProps = React.SVGAttributes<SVGSVGElement>

export const CheckboxCheckedIcon: React.FC<CheckboxCheckedIconProps> = ({
    ...props
}) => {
  return (
    <svg 
      viewBox="0 0 15 15" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5547 0.167934C15.0142 0.474286 15.1384 1.09516 14.8321 1.55468L6.15542 14.5696L0.292893 8.70709C-0.0976311 8.31657 -0.0976311 7.6834 0.292893 7.29288C0.683417 6.90235 1.31658 6.90235 1.70711 7.29288L5.84457 11.4303L13.1679 0.445284C13.4743 -0.0142447 14.0952 -0.138418 14.5547 0.167934Z" />
    </svg>
  )
}