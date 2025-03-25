import React from 'react'
import icon from '@/public/images/search_text_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type SearchTextIconProps = React.ImgHTMLAttributes<HTMLElement>

export const SearchTextIcon: React.FC<SearchTextIconProps> = ({ ...props }) => {
  return (
    <Image
      src={icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'w-[auto] h-[100%] object-contain select-none'
      )}
    />
  )
}