import React from 'react'
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

import ellipsis_icon from '@/public/images/ellipsis_icon.png';

export type EllipsisIconProps = React.ImgHTMLAttributes<HTMLElement> & {
    className?: string
}

export const EllipsisIcon: React.FC<EllipsisIconProps> = ({
    className,
    ...props
}) => {
  return (
    <Image
      src={ellipsis_icon}
      alt='Image is likely not to be supported'
      className={clsx(
        'select-none',
        className
      )}
    />
  )
}