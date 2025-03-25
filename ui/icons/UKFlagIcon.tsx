import React from 'react'
import icon from '@/public/images/uk_flag_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type UKFlagIconProps = React.SVGAttributes<SVGSVGElement>

export const UKFlagIcon: React.FC<UKFlagIconProps> = ({ ...props }) => {
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