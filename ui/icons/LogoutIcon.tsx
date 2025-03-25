import React from 'react'
import icon from '@/public/images/logout_icon.png';
import Image from 'next/image';
import clsx from 'clsx';

export type LogoutIconProps = React.SVGAttributes<SVGSVGElement>

export const LogoutIcon: React.FC<LogoutIconProps> = ({ 
  ...props 
}) => {
    return (
        <svg 
            width="21" 
            height="26" 
            viewBox="0 0 21 26"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
                'w-auto h-full'
            )}
            {...props}
        >
            <path d="M0 13C0 13.3448 0.136964 13.6754 0.380761 13.9192C0.624559 14.163 0.955219 14.3 1.3 14.3H11.167L8.177 17.277C8.05515 17.3979 7.95844 17.5416 7.89244 17.7001C7.82644 17.8585 7.79246 18.0284 7.79246 18.2C7.79246 18.3716 7.82644 18.5415 7.89244 18.6999C7.95844 18.8584 8.05515 19.0021 8.177 19.123C8.29785 19.2448 8.44163 19.3416 8.60005 19.4076C8.75847 19.4736 8.92838 19.5075 9.1 19.5075C9.27162 19.5075 9.44153 19.4736 9.59995 19.4076C9.75837 19.3416 9.90215 19.2448 10.023 19.123L15.223 13.923C15.3414 13.7994 15.4341 13.6536 15.496 13.494C15.626 13.1775 15.626 12.8225 15.496 12.506C15.4341 12.3464 15.3414 12.2006 15.223 12.077L10.023 6.877C9.90179 6.75579 9.75789 6.65964 9.59952 6.59404C9.44116 6.52844 9.27142 6.49468 9.1 6.49468C8.92858 6.49468 8.75884 6.52844 8.60048 6.59404C8.44211 6.65964 8.29821 6.75579 8.177 6.877C8.05579 6.99821 7.95964 7.14211 7.89404 7.30048C7.82844 7.45884 7.79468 7.62858 7.79468 7.8C7.79468 7.97142 7.82844 8.14116 7.89404 8.29952C7.95964 8.45789 8.05579 8.60179 8.177 8.723L11.167 11.7H1.3C0.955219 11.7 0.624559 11.837 0.380761 12.0808C0.136964 12.3246 0 12.6552 0 13ZM16.9 0H3.9C2.86566 0 1.87368 0.410892 1.14228 1.14228C0.410892 1.87368 0 2.86566 0 3.9V7.8C0 8.14478 0.136964 8.47544 0.380761 8.71924C0.624559 8.96304 0.955219 9.1 1.3 9.1C1.64478 9.1 1.97544 8.96304 2.21924 8.71924C2.46304 8.47544 2.6 8.14478 2.6 7.8V3.9C2.6 3.55522 2.73696 3.22456 2.98076 2.98076C3.22456 2.73696 3.55522 2.6 3.9 2.6H16.9C17.2448 2.6 17.5754 2.73696 17.8192 2.98076C18.063 3.22456 18.2 3.55522 18.2 3.9V22.1C18.2 22.4448 18.063 22.7754 17.8192 23.0192C17.5754 23.263 17.2448 23.4 16.9 23.4H3.9C3.55522 23.4 3.22456 23.263 2.98076 23.0192C2.73696 22.7754 2.6 22.4448 2.6 22.1V18.2C2.6 17.8552 2.46304 17.5246 2.21924 17.2808C1.97544 17.037 1.64478 16.9 1.3 16.9C0.955219 16.9 0.624559 17.037 0.380761 17.2808C0.136964 17.5246 0 17.8552 0 18.2V22.1C0 23.1343 0.410892 24.1263 1.14228 24.8577C1.87368 25.5891 2.86566 26 3.9 26H16.9C17.9343 26 18.9263 25.5891 19.6577 24.8577C20.3891 24.1263 20.8 23.1343 20.8 22.1V3.9C20.8 2.86566 20.3891 1.87368 19.6577 1.14228C18.9263 0.410892 17.9343 0 16.9 0Z" fill="#F44336"/>
        </svg>    
    )
}