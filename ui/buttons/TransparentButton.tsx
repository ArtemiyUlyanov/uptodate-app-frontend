import clsx from "clsx";
import { StaticImageData } from "next/image";
import { CustomButtonProps } from "./button.type";
import { Button } from "@heroui/react";

export type TransparentButtonProps = CustomButtonProps & {
    text?: string
    hoverEffect: 'opacity' | 'background'
    icon?: React.ReactNode
}

const TransparentButton: React.FC<TransparentButtonProps> = ({
    text,
    icon,
    hoverEffect,
    onClickButton,
    customClassName
}) => {
    return (
        <button
            className={clsx(
                'inline-flex gap-2 items-center justify-center',
                'font-interTight font-semibold text-primaryText select-none',
                'transition-all duration-200',
                hoverEffect === 'opacity' && 'sm:hover:opacity-50',
                hoverEffect === 'opacity' && 'active:opacity-50 sm:active:opacity',
                hoverEffect === 'background' && 'p-1 rounded-md',
                hoverEffect === 'background' && 'sm:hover:bg-emphasizingColor',
                hoverEffect === 'background' && 'active:bg-emphasizingColor sm:active:bg',
                customClassName
            )}
            onClick={onClickButton}
        >
            {icon}
            {text}
        </button>
    );
}

export default TransparentButton;