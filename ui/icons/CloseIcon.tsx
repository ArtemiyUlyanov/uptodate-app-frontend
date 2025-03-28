import clsx from "clsx"

export type CloseIconProps = React.SVGAttributes<SVGSVGElement> & {
  customClassName?: string
}

export const CloseIcon: React.FC<CloseIconProps> = ({ 
  customClassName,
  ...props  
}) => {
  return (
    <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
            'w-[auto] h-[100%] object-contain select-none',
            customClassName
        )}
        {...props}
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M15.5303 1.53033C15.8232 1.23744 15.8232 0.762563 15.5303 0.46967C15.2374 0.176777 14.7626 0.176777 14.4697 0.46967L8 6.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L6.93934 8L0.46967 14.4697C0.176777 14.7626 0.176777 15.2374 0.46967 15.5303C0.762563 15.8232 1.23744 15.8232 1.53033 15.5303L8 9.06066L14.4697 15.5303C14.7626 15.8232 15.2374 15.8232 15.5303 15.5303C15.8232 15.2374 15.8232 14.7626 15.5303 14.4697L9.06066 8L15.5303 1.53033Z" />
    </svg>    
  )
}