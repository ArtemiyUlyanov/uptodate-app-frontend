import clsx from "clsx";
import Link from "next/link";
import { CustomLinkProps } from "./custom_link_props";

export type DefaultLinkProps = CustomLinkProps

const DefaultLink: React.FC<DefaultLinkProps> = ({
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
        <Link className={clsx(
            'relative text-primaryText w-auto all-unset select-none flex flex-row gap-1 hover:gap-3',
            'transition-all duration-200',
            actived && underliningActived && "before:content-[''] before:absolute before:h-[1px] before:bg-[#ff0000] before:-bottom-1 before:bg-primaryText",
            actived && underliningActived && 'before:transition-all before:duration-200',
            actived && !underliningActived && 'sm:hover:opacity-50',
            actived && !underliningActived && 'active:opacity-50 sm:active:opacity',
            actived && 'hover:before:w-full before:w-0',
            customClassName
        )} href={link} {...props}>
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

export default DefaultLink;