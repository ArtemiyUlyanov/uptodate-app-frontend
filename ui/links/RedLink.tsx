import clsx from "clsx";
import Link from "next/link";
import { CustomLinkProps } from "./custom_link_props";

export type RedLinkProps = CustomLinkProps

const RedLink: React.FC<RedLinkProps> = ({
    text,
    link,
    actived,
    arrowActived,
    underliningActived,
    customClassName,
    ...props
}) => {
    return (
        <Link className={clsx(
            'relative font-interTight text-aspectText w-auto all-unset select-none',
            'transition-all duration-200',
            actived && underliningActived && "before:content-[''] before:absolute before:h-[1px] before:bg-[#ff0000] before:-bottom-1 before:bg-primaryText",
            actived && underliningActived && 'before:transition-all before:duration-200',
            actived && !underliningActived && 'sm:hover:opacity-50',
            actived && !underliningActived && 'active:opacity-50 sm:active:opacity',
            actived && 'hover:before:w-full before:w-0',
            customClassName
        )} href={link} {...props}>
            {text}
        </Link>
    );
}

export default RedLink;