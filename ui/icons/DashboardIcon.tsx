import clsx from "clsx"

export type DashboardIconProps = React.SVGAttributes<SVGSVGElement> & {
    wrapped: boolean
}

export const DashboardIcon: React.FC<DashboardIconProps> = ({ 
    wrapped,
    ...props 
}) => {
    const defaultIcon =
        <svg 
            width="15" 
            height="16" 
            viewBox="0 0 15 16"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M1.19995 4.72517C0.444563 5.29174 0 6.18089 0 7.12514V12.9374C0 14.5943 1.34315 15.9374 3 15.9374H12C13.6569 15.9374 15 14.5943 15 12.9374V7.12514C15 6.18089 14.5554 5.29174 13.8 4.72517L9.30005 1.35004C8.23336 0.549989 6.76664 0.549988 5.69995 1.35003L1.19995 4.72517ZM7.5 11.4999C8.60457 11.4999 9.5 10.6045 9.5 9.49995C9.5 8.39538 8.60457 7.49995 7.5 7.49995C6.39543 7.49995 5.5 8.39538 5.5 9.49995C5.5 10.6045 6.39543 11.4999 7.5 11.4999Z" />
        </svg>
        // <svg 
        //     width="16" 
        //     height="17" 
        //     viewBox="0 0 16 17"
        //     xmlns="http://www.w3.org/2000/svg"
        //     className={clsx(
        //         'w-auto h-full'
        //     )}
        //     {...props}
        // >
        //     <path fillRule="evenodd" clipRule="evenodd" d="M1.19983 5.10019C0.444441 5.66675 -0.00012207 6.5559 -0.00012207 7.50015V13.9999C-0.00012207 15.6568 1.34302 16.9999 2.99988 16.9999H12.9999C14.6567 16.9999 15.9999 15.6568 15.9999 13.9999V7.50015C15.9999 6.5559 15.5553 5.66675 14.7999 5.10019L9.79992 1.35004C8.73324 0.549989 7.26652 0.549988 6.19983 1.35003L1.19983 5.10019ZM4 12.5C3.44772 12.5 3 12.9477 3 13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5C13 12.9477 12.5523 12.5 12 12.5H4Z" />
        // </svg>    

    const wrappedIcon =
        <svg 
            width="25" 
            height="25" 
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M6 0C2.68629 0 0 2.68629 0 6V19C0 22.3137 2.68629 25 6 25H19C22.3137 25 25 22.3137 25 19V6C25 2.68629 22.3137 0 19 0H6ZM5 11.3751C5 10.4309 5.44456 9.54174 6.19995 8.97517L10.7 5.60003C11.7666 4.79999 13.2334 4.79999 14.3 5.60004L18.8 8.97517C19.5554 9.54174 20 10.4309 20 11.3751V17.1874C20 18.8443 18.6569 20.1874 17 20.1874H8C6.34315 20.1874 5 18.8443 5 17.1874V11.3751ZM7.81261 16.9062C7.81261 16.3884 8.23235 15.9687 8.75011 15.9687H16.2501C16.7679 15.9687 17.1876 16.3884 17.1876 16.9062C17.1876 17.424 16.7679 17.8437 16.2501 17.8437H8.75011C8.23235 17.8437 7.81261 17.424 7.81261 16.9062Z" />
        </svg>
        // <svg 
        //     width="25" 
        //     height="25" 
        //     viewBox="0 0 25 25"
        //     xmlns="http://www.w3.org/2000/svg"
        //     className={clsx(
        //         'w-auto h-full'
        //     )}
        //     {...props}
        // >
        //     <path fillRule="evenodd" clipRule="evenodd" d="M6 0C2.68629 0 0 2.68629 0 6V19C0 22.3137 2.68629 25 6 25H19C22.3137 25 25 22.3137 25 19V6C25 2.68629 22.3137 0 19 0H6ZM19 5C19.5523 5 20 5.44772 20 6V19C20 19.5523 19.5523 20 19 20H17C16.4477 20 16 19.5523 16 19V6C16 5.44772 16.4477 5 17 5H19ZM11.5 10C10.9477 10 10.5 10.4477 10.5 11V19C10.5 19.5523 10.9477 20 11.5 20H13.5C14.0523 20 14.5 19.5523 14.5 19V11C14.5 10.4477 14.0523 10 13.5 10H11.5ZM6 15C5.44772 15 5 15.4477 5 16V19C5 19.5523 5.44772 20 6 20H8C8.55228 20 9 19.5523 9 19V16C9 15.4477 8.55228 15 8 15H6Z" />
        // </svg>


    return (
        wrapped ? wrappedIcon : defaultIcon
    );
}