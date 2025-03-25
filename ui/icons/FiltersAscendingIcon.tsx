import React from 'react'
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

import filters_ascending_icon from '@/public/images/filters_ascending_icon.png';

export type FiltersAscendingIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    className?: string
}

export const FiltersAscendingIcon: React.FC<FiltersAscendingIconProps> = ({
    className,
    ...props
}) => {
  return (
    <Image
      src={filters_ascending_icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'select-none',
        className
      )}
    />
  )
}