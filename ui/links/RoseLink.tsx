import clsx from "clsx";
import { CustomLinkProps } from "./custom_link_props";
import Link from "next/link";

export type RoseLinkProps = CustomLinkProps

const RoseLink: React.FC<RoseLinkProps> = ({
    text,
    link,
    actived,
    arrowPlacement,
    arrowActived,
    underliningActived,
    customClassName,
    ...props
}) => {
    return (
        <Link
            className={clsx(
                'relative font-interTight text-aspectText whitespace-nowrap w-auto all-unset flex flex-row gap-1 hover:gap-3',
                'transition-all duration-200',
                underliningActived && "before:content-[''] before:absolute before:h-[1px] before:bg-[#ff0000] before:-bottom-1 before:bg-aspectColor",
                underliningActived && 'before:transition-all before:duration-200',
                !underliningActived && 'sm:hover:opacity-50',
                !underliningActived && 'active:opacity-50 sm:active:opacity',
                actived && 'hover:before:w-full before:w-0',
                customClassName
            )} 
            href={link}
            {...props}
        >
            {arrowActived && arrowPlacement === 'left' &&
                <p>←</p>
            }
            {text}
            {arrowActived && (arrowPlacement === 'right' || arrowPlacement === undefined) &&
                <p>→</p>
            }
        </Link>
    );
}

export default RoseLink;