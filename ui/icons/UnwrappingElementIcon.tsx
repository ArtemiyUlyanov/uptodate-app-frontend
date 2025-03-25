import Image from "next/image"
import icon from '@/public/images/filters_icon_2.png';
import clsx from "clsx";

export type UnwrappingElementIconProps = React.SVGAttributes<SVGSVGElement>

export const UnwrappingElementIcon: React.FC<UnwrappingElementIconProps> = ({ ...props }) => {
  return (
    <svg 
        width="11" 
        height="5" 
        viewBox="0 0 11 5"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
            'w-auto h-full'
        )}
        {...props}
    >
        <path d="M9.6972 0H1.30275C0.31334 0 -0.0751918 1.28322 0.748045 1.83205L4.94527 4.6302C5.28117 4.85413 5.71877 4.85413 6.05467 4.6302L10.2519 1.83205C11.0751 1.28323 10.6866 0 9.6972 0Z" />
    </svg>
    // <svg 
    //   viewBox="0 0 16 9" 
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    //   <path fillRule="evenodd" clipRule="evenodd" d="M15.0709 2.34322L8.70692 8.70718C8.31639 9.0977 7.68323 9.0977 7.2927 8.70718L0.928741 2.34322C0.538216 1.95269 0.538216 1.31953 0.928741 0.929002C1.31926 0.538477 1.95243 0.538477 2.34295 0.929002L7.99981 6.58586L13.6567 0.929002C14.0472 0.538477 14.6804 0.538477 15.0709 0.929002C15.4614 1.31953 15.4614 1.95269 15.0709 2.34322Z" />
    // </svg>
  )
}