"use client";

import clsx from "clsx";
import { use, useEffect, useState } from "react";
import { CustomInputProps } from "./input.type";

export type DefaultInputProps = CustomInputProps;

const DefaultInput: React.FC<DefaultInputProps> = ({
    placeholder,
    customClassName,
    fullBordered,
    inputClassName,
    startContent,
    handleChange,
    ...props
}) => {
    const [value, setValue] = useState<string>('');

    const clearInput = () => {
        setValue('');
        handleChange && handleChange('');
    }

    useEffect(() => {
        if (props.value !== undefined) {
            const newValue = props.value as string;
            
            setValue(newValue);
            // handleChange && handleChange(newValue);
        }
    }, [props.value]);

    return (
        <div className={clsx(
            'inline-flex flex-row items-center gap-2',
            'pl-3 pr-3 pt-2 pb-2 rounded-lg',
            !fullBordered && 'border-b border-b-borderColor',
            fullBordered && 'border border-borderColor',
            'transition-all duration-200',
            customClassName
        )}>
            {startContent}
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
                    value.length > 0 ? 'pointer' : 'opacity-[0] pointer-events-none'
                )}
                onClick={clearInput}
            >
                ×
            </p>
        </div>
    );
}

export default DefaultInput;