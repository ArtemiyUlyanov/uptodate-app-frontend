import React from 'react'
import icon from '@/public/images/russia_flag_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type RussiaFlagIconProps = React.SVGAttributes<SVGSVGElement>

export const RussiaFlagIcon: React.FC<RussiaFlagIconProps> = ({ ...props }) => {
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