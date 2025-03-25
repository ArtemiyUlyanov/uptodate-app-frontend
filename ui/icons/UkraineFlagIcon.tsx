import React from 'react'
import icon from '@/public/images/ukraine_flag_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type UkraineFlagIconProps = React.SVGAttributes<SVGSVGElement>

export const UkraineFlagIcon: React.FC<UkraineFlagIconProps> = ({ ...props }) => {
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