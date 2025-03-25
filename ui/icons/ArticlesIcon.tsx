import clsx from "clsx";
import React from "react"

export type ArticlesIconProps = React.SVGAttributes<SVGSVGElement>

export const ArticlesIcon: React.FC<ArticlesIconProps> = ({
    ...props
}) => {
    return (
        <svg 
            width="24" 
            height="19" 
            viewBox="0 0 24 19"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M2 0C0.895431 0 0 0.89543 0 2V3C0 4.10457 0.89543 5 2 5H3C4.10457 5 5 4.10457 5 3V2C5 0.895431 4.10457 0 3 0H2ZM8 0C6.89543 0 6 0.89543 6 2V3C6 4.10457 6.89543 5 8 5H22C23.1046 5 24 4.10457 24 3V2C24 0.895431 23.1046 0 22 0H8ZM2 7C0.895431 7 0 7.89543 0 9V10C0 11.1046 0.89543 12 2 12H3C4.10457 12 5 11.1046 5 10V9C5 7.89543 4.10457 7 3 7H2ZM8 7C6.89543 7 6 7.89543 6 9V10C6 11.1046 6.89543 12 8 12H22C23.1046 12 24 11.1046 24 10V9C24 7.89543 23.1046 7 22 7H8ZM0 16C0 14.8954 0.895431 14 2 14H3C4.10457 14 5 14.8954 5 16V17C5 18.1046 4.10457 19 3 19H2C0.89543 19 0 18.1046 0 17V16ZM6 16C6 14.8954 6.89543 14 8 14H22C23.1046 14 24 14.8954 24 16V17C24 18.1046 23.1046 19 22 19H8C6.89543 19 6 18.1046 6 17V16Z" />
        </svg>
    );
}