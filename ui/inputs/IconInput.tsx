"use client";

import clsx from "clsx";
import { use, useEffect, useState } from "react";
import { CustomInputProps } from "./input.type";
import { useTranslations } from "next-intl";
import { Input } from "@heroui/react";

export type IconInputProps = CustomInputProps & {
    icon?: React.ReactNode
}

const IconInput: React.FC<IconInputProps> = ({
    placeholder,
    icon,
    customClassName,
    fullBordered,
    inputClassName,
    handleChange,
    ...props
}) => {
    const [value, setValue] = useState<string>((props.value?.toString() && props.value.toString()) || '');

    const clearInput = () => {
        setValue('');
        handleChange && handleChange('');
    }

    return (
        // <Input
        //     placeholder={placeholder}
        //     value={value}
        //     size="sm"
        //     className={clsx(
        //         'bg-[transparent] appearance-none outline-none text-primaryText placeholder-secondaryText w-full',
        //         inputClassName
        //     )}
        //     startContent={
        //         <div className={clsx(
        //             'h-4'
        //         )}>
        //             {icon}
        //         </div>
        //     }
        //     onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        //         setValue(event.target.value);
        //         handleChange && handleChange(event.target.value);   
        //     }}
        // />
        <div className={clsx(
            'inline-flex flex-row items-center gap-2',
            'pl-[10px] pr-[10px] pt-[5px] pb-[5px]',
            !fullBordered && 'border-b border-b-borderColor',
            fullBordered && 'border border-borderColor rounded-md',
            'transition-all duration-200',
            customClassName
        )}>
            <div className={clsx(
                'h-4'
            )}>
                {icon}
            </div>
            <input 
                placeholder={placeholder}
                value={value}
                className={clsx(
                    'bg-[transparent] appearance-none outline-none text-primaryText placeholder-secondaryText w-[100%]',
                    inputClassName
                )}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(event.target.value);
                    handleChange && handleChange(event.target.value);   
                }}
                {...props}
            />
            <p
                className={clsx(
                    'font-interTight font-medium text-base text-secondaryText select-none',
                    'transition-all duration-200',
                    'active:opacity-[0.5] sm:active:opacity sm:hover:opacity-[0.5]',
                    value?.toString() && value.toString().length > 0 ? 'pointer' : 'opacity-[0] pointer-events-none'
                )}
                onClick={clearInput}
            >
                ×
            </p>
        </div>
    );
}

export default IconInput;