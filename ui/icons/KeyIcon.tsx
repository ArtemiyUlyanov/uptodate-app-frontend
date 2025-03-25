import clsx from "clsx"

export type KeyIconProps = React.SVGAttributes<SVGSVGElement>

export const KeyIcon: React.FC<KeyIconProps> = ({ ...props }) => {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'w-auto h-full object-contain select-none'
      )}
      fill="black"
      {...props}
    >
      <path d="M18.3 3.1L19.7 1.7C20.1 1.3 20.1 0.7 19.7 0.3C19.3 -0.1 18.7 -0.1 18.3 0.3L7.8 10.8C7 10.3 6 10 5 10C2.2 10 0 12.2 0 15C0 17.8 2.2 20 5 20C7.8 20 10 17.8 10 15C10 14 9.7 13 9.2 12.2L14.1 7.3L15.5 8.7C15.9 9.1 16.5 9.1 16.9 8.7C17.3 8.3 17.3 7.7 16.9 7.3L15.5 5.9L16.9 4.5L18.3 5.9C18.7 6.3 19.3 6.3 19.7 5.9C20.1 5.5 20.1 4.9 19.7 4.5L18.3 3.1ZM5 18C3.3 18 2 16.7 2 15C2 13.3 3.3 12 5 12C6.7 12 8 13.3 8 15C8 16.7 6.7 18 5 18Z" />
    </svg>    
  )
}