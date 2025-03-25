import React from 'react'
import icon from '@/public/images/france_flag_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type FranceFlagIconProps = React.SVGAttributes<SVGSVGElement>

export const FranceFlagIcon: React.FC<FranceFlagIconProps> = ({ ...props }) => {
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