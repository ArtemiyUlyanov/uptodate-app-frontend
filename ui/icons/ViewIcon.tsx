import clsx from "clsx"

export type ViewIconProps = React.SVGAttributes<SVGSVGElement>

export const ViewIcon: React.FC<ViewIconProps> = ({ 
    ...props 
}) => {
    return (
        <svg 
            width="22" 
            height="14" 
            viewBox="0 0 22 14"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M0 7C2.308 3.058 6.064 0 11 0C15.935 0 19.693 3.058 22 7C19.693 10.942 15.936 14 11 14C6.064 14 2.308 10.942 0 7ZM2.376 7C3.991 9.287 6.69 12 11 12C15.311 12 18.01 9.287 19.624 7C18.01 4.713 15.311 2 11 2C6.69 2 3.991 4.713 2.376 7ZM13.5 7C13.5 8.38071 12.3807 9.5 11 9.5C9.61929 9.5 8.5 8.38071 8.5 7C8.5 5.61929 9.61929 4.5 11 4.5C12.3807 4.5 13.5 5.61929 13.5 7Z" />
        </svg>
    );
}