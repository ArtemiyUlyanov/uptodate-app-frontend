import clsx from "clsx"

export type InfoIconProps = React.SVGAttributes<SVGSVGElement>

export const InfoIcon: React.FC<InfoIconProps> = ({ 
    ...props 
}) => {
    return (
        <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM11 5C11 5.55225 10.5522 6 10 6C9.44775 6 9 5.55225 9 5C9 4.44775 9.44775 4 10 4C10.5522 4 11 4.44775 11 5ZM11 8V16H9V8H11Z" />
        </svg>
    )
}